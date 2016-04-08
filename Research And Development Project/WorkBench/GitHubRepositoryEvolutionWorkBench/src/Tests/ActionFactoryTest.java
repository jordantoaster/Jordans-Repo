/**
 * @author Jordan McDonald
 *
 * Description - unit tests for the action factory class
 */

package Tests;

import static org.junit.Assert.*;
import org.junit.*;
import Actions.ActionFactory;
import Actions.ClearAction;
import Actions.ExportAction;
import Actions.ImportAction;
import Actions.LawsAction;
import Actions.LoginAction;
import Actions.RegisterAction;
import Actions.StatsAction;
import Actions.StoreContributionAction;
import Actions.StoreGenericAction;

public class ActionFactoryTest {
	
	String input;
	
	@Before
	public void setup(){
		input = "login";
	}
	
	@Test
	public void testFactory(){
        Assert.assertTrue(ActionFactory.getAction(input) instanceof LoginAction);
        input = "register";
        Assert.assertTrue(ActionFactory.getAction(input) instanceof RegisterAction);
        input = "storeContributions";
        Assert.assertTrue(ActionFactory.getAction(input) instanceof StoreContributionAction);
        input = "storeGeneric";
        Assert.assertTrue(ActionFactory.getAction(input) instanceof StoreGenericAction);
        input = "stats";
        Assert.assertTrue(ActionFactory.getAction(input) instanceof StatsAction);
        input = "laws";
        Assert.assertTrue(ActionFactory.getAction(input) instanceof LawsAction);
        input = "export";
        Assert.assertTrue(ActionFactory.getAction(input) instanceof ExportAction);
        input = "import";
        Assert.assertTrue(ActionFactory.getAction(input) instanceof ImportAction);        
        input = "clear";
        Assert.assertTrue(ActionFactory.getAction(input) instanceof ClearAction);
        input = "clea";
        Assert.assertFalse(ActionFactory.getAction(input) instanceof ClearAction);
	}	

}
