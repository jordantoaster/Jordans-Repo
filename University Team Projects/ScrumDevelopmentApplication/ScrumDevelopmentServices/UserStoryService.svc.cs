using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "UserStoryService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select UserStoryService.svc or UserStoryService.svc.cs at the Solution Explorer and start debugging.
    public class UserStoryService : IUserStoryService
    {
        /// <summary>
        /// Inserts a user story to the database
        /// </summary>
        public bool InsertUserStory(int? newSBacklogId, string newTitle, string newDescription, int newPriority, int newProjectId)
        {
            Console.WriteLine("Entering InsertUserStory...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {

                    var entry = new UserStory
                    {
                        sBacklogId = newSBacklogId,
                        title = newTitle,
                        Description = newDescription,
                        priority = newPriority,
                        projectId = newProjectId
                    };

                    db.UserStories.Add(entry);
                    db.SaveChanges();
                    Console.WriteLine("Returning true...");
                    Console.WriteLine("Exiting InsertUserStory...");
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("UserStoryService | InsertUserStory - Error caught: " + e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting InsertUseStory...");
            return false;
        }

        /// <summary>
        /// updates a user story based on the parameters
        /// </summary>
        public bool UpdateUserStory(int id, string newTitle, string newDescription, int newStoryPoints, int newPriority)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var userStory = (from u in db.UserStories
                                     where u.Id == id
                                     select u).First();
                    if (newStoryPoints >= 0 && newPriority > 0)
                    {
                        userStory.title = newTitle;
                        userStory.Description = newDescription;
                        userStory.storyPoints = newStoryPoints;
                        userStory.priority = newPriority;

                        db.SaveChanges();

                        Console.WriteLine("Returning true...");
                        return true;
                    }

                }


            }

            catch (Exception e)
            {
                Console.WriteLine("UserStoryService | UpdateUserStory - Error caught: " + e);

            }
            return false;
        }

        /// <summary>
        /// gets a user story based on the id
        /// </summary>
        public string[] GetUserStory(int userStoryId)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var userStory = (from u in db.UserStories
                                     where u.Id == userStoryId
                                     select u).First();

                    string[] returnString = { userStory.title, userStory.Description, userStory.storyPoints.ToString(), userStory.priority.ToString() };

                    Debug.WriteLine("Returning...");
                    return returnString;
                }


            }

            catch (Exception e)
            {
                Debug.WriteLine("UserStoryService | GetUserStory - Error caught: " + e);

            }
            return null;
        }

        /// <summary>
        /// deletes a user story based on the id
        /// </summary>
        public bool DeleteUserStory(int id)
        {
            Console.WriteLine("Entering DeleteUseStoryr...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var userStory = (from u in db.UserStories
                                     where (u.Id == id)
                                     select u).First();
                    db.UserStories.Remove(userStory);
                    db.SaveChanges();
                    Console.WriteLine("Returning true...");
                    Console.WriteLine("Exiting DeleteUserStory...");
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("UserStoryService | DeleteUserStory - Error caught: " + e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting DeleteUserStory...");
            return false;
        }

        /// <summary>
        /// determines if a user story exists in the db
        /// </summary>
        public bool DoesUserStoryExist(int id)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var userStory = (from u in db.UserStories
                                     where (u.Id == id)
                                     select u).First();
                    if (userStory != null) return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return false;

        }

       
        /// <summary>
        /// gets the user story id of the last story in the db
        /// </summary>
        public int GetLastUserStoryId()
        {
            Console.WriteLine("Entering GetLastUserStoryId...");
            int id;
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    id = (from u in db.UserStories
                          select u.Id).Last();
                }
                return id;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            Console.WriteLine("Exiting GetLastUserStoryId...");
            Console.WriteLine("Error retreiving UserStoryId returning 0 ");
            return 0;
        }

        /// <summary>
        /// gets a list of user stories in a project
        /// </summary>
        public List<string> GetStoryList(int projectId)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    
                    var ids = (from s in db.UserStories
                               where s.projectId == projectId
                               select s.Id.ToString()).ToArray();

                    return ids.ToList();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Debug.WriteLine("Exiting GetProjectList...");
            return null;
        }

        /// <summary>
        /// gets a priotiy of a story inside a project
        /// </summary>
        public int GetPriority(int projectId)
        {
            Console.WriteLine("Entering GetPriority...");
            int priority;
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    priority = (from s in db.UserStories
                                where s.projectId == projectId
                                select s.priority).ToArray().Length;

                    return priority + 1;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Exiting GetPriority...");
            Console.WriteLine("Error retreiving Priority returning 0 ");
            return 0;
        }
        /// <summary>
        /// Gets the numbers of user stories assigned to the project
        /// (required to calculate the decreasing priority)
        /// </summary>
        public int GetPriorityLength(int projectId)
        {
            Console.WriteLine("Entering GetPriorityLength...");
            int priority;
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    priority = (from s in db.UserStories
                                where s.projectId == projectId
                                select s.priority).ToArray().Length;

                    return priority;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Exiting GetPriorityLength...");
            Console.WriteLine("Error retreiving PriorityLength returning 0 ");
            return 0;
        }

        /// <summary>
        /// returns the unique identifier of a user story
        /// </summary>
        public int GetUserStoryId(int priority, int projectId)
        {
            Console.WriteLine("Entering GetUserStoryId...");
            int userStoryId;
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    userStoryId = (from s in db.UserStories
                                   where s.priority == priority
                                   && s.projectId == projectId
                                   select s.Id).First();

                    return userStoryId;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Exiting GetUserStoryId...");
            Console.WriteLine("Error retreiving UserStoryId returning 0 ");
            return 0;
        }
        /// <summary>
        /// Returns updated priority (required for priority swap method)
        /// </summary>
        public int GetPriorityUpdate(int userStoryId)
        {
            Console.WriteLine("Entering GetPriorityUpdate...");
            int priority;
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    priority = (from s in db.UserStories
                                where s.Id == userStoryId
                                select s.priority).First();

                    return priority;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Exiting GetPriorityUpdate...");
            Console.WriteLine("Error retreiving Priority returning 0 ");
            return 0;
        }

        /// <summary>
        /// gets a user stories description
        /// </summary>
        public string GetDescription(int userStoryId)
        {
            Console.WriteLine("Entering GetDescription...");
            string description;
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    description = (from s in db.UserStories
                                   where s.Id == userStoryId
                                   select s.Description).First();

                    return description;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Exiting GetDescription...");
            Console.WriteLine("Error retreiving Description returning empty string ");
            return "";
        }

        /// <summary>
        /// gets a user stories story points
        /// </summary>
        public int GetStoryPoints(int userStoryId)
        {
            Console.WriteLine("Entering GetStoryPoints...");
            int sPoints;
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    sPoints = (from s in db.UserStories
                               where s.Id == userStoryId
                               select s.storyPoints).First();

                    return sPoints;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Exiting GetStoryPoints...");
            Console.WriteLine("Error retreiving StoryPoints returning 0 ");
            return 0;
        }


        /// <summary>
        /// gets a list of priorites from the database
        /// </summary>
        public int[] GetPriorityList(int projectId)
        {
            Debug.WriteLine("Entering GetProjectList...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    // var projects = db.Projects.SqlQuery("SELECT name FROM projects").ToList();
                    var projects = (from p in db.UserStories
                        where p.projectId == projectId
                        select p.priority).ToArray();

                    return projects;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Debug.WriteLine("Exiting GetProjectList...");

            return null;
        }

        /// <summary>
        /// Checks for old priority and overwrites it with the new one,
        /// required when user story is deleted and priorities are decreased
        /// </summary>
        public bool InsertPriority(int oldpriority, int newpriority, int projectId)
        {
            Debug.WriteLine("Entering InsertPriority...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var userStory = (from u in db.UserStories
                                     where u.projectId == projectId
                                     && u.priority == oldpriority
                                     select u).First();

                    userStory.priority = newpriority;

                    db.SaveChanges();

                    Console.WriteLine("Returning true...");
                    Console.WriteLine("Exiting InsertPriority...");
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("UserStoryService | InsertPriority - Error caught: " + e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting InsertPriority...");
            return false;
        }

        /// <summary>
        /// checks a story is in a sprint
        /// </summary>
        public bool IsStoryInTheSprint(int storyId, int sprintId)
        {
            Debug.WriteLine("Entering IsStoryInTheSprint...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var userStory = (from u in db.UserStories
                                     where u.Id == storyId
                                     && u.sprintId == sprintId
                                     select u).First();
                    if(userStory != null)


                    Console.WriteLine("Returning true...");
                    Console.WriteLine("Exiting IsStoryInTheSprint...");
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("UserStoryService | IsStoryInTheSprint - Error caught: " + e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting IsStoryInTheSprint...");
            return false;
        }

       
    }
}