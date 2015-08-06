using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "AcceptanceTestService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select AcceptanceTestService.svc or AcceptanceTestService.svc.cs at the Solution Explorer and start debugging.
    public class AcceptanceTestService : IAcceptanceTestService
    {
        /// <summary>
        /// Inserts an acceptance test to the user story
        /// </summary>
        public bool InsertAcceptanceTest(string atName, string atDescription, int userStoryId)
        {
            Console.WriteLine("Entering InsertAcceptanceTest...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var entry = new AcceptanceTest
                    {
                        name = atName,
                        description = atDescription,
                        userStoryId = userStoryId
                    };
                    db.AcceptanceTests.Add(entry);
                    db.SaveChanges();
                    Console.WriteLine("Returning true...");
                    Console.WriteLine("Exiting InsertAcceptanceTest...");
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting InsertAcceptanceTest...");
            return false;
        }

        /// <summary>
        /// deletes an acceptance test
        /// </summary>
        public bool DeleteAcceptanceTest(int testId)
        {
            Console.WriteLine("Entering DeleteAcceptanceTest...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var test = (from u in db.AcceptanceTests
                                where u.id == testId
                                select u).First();
                    db.AcceptanceTests.Remove(test);
                    db.SaveChanges();
                    Console.WriteLine("Returning true...");
                    Console.WriteLine("Exiting DeleteAcceptanceTest...");
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting DeleteAcceptanceTest...");
            return false;
        }

        /// <summary>
        /// returns a list of acceptance tests
        /// </summary>
        public string[] GetTestList(int storyId)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var tests = (from s in db.AcceptanceTests
                                 where s.userStoryId == storyId
                                 select s.id + ". " + s.name).ToArray();
                    return tests;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Debug.WriteLine("Exiting GetTestList...");

            return null;
        }

        /// <summary>
        /// Gets a list of acceptance tests
        /// </summary>
        public string[] GetAcceptanceTest(int acceptanceTestId)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var acceptanceTest = (from a in db.AcceptanceTests
                                          where a.id == acceptanceTestId
                                          select a).First();

                    string[] returnString = { acceptanceTest.id.ToString(), acceptanceTest.name, acceptanceTest.description, acceptanceTest.userStoryId.ToString() };

                    Debug.WriteLine("Returning Acceptance Test...");
                    return returnString;
                }


            }

            catch (Exception e)
            {
                Debug.WriteLine("UserStoryService | GetAcceptanceTest - Error caught: " + e);

            }
            return null;
        }

    }

}
