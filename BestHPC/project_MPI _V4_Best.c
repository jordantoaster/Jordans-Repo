
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>
#include <time.h>
#include <mpi.h>


////////////////////////////////////////////////////////////////////////////////
// Program main
////////////////////////////////////////////////////////////////////////////////

int maxNumResults = 1024;

//declare pointers which will point to an address of a char type
char *textData;
char *patternData;

//standard variable declaration
int textLength;
int patternLength;

//declare two instances for clock ticks - CPU time
clock_t c0, c1;

//two instances for wall clock time
time_t t0, t1;

//declare pointer to teh output file for 'global' access
FILE *ofile;

//simply prints a message if all avaliable memory has been used by the program
void outOfMemory()
{
	fprintf (stderr, "Out of memory\n");
	exit (0);
}

//Takes input of a file pointer  - declares a pointer to a pointer for the text data input pointer
//... - declares a pointer to the passed in length variable
void readFromFile (FILE *f, char **data, int *length)
{
	//declares the pointers and variables required
	int ch;
	int allocatedLength;
	char *result;
	int resultLength = 0;

	//initialises the required variable and pointer
	allocatedLength = 0;
	result = NULL;

	//gets the next (in this case first) character (an unsigned char) from the specified stream and
	//advances the position indicator for the stream f
	//character read as an unsigned char cast to an int or EOF on end of file or error
	ch = fgetc (f);

	//checks if the char is valid - returned as int so should be > 0
	while (ch >= 0)
	{
		//increments length of length - as char is valid
		resultLength++;

		//checks if the result length exceeds the allocated length (0 to start with)
		if (resultLength > allocatedLength)
		{
			//add more memory to handle the fact that the text file length exceeds the allocated size
			//good for performance is memory is allocated at run time as required.
			allocatedLength += 10000;

			//resize the memory block assigned to result - to the size of typical char multiplied by the allocated length
			result = (char *) realloc (result, sizeof(char)*allocatedLength);

			//checks if avaliable memory has not been exceeded on each iteration
			if (result == NULL)
				outOfMemory();
		}

		//store the char in the result char array pointer
		result[resultLength-1] = ch;

		//move onto the next char in the file
		ch = fgetc(f);
	}

	//changes the passed in data char by reference - to the result array
	*data = result;

	//sets the input pointer length, changes the original by reference - as memory address was passed in.
	*length = resultLength;
}



int readControl(int controlTests[][3]) {
	//Creates a pointer to a file & a char array which holds the file name
	FILE *f;
	char fileName[1000];
#ifdef DOS
	sprintf(fileName, "inputs\\control.txt");
#else
	sprintf(fileName, "inputs/control.txt");
#endif
	//Opens the file based on the fileName and assigns its address to the pointer f
	f = fopen(fileName, "r");

	//if the file is not found exit the function
	if (f == NULL)
		return 0;

	int testCase;
	int i = 0;

	//read each line until EOF - add each as a 2d array as a set of test 'vectors'
	while ((testCase = fscanf(f, "%d %d %d", &controlTests[i][0], &controlTests[i][1], &controlTests[i][2])) != EOF)
	{
		if (testCase == 3)
			i++;
	}

	fclose(f);

	return i;
}

int readText(int text) {
	//Creates a pointer to a file & a char array which holds the file name
	FILE *f;
	char fileName[1000];
#ifdef DOS
	sprintf(fileName, "inputs\\text%d.txt", text);
#else
	//sets the file name char array to a formatted String containing a path and test number
	//in this case it represents the file name of the test text file.
	sprintf(fileName, "inputs/text%d.txt", text);
#endif
	//Opens the file based on the fileName and assigns its address to the pointer f
	f = fopen(fileName, "r");

	//if the file is not found exit the function
	if (f == NULL)
		return 0;

	//calls the function - passing in the file pointer and two variables
	//& gets the memory address of a variable
	readFromFile(f, &textData, &textLength);

	//close the file stream
	fclose(f);

	return 1;
}

int readPattern(int pattern) {

	//Creates a pointer to a file & a char array which holds the file name
	FILE *f;
	char fileName[1000];

#ifdef DOS
	sprintf(fileName, "inputs\\pattern%d.txt", pattern);
#else
	//See above - but for the pattern
	sprintf(fileName, "inputs/pattern%d.txt", pattern);
#endif
	//see above - but for the pattern
	f = fopen(fileName, "r");

	if (f == NULL)
		return 0;

	readFromFile(f, &patternData, &patternLength);
	fclose(f);

	return 1;
}


//takes a long comparison address as a argument
int hostMatch()
{

	//declares the required variables and assigns
	int i,j,k, lastI;
	i=0;
	j=0;
	k=0;

	//set to the difference between the text and pattern lengths
	//so the amount of the whole text that does not contain the pattern itself
	lastI = textLength-patternLength;

	while (i<=lastI && j<patternLength)
	{

        //if they are equal - move on and check the next set of chars are equal as well
		if (textData[k] == patternData[j])
		{
			k++;
			j++;
		}
		else
		{
			i++;

			k=i;
			j=0;
		}
	}

	//if j = pattern length then return the patterns first index in the text sequence
	if (j == patternLength)
		return i;
	else //occurs when iteration cannot find a match
		return -1;
}

//takes a long comparison address as a argument
hostMatchAll(int inputText, int inputPattern, int npes, int myrank, int result[])
{

	//declares the required variables and assigns
	int i, j, k, lastI;
	i = 0;
	j = 0;
	k = 0;
	int position = -1;
	int resultIndex = 0;

	//set to the difference between the text and pattern lengths
	//so the amount of the whole text that does not contain the pattern itself
	lastI = textLength - patternLength;

	while (i <= lastI)
	{
		//if they are equal - move on and check the next set of chars are equal as well
		if (textData[k] == patternData[j])
		{
			k++;
			j++;
		}
		else
		{
			i++;

			k = i;
			j = 0;
		}
		if (j == patternLength) //if pattern found
		{
			position = i;
			result[resultIndex] = position;
			resultIndex++;

			i++;
			k = i;
			j = 0;

		}
	}

	if (position == -1) {
		result[resultIndex] = -1;
		result[resultIndex + 1] = -2;
		result[resultIndex + 2] = inputText;
		result[resultIndex + 3] = inputPattern;
	}
	else {
		result[resultIndex] = -2;
		result[resultIndex + 1] = inputText;
		result[resultIndex + 2] = inputPattern;
	}

}

outputResults(char buf[]) { //writing to file causes a segementation fault - program functioanlity seems unaffected

	FILE *f;
	char fileName[1000];

	sprintf(fileName, "result_MPI.txt");

	f = fopen(fileName, "w");
	if (f == NULL)
		return;
	fprintf(f, buf);
	fclose(f);

	//buf[0] = '\0';

}

//function that handles over processing of the retreived pattern and text data
void processData(int occ, int inputText, int inputPattern, int npes, int myrank)
{
	//contains the search outcomes
	int result[maxNumResults];

	if (occ == 0) { //used to get one pattern

		result[0] = hostMatch();
		result[1] = -2; //terminating character
		result[2] = inputText;
		result[3] = inputPattern;

		//if(myrank == 1)
		MPI_Send(&result, maxNumResults, MPI_INT, 0, 0, MPI_COMM_WORLD);

	}
	else { //handle the ecase where all patterns need to be found
		//if (myrank == 0) { //for debugging
		hostMatchAll(inputText, inputPattern, npes, myrank, result);
		//printf("%i %i %i %i %i\n", result[0], result[1], result[2], result[3], result[4]);

		MPI_Send(&result, maxNumResults, MPI_INT, 0, 0, MPI_COMM_WORLD);
	}

}

slave(int myrank, int controlTests[][3], int numTests, int npes) {

	//account for no master helping
	myrank = myrank - 1;

	int k;
	//Uses rank as a unique value to assign the patterns to each process - k+npes ensures iteration will split the patterns evenly - only if test cases <= processes
	for (k = 0; k < numTests; k = k + npes)
	{
		//handles the case where number of tests exeed processes, so stops duplication of work.
		if (k + myrank < numTests) {

			//kick starts the searching process for the assigned test case
			readText(controlTests[k + myrank][1]);
			readPattern(controlTests[k + myrank][2]);

			//printf("%i %i\n", k + myrank, myrank);

			if (patternLength <= textLength) { //work from here
				processData(controlTests[k + myrank][0], controlTests[k + myrank][1], controlTests[k + myrank][2], npes, myrank);
			}
			else {
				int result[maxNumResults];
				result[0] = -1; //result
				result[1] = -2; //terminating character
				result[2] = controlTests[k + myrank][1]; //text
				result[3] = controlTests[k + myrank][2]; //pattern

				//send to master
				MPI_Send(&result, maxNumResults, MPI_INT, 0, 0, MPI_COMM_WORLD);
			}
		}
	}

}

master(int numTests, int npes) {

	//useful variables
	MPI_Status s;
	int results[3];
	int i;
	int terminator;

	char buffer[10000];
	sprintf(buffer, "");

	numTests = numTests;// - 1; //account for zero index/no master
	while (numTests !=0) { //use numTests
	
		MPI_Recv(&results, maxNumResults, MPI_INT, MPI_ANY_SOURCE, 0, MPI_COMM_WORLD, &s);

		//get the position of the terminator value
		i = 0;
		while (i < maxNumResults) {
			
			if (results[i] == -2) {
				terminator = i;
				break;
			}

			i++;

		}

		//loop all positions indexes until terminator
		i = 0;
		while (results[i] != -2) {
			
			//printf("%i %i %i\n", results[terminator+1], results[terminator+2], results[i]); //just print values

			sprintf(buffer + strlen(buffer), "%i %i %i\n", results[terminator + 1], results[terminator + 2], results[i]); //add to buffer
	
			i++;
		}

		numTests--;

		//printf("%i\n", numTests);
	}

	//print buffer
	outputResults(buffer);

	printf("out\n");

}

int main(int argc, char **argv)
{

	//used to hold the number of processes and each threads rank
	int npes, myrank, numTests;
	int controlTests[1000][3];

	//find out how many test cases there are
	numTests = readControl(controlTests);

	//sets up the MPI environment - each process will run the same code after this line
	MPI_Init(&argc, &argv);

	//context = world = while MPI program - assigns the declared variables
	MPI_Comm_size(MPI_COMM_WORLD, &npes);
	MPI_Comm_rank(MPI_COMM_WORLD, &myrank);

	if (myrank == 0) {
		master(numTests, npes);
	}
	else {
		slave(myrank, controlTests, numTests, npes-1);
	}

	//printf("out %i\n", myrank);

	//close MPI environment
	MPI_Finalize();
}
