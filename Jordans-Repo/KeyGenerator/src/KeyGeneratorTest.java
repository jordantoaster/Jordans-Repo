/*
 * JUnit test class for the Key Generator
 * 1. checks that the keyGen produces keys with a length of 20
 * */

import static org.junit.Assert.*;
import org.junit.Test;

public class KeyGeneratorTest {
	@Test
	public void testKeyLength() {
		KeyGenerator keyGen = new KeyGenerator();
		
		assertEquals(keyGen.createKey().length(), 20);
		assertEquals(keyGen.createKey().length(), 20);
		assertEquals(keyGen.createKey().length(), 20);
	}
}
