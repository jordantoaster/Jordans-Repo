
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>
#include <time.h>
#include <omp.h>

//if values are wrong try changing to static scheduling on the all match loop in particular

////////////////////////////////////////////////////////////////////////////////
// Jordan McDonald - OMP Project File
////////////////////////////////////////////////////////////////////////////////

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

//Takes a test number as input - pre processor directives handle DOS op system alternatives
int readData (int text, int pattern)
{
	//Creates a pointer to a file & a char array which holds the file name
	FILE *f;
	char fileName[1000];
#ifdef DOS
        sprintf (fileName, "inputs\\text%d.txt", text);
#else
    //sets the file name char array to a formatted String containing a path and test number
    //in this case it represents the file name of the test text file.
	sprintf (fileName, "inputs/text%d.txt", text);
#endif
	//Opens the file based on the fileName and assigns its address to the pointer f
	f = fopen (fileName, "r");

	//if the file is not found exit the function
	if (f == NULL)
		return 0;

	//calls the function - passing in the file pointer and two variables
	//& gets the memory address of a variable
	readFromFile (f, &textData, &textLength);

	//close the file stream
	fclose (f);
#ifdef DOS
        sprintf (fileName, "inputs\\pattern%d.txt", pattern);
#else
    //See above - but for the pattern
	sprintf (fileName, "inputs/pattern%d.txt", pattern);
#endif
	//see above - but for the pattern
	f = fopen (fileName, "r");
	if (f == NULL)
		return 0;
	readFromFile (f, &patternData, &patternLength);
	fclose (f);

	return 1;

}

//this funtions handles the case where there is one pattern to find & stops searching access when the pattern is located immediately.
int hostMatch()
{

	//declares the required variables and assigns
	int i,j,k, lastI;
	i=0;
	j=0;
	k=0;
	int position = -1;

	//set to the difference between the text and pattern lengths
	//so the amount of the whole text that does not contain the pattern itself
	lastI = textLength-patternLength;

	//for correctness only run when the pattern is less then the text
	if (patternLength <= textLength)
	{
		// paralell loop
		#pragma omp parallel private(i,j) shared(position) num_threads(8)
		#pragma omp for schedule(guided)
		for (i = 0; i<(lastI + 1); i++)
		{
			//position is global so the search only occurs if another thread has not set a position for the pattern - the first ensures we can get the first pattern instance even if a later one has been found.
			if (i <= position || position == -1)
			{
				//attempt to find the pattern
				j = 0;
				while (j < patternLength && (textData[i + j] == patternData[j]))
				{
					j++;
				}
				if (j == patternLength) //if pattern found
				{
					#pragma omp critical //only allow one thread access to this block
					{
						if (i <= position || position == -1)
						{
							position = i; //set the position if found
						}
					}
				}
			}
		}
	}

	return position;
}

//handles the case with multiple patterns to be found in the text
int hostMatchAll(int text, int pattern)
{
	//declares the required variables and assigns
	int i, j, k, lastI;
	i = 0;
	j = 0;
	k = 0;
	int position = -1;

	//set to the difference between the text and pattern lengths
	//so the amount of the whole text that does not contain the pattern itself
	lastI = textLength - patternLength;

	//for correctness only run when the pattern is less then the text
	if (patternLength <= textLength)
	{
		// paralell loop
		#pragma omp parallel private(i,j) shared(position) num_threads(8)
		#pragma omp for schedule(guided) //runtime seems to cause issue with multiple patterns? finds same one twice (runtime lets system decide, should i really let the system decide?)
		for (i = 0; i<(lastI + 1); i++)
		{
			//attempt to find the pattern
			j = 0;
			while (j < patternLength && (textData[i + j] == patternData[j]))
			{
				j++;
			}
			if (j == patternLength) //if pattern found
			{
				#pragma omp critical //only allow one thread access to this block
				{
					position = i; //set the position if found
					fprintf(ofile, "%d %d %d \n", text, pattern, position); // - each pattern found is added to the file
				}
			}
		}
	}

	return position;
}

//function that handles over processing of the retreived pattern and text data
void processData(int occ, int inputText, int inputPattern)
{
	//declares two variables
	unsigned int result;

	if (occ == 0) { //used to get one pattern

		result = hostMatch();

		//print the results to the file
		fprintf(ofile, "%d %d %d \n", inputText, inputPattern, result);
	
	} 
	else { //handle the ecase where all patterns need to be found
		result = hostMatchAll(inputText, inputPattern);

		//handles the case where the pattern isnt found (ie the position is always -1)
		if(result == -1) //hanldes the case where a pattern isnt found
			fprintf(ofile, "%d %d %d \n", inputText, inputPattern, result);
	}

}

int main(int argc, char **argv)
{
	//used to retrieve the data from the control file
	int pAmount, inputText, inputPattern;

	//declare a FILE pointer for the control file & declare an array of chars to hold the file name
	FILE *controlFile;
	char fileName[1000]; //can I make this smaller to save time?
	char resultsfile[] = "result_OMP.txt";


	//assign file name based on the directory syntax of the operating system
	#ifdef DOS
		sprintf(fileName, "inputs\\control.txt");
	#else
		sprintf(fileName, "inputs/control.txt");
	#endif

	//open the control file in read mode and open an output file for writing the results
	controlFile = fopen(fileName, "r");
	ofile = fopen(resultsfile, "w");

	while (1) //another option here would be to count the number of lines in the control file in advance, will this prove faster than breaking?
	{
		//read the formatted data from the control file
		fscanf(controlFile, "%d %d %d", &pAmount, &inputText, &inputPattern);

		if (feof(controlFile)) //tests if it is the end of the file
			break;

		//read the pattern and text files
		readData(inputText, inputPattern);

		//kick start the searching process
		processData(pAmount, inputText, inputPattern);
	}

	////close the file streams
	fclose(controlFile);
	fclose(ofile);

	printf("out");
}
