import static org.junit.Assert.*;
import org.junit.*;

public class BrickPuzzleUnitTests {
	
	@Test
	public void testPuzzle(){
		
		BrickPuzzle puzzle = new BrickPuzzle();
		
		assertEquals(true, puzzle.canCreateTargetSequence(1, 2, 11));
		assertEquals(true, puzzle.canCreateTargetSequence(8, 1, 13));
		assertEquals(true, puzzle.canCreateTargetSequence(5, 0, 5));
		assertEquals(true, puzzle.canCreateTargetSequence(7, 3, 20));
		assertEquals(true, puzzle.canCreateTargetSequence(2, 1, 7));
		assertEquals(true, puzzle.canCreateTargetSequence(9, 2, 19));
		assertEquals(true, puzzle.canCreateTargetSequence(9, 2, 11));
		assertEquals(true, puzzle.canCreateTargetSequence(1, 0, 1));
		assertEquals(true, puzzle.canCreateTargetSequence(4, 2, 4));
		assertEquals(true, puzzle.canCreateTargetSequence(3, 2, 3));
		assertEquals(false, puzzle.canCreateTargetSequence(0, 2, 11));
		assertEquals(false, puzzle.canCreateTargetSequence(10, 0, 11));
		assertEquals(false, puzzle.canCreateTargetSequence(2, 5, 3));
		assertEquals(false, puzzle.canCreateTargetSequence(4, 19, 100));
		assertEquals(false, puzzle.canCreateTargetSequence(0, 100, 33));
		assertEquals(false, puzzle.canCreateTargetSequence(0, 1, 2));
		assertEquals(false, puzzle.canCreateTargetSequence(2, 2, 9));
		assertEquals(false, puzzle.canCreateTargetSequence(1, 1, 11));
		assertEquals(false, puzzle.canCreateTargetSequence(7, 0, 8));
		assertEquals(false, puzzle.canCreateTargetSequence(98, 0, 99));		
	}
}
