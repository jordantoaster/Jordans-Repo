using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "ProjectUserService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select ProjectUserService.svc or ProjectUserService.svc.cs at the Solution Explorer and start debugging.
    public class ProjectUserService : IProjectUserService
    {
        /// <summary>
        /// Inserts a user associated to a project into the database
        /// </summary>
        public bool InsertProjectUser(string email, bool scrumMaster, bool productOwner, bool developer, int projectId)
        {
            Debug.WriteLine("Entering InsertProjectUser...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    if (scrumMaster)
                    {
                        var entry = new ProjectUser
                        {
                            userEmail = email,
                            projectId = projectId,
                            roleName = "ScrumMaster"
                            
                        };
                        db.ProjectUsers.Add(entry);
                    }

                    if (productOwner)
                    {
                        var entry = new ProjectUser
                        {
                            userEmail = email,
                            projectId = projectId,
                            roleName = "ProductOwner"
                        };
                        db.ProjectUsers.Add(entry);
                    }

                    if (developer)
                    {
                        var entry = new ProjectUser
                        {
                            userEmail = email,
                            projectId = projectId,
                            roleName = "Developer"
                        };
                        db.ProjectUsers.Add(entry);
                    }

                    db.SaveChanges();
                    Debug.WriteLine("Returning true...");
                    Debug.WriteLine("Exiting InsertProjectUser...");
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting InsertProjectUser...");
            return false;
        }

        /// <summary>
        /// deletes a project user based on the parameters
        /// </summary>
        public bool DeleteProjectUser(string email, int projectId, string role)
        {
            Console.WriteLine("Entering DeleteProjectUser...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var puser = (from u in db.ProjectUsers
                                        where 
                                            u.userEmail == email
                                            && u.roleName == role
                                            && u.projectId == projectId
                                        select u).First();
                    db.ProjectUsers.Remove(puser);
                    db.SaveChanges();
                    Console.WriteLine("Returning true...");
                    Console.WriteLine("Exiting DeleteProjectUser...");
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting DeleteProjectUser...");
            return false;
        }

        /// <summary>
        /// determines if a user the project owner
        /// </summary>
        public bool IsProjectOwner(string email, int projectId)
        {
            Console.WriteLine("Entering IsProjectOwner...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var puser = (from u in db.ProjectUsers
                                 where
                                     u.userEmail == email
                                     && u.roleName == "ProjectOwner"
                                     && u.projectId == projectId
                                 select u).First();
                    if (puser != null)
                    {
                        Console.WriteLine("Returning true...");
                        Console.WriteLine("Exiting IsProjectOwner...");
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting IsProjectOwner...");
            return false;
        }

        /// <summary>
        /// determines if the user is a developer
        /// </summary>
        public bool IsDeveloper(string email, int projectId)
        {
            Console.WriteLine("Entering IsDeveloper...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var puser = (from u in db.ProjectUsers
                                 where
                                     u.userEmail == email
                                     && u.roleName == "Developer"
                                     && u.projectId == projectId
                                 select u).First();
                    if (puser != null)
                    {
                        Console.WriteLine("Returning true...");
                        Console.WriteLine("Exiting IsDeveloper...");
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting IsDeveloper...");
            return false;
        }

        /// <summary>
        /// determines if a project user is the product owner
        /// </summary>
        public bool IsProductOwner(string email, int projectId)
        {
            Console.WriteLine("Entering IsProductOwner...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var puser = (from u in db.ProjectUsers
                                 where
                                     u.userEmail == email
                                     && u.roleName == "ProductOwner"
                                     && u.projectId == projectId
                                 select u).First();
                    if (puser != null)
                    {
                        Console.WriteLine("Returning true...");
                        Console.WriteLine("Exiting IsProductOwner...");
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting IsProductOwner...");
            return false;
        }

        /// <summary>
        /// checks if the user is a scrum master
        /// </summary>
        public bool IsScrumMaster(string email, int projectId)
        {
            Console.WriteLine("Entering IsScrumMaster...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var puser = (from u in db.ProjectUsers
                                 where
                                     u.userEmail == email
                                     && u.roleName == "ScrumMaster"
                                     && u.projectId == projectId
                                 select u).First();
                    if (puser != null)
                    {
                        Console.WriteLine("Returning true...");
                        Console.WriteLine("Exiting IsScrumMaster...");
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting IsScrumMaster...");
            return false;
        }

        /// <summary>
        /// returns an array of projects associated with a user
        /// </summary>
        public string[]GetAssociatedProjectList(string email)
        {
            Debug.WriteLine("Entering GetAssociatedProjectList...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var projects = new List<string>();
                    var projectids = (from p in db.ProjectUsers
                                      where p.userEmail == email
                                      select p.projectId
                                    ).ToArray();


                    foreach (var id in projectids)
                    {
                        var project = (from p in db.Projects
                                       where p.id == id
                                       select p.name
                                    ).First();
                        projects.Add(""+id+"."+project);
                    }


                    return projects.ToArray();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Debug.WriteLine("Exiting GetAssociatedProjectList...");

            return null;
        }

        /// <summary>
        /// deletes a user who is a product owner
        /// </summary>
        public void DeleteProductOwner(int projectId)
        {
            Debug.WriteLine("Entering DeleteProductOwner...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    // var projects = db.Projects.SqlQuery("SELECT name FROM projects").ToList();
                    var productOwner = (from p in db.ProjectUsers
                        where p.projectId == projectId &&
                              p.roleName == "ProductOwner"
                        select p
                        ).First();
                    db.ProjectUsers.Remove(productOwner);
                    db.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Debug.WriteLine("Exiting DeleteProductOwner...");
        }

        /// <summary>
        /// Gets an array of a team in a project
        /// </summary>
        public string[] GetProjectTeamList(int projectId)
        {
            Debug.WriteLine("Entering GetProjectTeamList...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var members = (from p in db.ProjectUsers
                                    where p.projectId == projectId
                                    select p.userEmail
                                    ).Distinct().ToArray();

                    return members;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Debug.WriteLine("Exiting GetProjectTeamList...");

            return null;
        }

        /// <summary>
        /// checks if a user is inside a project team
        /// </summary>
        public bool IsUserInTheProject(string email, int projectId, string role)
        {
            Debug.WriteLine("Entering IsUserInTheProject...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var projectUser = (from u in db.ProjectUsers
                                     where u.userEmail == email
                                     && u.projectId == projectId
                                     && u.roleName == role
                                     select u).First();
                    if (projectUser != null)


                    Console.WriteLine("Returning true...");
                    Console.WriteLine("Exiting IsUserInTheProject...");
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("ProjectUserService | IsUserInTheProject - Error caught: " + e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting IsUserInTheProject...");
            return false;
        }
    }
}