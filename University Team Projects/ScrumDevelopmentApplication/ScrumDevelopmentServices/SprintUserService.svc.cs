using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "SprintUserService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select SprintUserService.svc or SprintUserService.svc.cs at the Solution Explorer and start debugging.
    public class SprintUserService : ISprintUserService
    {
        /// <summary>
        /// Returns a list of project team users based on a sprint id
        /// </summary>
        public string[] GetProjectTeamList(string sprintId)
        {
            int x = Convert.ToInt32(sprintId);

            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var members = (from p in db.SprintUsers
                                   where p.sprintId == x
                                   select p.userEmail
                                    ).ToArray();

                    return members;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return null;
        }

        /// <summary>
        /// Inserts a sprint user to the table in the database
        /// </summary>
        public bool InsertSprintUser(string email, bool scrumMaster, bool productOwner, bool developer, int projectId, int sprintId)
        {
            Debug.WriteLine("Entering InsertSprintUser...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    if (scrumMaster)
                    {
                        var entry = new SprintUser
                        {
                            userEmail = email,
                            sprintId = sprintId,
                            roleName = "ScrumMaster",
                            projectId = projectId
                        };
                        db.SprintUsers.Add(entry);
                    }

                    if (productOwner)
                    {
                        var entry = new SprintUser
                        {
                            userEmail = email,
                            sprintId = sprintId,
                            roleName = "ProductOwner",
                            projectId = projectId
                        };
                        db.SprintUsers.Add(entry);
                    }

                    if (developer)
                    {
                        var entry = new SprintUser
                        {
                            userEmail = email,
                            sprintId = sprintId,
                            roleName = "Developer",
                            projectId = projectId
                        };
                        db.SprintUsers.Add(entry);
                    }

                    db.SaveChanges();
                    Debug.WriteLine("Returning true...");
                    Debug.WriteLine("Exiting InsertSprintUser...");
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting InsertSprintUser...");
            return false;
        }

        /// <summary>
        /// returns true if the user email is the project owner
        /// </summary>
        public bool IsProjectOwner(string email, string sprintId)
        {
            int x = Int32.Parse(sprintId);
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var suser = (from u in db.SprintUsers
                                 where
                                     u.userEmail == email
                                     && u.roleName == "ProjectOwner"
                                     && u.sprintId == x
                                 select u).First();
                    if (suser != null)
                    {
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return false;
        }

        /// <summary>
        /// Determines if the email user is the product owner
        /// </summary>
        public bool IsProductOwner(string email, string sprintId)
        {
            int x = Int32.Parse(sprintId);
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var suser = (from u in db.SprintUsers
                                 where
                                     u.userEmail == email
                                     && u.roleName == "ProductOwner"
                                     && u.sprintId == x
                                 select u).First();
                    if (suser != null)
                    {
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return false;
        }

        /// <summary>
        /// Determines if the passed in users email is the scrummaster
        /// </summary>
        public bool IsScrumMaster(string email, string sprintId)
        {
            int x = Int32.Parse(sprintId);
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var suser = (from u in db.SprintUsers
                                 where
                                     u.userEmail == email
                                     && u.roleName == "ScrumMaster"
                                     && u.sprintId == x
                                 select u).First();
                    if (suser != null)
                    {
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return false;
        }

        /// <summary>
        /// determines if the user is the developer
        /// </summary>
        public bool IsDeveloper(string email, string sprintId)
        {
            int x = Int32.Parse(sprintId);
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var suser = (from u in db.SprintUsers
                                 where
                                     u.userEmail == email
                                     && u.roleName == "Developer"
                                     && u.sprintId == x
                                 select u).First();
                    if (suser != null)
                    {
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return false;
        }

        /// <summary>
        /// Detects if the user is assigned to the sprint
        /// </summary>
        public bool IsUserInTheSprint(string email, int sprintId, int projectId)
        {
            Debug.WriteLine("Entering IsUserInTheSprint...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var sprintUser = (from u in db.SprintUsers
                                       where u.userEmail == email
                                       && u.sprintId == sprintId
                                       && u.projectId == projectId
                                       select u).First();
                    if (sprintUser != null)


                    Console.WriteLine("Returning true...");
                    Console.WriteLine("Exiting IsUserInTheSprint...");
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("SprintUserService | IsUserInTheSprint - Error caught: " + e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting IsUserInTheSprint...");
            return false;
        }

    }
}
