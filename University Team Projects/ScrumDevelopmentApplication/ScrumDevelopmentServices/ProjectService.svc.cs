using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "ProjectService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select ProjectService.svc or ProjectService.svc.cs at the Solution Explorer and start debugging.
    public class ProjectService : IProjectService
    {
        /// <summary>
        /// Inserts a project into the database
        /// </summary>
        public bool InsertProject(string name, string email, string description, string startDate)
        {
            Console.WriteLine("Entering InsertProject...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var entry = new Project
                    {
                        name = name,
                        description = description,
                        startDate = startDate
                    };

                    db.Projects.Add(entry);
                    db.SaveChanges();
                    var id = entry.id;
                    if (InsertProjectUser(id, email, "ProjectOwner"))
                    {
                        Console.WriteLine("Returning true...");
                        Console.WriteLine("Exiting InsertProject...");
                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting InsertProject...");
            return false;
        }

        /// <summary>
        /// Inserts a project user to the table n the database
        /// </summary>
        public bool InsertProjectUser(int id, string email, string role)
        {
            Console.WriteLine("Entering InsertProjectUser...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var entry = new ProjectUser()
                    {
                        userEmail = email,
                        projectId = id,
                        roleName = role
                    };
                    db.ProjectUsers.Add(entry);
                    db.SaveChanges();
                    Console.WriteLine("Returning true...");
                    Console.WriteLine("Exiting InsertProjectUser...");
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
        /// returns a string array of projects
        /// </summary>
        public string[] GetProjectList()
        {
            Debug.WriteLine("Entering GetProjectList...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                   // var projects = db.Projects.SqlQuery("SELECT name FROM projects").ToList();
                    var projects = (from p in db.Projects
                                    select p.name).ToArray(); 

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
        /// passes in a project users details in order to search for him correctly
        /// </summary>
        public List<string> SearchForProjectUser(string searchString, bool productOwner, bool scrumMaster, bool developer)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var projects = (from p in db.Users
                                    select p).ToArray();


                    var searchResults = new List<string>();
                    foreach (var p in projects)
                    {
                        var isDeveloper = developer && (bool) p.developer;
                        var isScrumMaster = scrumMaster && (bool) p.scrumMaster;
                        var isProductOwner = productOwner && (bool) p.productOwner;
                        var matchEmail = false;
                        if (p.bio != null)
                        {
                            matchEmail = p.email.Contains(searchString) || p.bio.Contains(searchString);
                        }
                        else
                        {
                            p.bio = "";
                            matchEmail = p.email.Contains(searchString);
                        }
                        

                        if (matchEmail)
                        {
                            if (isDeveloper && isProductOwner && isScrumMaster)
                            {
                                searchResults.Add(p.email);
                                searchResults.Add(p.name);
                                continue;
                            }

                            if (!developer && isProductOwner && isScrumMaster)
                            {
                                searchResults.Add(p.email);
                                searchResults.Add(p.name);
                                continue;
                            }

                            if (!developer && !productOwner && isScrumMaster)
                            {
                                searchResults.Add(p.email);
                                searchResults.Add(p.name);
                                continue;
                            }

                            if (!developer && isProductOwner && !scrumMaster)
                            {
                                searchResults.Add(p.email);
                                searchResults.Add(p.name);
                                continue;
                            }

                            if (isDeveloper && !productOwner && isScrumMaster)
                            {
                                searchResults.Add(p.email);
                                searchResults.Add(p.name);
                                continue;
                            }

                            if (isDeveloper && !productOwner && !scrumMaster)
                            {
                                searchResults.Add(p.email);
                                searchResults.Add(p.name);
                                continue;
                            }

                            if (isDeveloper && isProductOwner && !scrumMaster)
                            {
                                searchResults.Add(p.email);
                                searchResults.Add(p.name);
                                continue;
                            }

                            if (!developer && !productOwner && !scrumMaster && (p.email.Contains(searchString) || p.bio.Contains(searchString)) && searchString!="")
                            {
                                searchResults.Add(p.email);
                                searchResults.Add(p.name);
                            }
                        }
                    }

                    return searchResults;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return null;
        }

        /// <summary>
        /// gets the start date of a project based on the id
        /// </summary>
        public string GetProjectStartDate(int id)
        {
            Debug.WriteLine("Entering GetProjectStartDate...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {

                    var startDate = (from p in db.Projects
                                       where p.id == id
                                       select p.startDate).First();


                    return startDate;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Debug.WriteLine("Exiting GetProjectStartDate...");

            return null;
        }

        /// <summary>
        /// gets a projects description
        /// </summary>
        public string GetProjectDescription(int id)
        {
            Debug.WriteLine("Entering GetProjectDescription...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {

                    var description = (from p in db.Projects
                                        where p.id == id
                                        select p.description).First();


                    return description;
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
        /// deletes a project from the database
        /// </summary>
        public bool DeleteProject(string email, int id)
        {
            Console.WriteLine("Entering DeleteProject...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    DeleteProjectUser(email, id, "ProjectOwner");
                    var project = (from u in db.Projects
                        where 
                            u.id == id
                        select u).First();
                    db.Projects.Remove(project);
                    db.SaveChanges();
                    Console.WriteLine("Returning true...");
                    Console.WriteLine("Exiting DeleteProject...");
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting DeleteProject...");
            return false;
        }

        /// <summary>
        /// Deletes a project user from the database
        /// </summary>
        public bool DeleteProjectUser(string email, int id, string role)
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
                                            && u.projectId == id
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
        }
    }
