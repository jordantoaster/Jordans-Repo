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


public class RTests {

	RConnectionDarwin R = new RConnectionDarwin();	
	
	@Test
	public void testMean() throws REngineException, REXPMismatchException{
		int[] testData = {2,3,1,6,4,2};
		assertEquals("3", R.mean(testData));
	}
	
	@Test
	public void testMedian() throws REngineException, REXPMismatchException{
		double[] testData = {2,3,1,6,4,2};
		assertEquals(2.5, R.median(testData),0.1);
	}
	
	@Test
	public void testCorrelation() throws REngineException, REXPMismatchException{
		int[] testData = {2,3,1,6,4,2}; int[] testDataTwo = {2,3,1,6,4,2};
		String[] result = R.correlation(testData, testDataTwo);
		
		assertEquals(Double.parseDouble(result[0]), 1.0,0.01);
		assertEquals(Double.parseDouble(result[1]), 1.0,0.01);
	}
	
	@Test
	public void testWilks() throws REngineException, REXPMismatchException{
		int[] testData = {2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2};
		String[] result = R.wilks(testData);
		
		assertEquals(0.1553, Double.parseDouble(result[0]),0.001);
	}
	
	@Test
	public void testSD() throws REngineException, REXPMismatchException{
		int[] testData = {80, 100, 80};
		assertEquals("11.547005383792516", R.standardDev(testData));
		
		int[] testDataTwo = {80, 100, 80, 4, 35};
		assertEquals("39.245381893924794", R.standardDev(testDataTwo));
		
		int[] testDataThree = {80, 100, 80,1,1};
		assertEquals("47.626673198954386", R.standardDev(testDataThree));
	}
	
	@Test
	public void testVariance() throws REngineException, REXPMismatchException{
		double[] testData = {80, 100, 80};
		assertEquals(133.3, R.getVariance(testData),0.1);
		
		double[] testDataTwo = {80, 100, 80, 4, 35};
		assertEquals(1540.2, R.getVariance(testDataTwo),0.1);
		
		double[] testDataThree = {80, 100, 80,1,1};
		assertEquals(2268.3, R.getVariance(testDataThree),0.1);
	}
	
	@Test
	public void testCulmVariance() throws REngineException, REXPMismatchException{
		double[] testData = {80, 100, 80};
		double[] results = R.getSeriesCulmVar(testData);
		
		assertEquals(200, results[0],0.1);
		assertEquals(133.3, results[1],0.1);
	}
	
	@Test
	public void testCross() throws REngineException, REXPMismatchException{
		double[] testData = {80, 100, 80};
		double[] testDataTwo = {80, 100, 80};
		
		assertEquals(0.166, R.crossCorrelation(testData, testDataTwo),0.001);
		
		double[] testDataThree = {30948,923,132,143,53,1,4324};
		double[] testDataFour = {3465,134,5646,24,1,43,1};
		
		assertEquals(0.868, R.crossCorrelation(testDataThree, testDataFour),0.001);
	}
	
}
