/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the Rserve functions
 */

package Tests;

import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;
import org.rosuda.REngine.REXPMismatchException;
import org.rosuda.REngine.REngineException;

import StatisticsR.RConnectionDarwin;
import Utility.TestSetup;


public class RTests {

	RConnectionDarwin R = new RConnectionDarwin();	
	
	@Test
	public void testMean() throws REngineException, REXPMismatchException{
		int[] testData = TestSetup.generateRandomArrayInt(500);
		assertEquals("3", R.mean(testData));
	}
	
	@Test
	public void testMedian() throws REngineException, REXPMismatchException{
		double[] testData = TestSetup.generateRandomArray(500);
		assertEquals(2.5, R.median(testData),0.1);
	}
	
	@Test
	public void testCorrelation() throws REngineException, REXPMismatchException{
		int[] testData = TestSetup.generateRandomArrayInt(500); int[] testDataTwo = TestSetup.generateRandomArrayInt(500);
		String[] result = R.correlation(testData, testDataTwo);
		
		assertEquals(Double.parseDouble(result[0]), 1.0,0.01);
		assertEquals(Double.parseDouble(result[1]), 1.0,0.01);
	}
	
	@Test
	public void testWilks() throws REngineException, REXPMismatchException{
		int[] testData = TestSetup.generateRandomArrayInt(500);
		String[] result = R.wilks(testData);
		
		assertEquals(0.1553, Double.parseDouble(result[0]),0.001);
	}
	
	@Test
	public void testSD() throws REngineException, REXPMismatchException{
		int[] testData = TestSetup.generateRandomArrayInt(500);
		assertEquals("11.547005383792516", R.standardDev(testData));
		
		int[] testDataTwo = TestSetup.generateRandomArrayInt(500);;
		assertEquals("39.245381893924794", R.standardDev(testDataTwo));
		
		int[] testDataThree = TestSetup.generateRandomArrayInt(500);
		assertEquals("47.626673198954386", R.standardDev(testDataThree));
	}
	
	@Test
	public void testVariance() throws REngineException, REXPMismatchException{
		double[] testData = TestSetup.generateRandomArray(500);
		assertEquals(133.3, R.getVariance(testData),0.1);
		
		double[] testDataTwo = TestSetup.generateRandomArray(500);
		assertEquals(1540.2, R.getVariance(testDataTwo),0.1);
		
		double[] testDataThree = TestSetup.generateRandomArray(500);
		assertEquals(2268.3, R.getVariance(testDataThree),0.1);
	}
	
	@Test
	public void testCulmVariance() throws REngineException, REXPMismatchException{
		double[] testData = TestSetup.generateRandomArray(500);
		double[] results = R.getSeriesCulmVar(testData);
		
		assertEquals(200, results[0],0.1);
		assertEquals(133.3, results[1],0.1);
	}
	
	@Test
	public void testCross() throws REngineException, REXPMismatchException{
		double[] testData = TestSetup.generateRandomArray(500);
		double[] testDataTwo = TestSetup.generateRandomArray(500);
		
		assertEquals(0.166, R.crossCorrelation(testData, testDataTwo),0.001);
		
		double[] testDataThree = TestSetup.generateRandomArray(500);
		double[] testDataFour = TestSetup.generateRandomArray(500);
		
		assertEquals(0.868, R.crossCorrelation(testDataThree, testDataFour),0.001);
	}
	
}
