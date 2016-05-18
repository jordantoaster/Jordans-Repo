#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>
#include <time.h>
#include <mpi.h>
#include <limits.h>

////////////////////////////////////////////////////////////////////////////////
// Program main - Jordan McDonald
////////////////////////////////////////////////////////////////////////////////

//eeach row in the 2d array contains a test case
int controlTests[1000][3];

//declare pointer to teh output file for 'global' access
FILE *ofile;

//simply prints a message if all avaliable memory has been used by the program
void outOfMemory()
{
	fprintf (stderr, "Out of memory\n");
	exit (0);
}

void readFromFile(FILE *f, char **data, int *length)
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
	ch = fgetc(f);

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
			result = (char *)realloc(result, sizeof(char)*allocatedLength);

			//checks if avaliable memory has not been exceeded on each iteration
			if (result == NULL)
				outOfMemory();
		}

		//store the char in the result char array pointer
		result[resultLength - 1] = ch;

		//move onto the next char in the file
		ch = fgetc(f);
	}

	//changes the passed in data char by reference - to the result array
	*data = result;

	//sets the input pointer length, changes the original by reference - as memory address was passed in.
	*length = resultLength;
}

int readControl() {
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
			i++;
	}

	fclose(f);

	return i;
}

readAllText(char **textDataCollection, int *textLengthCollection, int numberOfTests) {

	int textIndex;
	int i;
	for (i = 0; i < numberOfTests; i++) {

		//Creates a pointer to a file & a char array which holds the file name
		FILE *f;
		char fileName[1000];

		textIndex = controlTests[i][1];
#ifdef DOS
		sprintf(fileName, "inputs\\text%d.txt", textIndex);
#else
		//sets the file name char array to a formatted String containing a path and test number
		//in this case it represents the file name of the test text file.
		sprintf(fileName, "inputs/text%d.txt", textIndex);
#endif
		//Opens the file based on the fileName and assigns its address to the pointer f
		f = fopen(fileName, "r");

		//if the file is not found exit the function
		if (f == NULL)
			return 0;

		//calls the function - passing in the file pointer and two variables
		//& gets the memory address of a variable
		readFromFile(f, &textDataCollection[i], &textLengthCollection[i]);

		//close the file stream
		fclose(f);

	}
}

readAllPattern(char **patternDataCollection, int *patternLengthCollection, int numberOfTests) {

	int patternIndex;
	int i;
	for (i = 0; i < numberOfTests; i++) {
		FILE *f;
		char fileName[1000];

		patternIndex = controlTests[i][2];

#ifdef DOS
		sprintf(fileName, "inputs\\pattern%d.txt", patternIndex);
#else
		sprintf(fileName, "inputs/pattern%d.txt", patternIndex);
#endif
		f = fopen(fileName, "r");

		if (f == NULL)
			return 0;

		readFromFile(f, &patternDataCollection[i], &patternLengthCollection[i]);
		fclose(f);
	}
}

//access to this is probhinited to the master to ensure thread safety
void outputResults(int text, int pattern, int result) {
	fprintf(ofile, "%d %d %d\n", text, pattern, result);
}

void patternMatch(int start, int taskSize, int searchType, char text[], char pattern[], int textSize, int patternSize, int searchOutcome[]) {
	int myrank;
	MPI_Comm_rank(MPI_COMM_WORLD, &myrank);

	//declares the required variables and assigns as required
	int i, j, k, position, resultIndex;
	i = 0;
	j = 0;
	k = start; //k is used for the text position to start at as defined by the master
	position = -1;
	resultIndex = 0;
	
	//its negative one by default incase we dont find the pattern
	searchOutcome[resultIndex] = position;

		//loop the entire job indexes
		while (i < taskSize)
		{
			if (start <= textSize - patternSize) {

				//if they are equal - move on and check the next set of chars are equal as well
				if (text[k] == pattern[j])
				{
					k++;
					j++;
				}
				else
				{
					i++; 

					k = 1 + start;
					start = k;
					j = 0;
				}

				//if pattern found
				if (j == patternSize)
				{
					//add position to results array
					position = start;
					searchOutcome[resultIndex] = position;

					//to prepare for next pattern (if required)
					resultIndex++;

					//if looking for >1 then continue the search
					if (searchType == 1) {

						i++;
						start++;
						k = start;
						j = 0;
					}
					else {
						//resultIndex++; //is this needed?
						break; //leave loop if we only want one instance
					}
				}
			}
			else {
				break;
			}
		}


		//set terminating index if we are finding multiple values OR if a thread failed just keep it as -1
		if (searchOutcome[0] != -1)
			searchOutcome[resultIndex] = -2;
}


void slave(char **textDataCollection, char **patternDataCollection, int *textLengthCollection, int *patternLengthCollection, int myrank) {

	int allTestFinished = 0; //used to check state feedback from the master
	int flag = 0; //controls whether the process can proceed or busy wait
	MPI_Request request; //request for the overall state of the search - useful for performing mpi tests
	MPI_Request r;

	//non blocking recieve is used to collect overall search status and determine state for later on in the loop
	MPI_Irecv(&allTestFinished, 1, MPI_INT, 0, 1, MPI_COMM_WORLD, &request); 

	//while all tests are incomplete
	while (allTestFinished == 0) {

		//holds the task data expected from the master
		int task[4];

		//flag request variable
		MPI_Request req; 

		//non blocking recieve for the busy/proceed step
		MPI_Irecv(&task, 4, MPI_INT, 0, 0, MPI_COMM_WORLD, &req);

		//dont start job until data is sent - busy wait
		while (!flag || allTestFinished)
		{
			//determine the overall search state
			MPI_Test(&request, &allTestFinished, MPI_STATUS_IGNORE);

			//if all test cases finished then leave function
			if (allTestFinished)
				return;

			//check if the task can proceed
			MPI_Test(&req, &flag, MPI_STATUS_IGNORE); 
		}

		//sets an array for each position of the job - tne possibility of finding a pattern in every position is real
		int searchOutcome[task[1]]; 

		//perform the pattern matching
		patternMatch(task[0], task[1], task[3], textDataCollection[task[2]], patternDataCollection[task[2]], textLengthCollection[task[2]], patternLengthCollection[task[2]], searchOutcome);

		//send result to the master
		MPI_Isend(&searchOutcome, task[1]+1, MPI_INT, 0, 0, MPI_COMM_WORLD, &r); //+1 ensures terminator can be sent

		//check to see if we are done - mpi test - if not keep going
		MPI_Test(&request, &allTestFinished, MPI_STATUS_IGNORE); 

		//lets the process enter the busy wait loop again
		flag = 0; 
	}
}

void master(int *textLengthCollection, int *patternLengthCollection, int npes, int numberOfTests, int controlTests[][3]) {

	//reusable test case variables
	int searchStartIndex;
	int taskSize;
	int smallestValue;
	int task[4];
	int activeSlave = 0; 
	int foundPattern = -1;
	int resultLoop = 0;
	int searchType;
	int currText;
	int currPattern;
	MPI_Request r;
	int foundManyPattern = -1;

	//numberOfTests = 6;

	//loop all test cases
	int testCaseIndex;
	int processCount;
	for (testCaseIndex = 0; testCaseIndex < numberOfTests; testCaseIndex++) { //real condition is number of tests
		
		searchStartIndex = 0;
		smallestValue = INT_MAX; //to account for the text size being unknown and potentially huge pattern positions
		foundPattern = -1; //default incase no pattern is found
	
		//get the indexes for this test case
		searchType = controlTests[testCaseIndex][0];
		currText = controlTests[testCaseIndex][1];
		currPattern = controlTests[testCaseIndex][2];

		//if p > t then skip test and add results to the file and skip this iteration
		if (patternLengthCollection[testCaseIndex] > textLengthCollection[testCaseIndex]) {
			outputResults(currText, currPattern, -1); 
			continue;
		}

		//in the case of a decimal result C will floor the decimal - so the plus one accounts for this (downside of giving the last process less work overall)
		//if (searchType == 1) {
			//taskSize = (textLengthCollection[testCaseIndex] / (npes - 1)) + 1;
		//}
		//else {
			taskSize = 600;
		//}

		//prepare a task template for each thread
		task[0] = searchStartIndex;
		task[1] = taskSize;
		task[2] = testCaseIndex;
		task[3] = searchType;

		//give each process a task to work on
		for (processCount = 1; processCount < npes; processCount++) {

			if (task[0] <= textLengthCollection[testCaseIndex] - patternLengthCollection[testCaseIndex]) { //only search if there is enough room for the process ot have one index
				
				//send the task to a process
				MPI_Isend(&task, 4, MPI_INT, processCount, 0, MPI_COMM_WORLD, &r);

				//get start position for the next process
				task[0] = task[0] + task[1];

				activeSlave++;
			}
			else {
				break;
			}
		}

		//check for results  - keep looping until all slaves are complete
		while (activeSlave != 0) { 
		
			//prepare for data from the slaves
			int results[taskSize +1]; //+1 ensures the terminator can also be received and accounts for every position having a pattern
			MPI_Status status;
			MPI_Recv(&results, taskSize +1, MPI_INT, MPI_ANY_SOURCE, 0, MPI_COMM_WORLD, &status);
			
			activeSlave--;
			
				if (task[3] == 0) { //branch based on search type

					if (results[0] != -1 || (activeSlave == 0 && foundPattern ==1)) { //only allow -1 result entry when its the last process

						foundPattern = 1; //we have found the pattern (or rather 'a' pattern)

						if (results[0] < smallestValue && results[0] != -1) { //only get the smallest index in this case
							smallestValue = results[0];
						}

						if (activeSlave == 0) { //if all slaves done
							outputResults(currText, currPattern, smallestValue); //add smallest found value out of them all
						}
					}

				}
				else if (results[0] != -1){ //multiple patterns

						foundPattern = 1; //we have found the pattern (or rather 'a' pattern)

						//loop until we hit the terminating character
						while (results[resultLoop] != -2) {

							//add all the pattern instances
							outputResults(currText, currPattern, results[resultLoop]);

							//get next value in results array
							resultLoop++;
						}

						//reset for the next slave
						resultLoop = 0;
					}	

				// if text remaining to be analysed and search type is 0
				if (task[0] <= textLengthCollection[testCaseIndex] - patternLengthCollection[testCaseIndex]) //stop zero search searching
				{
					MPI_Send(&task, 4, MPI_INT, status.MPI_SOURCE, 0, MPI_COMM_WORLD); //send back to the process
					task[0] = task[0] + task[1];
					activeSlave++;
				}
		}

		//if the pattern is not found at all
		if (foundPattern == -1) {
			outputResults(currText, currPattern, -1);
		} 

	}

	//tell slaves we are done
	int jobDone = 1;
	MPI_Request request;
	int i;
	for (i = 1; i < npes; i++) //each slave one a time
	{
		MPI_Isend(&jobDone, 1, MPI_INT, i, 1, MPI_COMM_WORLD, &request); 
	}

}

int main(int argc, char **argv)
{
	//used to hold the number of processes and each threads rank
	int npes, myrank, numTests;
	int numberOfTests = readControl();

	//open results file
	char resultsfile[] = "result_MPI.txt";
	ofile = fopen(resultsfile, "w");

	// Read all the input data associated with the assignment to avoid repeated sending to slaves (hard coded number of tests)
	char *textDataCollection[numberOfTests];
	int textLengthCollection[numberOfTests];
	char *patternDataCollection[numberOfTests];
	int patternLengthCollection[numberOfTests];

	//get the data and add to an array of as vectors.
	readAllText(textDataCollection, textLengthCollection, numberOfTests);
	readAllPattern(patternDataCollection, patternLengthCollection, numberOfTests);

	//sets up the MPI environment - each process will run the same code after this line
	MPI_Init(&argc, &argv);

	MPI_Comm_size(MPI_COMM_WORLD, &npes);
	MPI_Comm_rank(MPI_COMM_WORLD, &myrank);

	//instigate master slave model
	if (myrank == 0) {
		master(textLengthCollection, patternLengthCollection, npes, numberOfTests, controlTests);
	}
	else {
		slave(textDataCollection, patternDataCollection, textLengthCollection, patternLengthCollection, myrank);
	}

	//close MPI environment
	MPI_Finalize();
}
