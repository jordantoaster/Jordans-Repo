using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "SprintService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select SprintService.svc or SprintService.svc.cs at the Solution Explorer and start debugging.
    public class SprintService : ISprintService
    {
        /// <summary>
        /// Adds a sprint based on the parameters to the database
        /// </summary>
        public bool AddSprint(string name, string startDate, string endDate, int projectId, string userEmail)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var sprint = new Sprint
                    {
                        Name = name,
                        StartDate = startDate,
                        EndDate = endDate,
                        ProjectId = projectId
                    };
                    db.Sprints.Add(sprint);
                    db.SaveChanges();
                    var user = new SprintUser
                    {
                        projectId = projectId,
                        roleName = "ScrumMaster",
                        Sprint = sprint,
                        userEmail = userEmail
                    };
                    db.SprintUsers.Add(user);
                    db.SaveChanges();
                    return true;
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }

        /// <summary>
        /// returns a list of sprints based on a project id
        /// </summary>
        public string[] GetSprintList(int projectId)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var sprints = (from s in db.Sprints
                                   where s.ProjectId == projectId
                                   select s.Id + ". " + s.Name).ToArray();
                    return sprints;
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return null;
        }

        /// <summary>
        /// searches for a specefic user in a sprint tat satisfies the parameters and returns it as a list
        /// </summary>
        public List<string> SearchForSprintUser(string searchString, bool productOwner, bool scrumMaster, bool developer, int projectId)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {

                    var sprintUsers = new List<User>();

                    var sprintProjectId = (from p in db.ProjectUsers
                                           where p.projectId == projectId
                                           select p.userEmail).ToArray();

                    foreach (var userEmail in sprintProjectId)
                    {
                        var addUser = true;
                        var sprintUser = (from s in db.Users
                                          where s.email == userEmail
                                          select s).First();
                        foreach (var user in sprintUsers)
                        {
                            if (user.email == userEmail)
                            {
                                addUser = false;
                            }
                        }
                        if (addUser)
                            sprintUsers.Add(sprintUser);
                    }



                    var searchResults = new List<string>();
                    foreach (var p in sprintUsers)
                    {
                        var isDeveloper = developer && (bool)p.developer;
                        var isScrumMaster = scrumMaster && (bool)p.scrumMaster;
                        var isProductOwner = productOwner && (bool)p.productOwner;
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

                            if (!developer && !productOwner && !scrumMaster && (p.email.Contains(searchString) || p.bio.Contains(searchString)) && searchString != "")
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
        /// Adds a story to a sprint, and inserts it to the database
        /// </summary>
        public bool AddSprintStory(int storyId, int sprintId)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var story = (from s in db.UserStories
                                 where s.Id == storyId
                                 select s).First();
                    story.sprintId = sprintId;
                    db.SaveChanges();
                    return true;
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }
        /// <summary>
        /// Gets a list of sprint stories
        /// </summary>
        public List<string> GetSprintStories(int sprintId)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var stories = (from s in db.UserStories
                                   where s.sprintId == sprintId
                                   select s.Id.ToString()).ToArray();
                    return stories.ToList();
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return null;
        }

        /// <summary>
        /// Returns the prints associated with a specefic user
        /// </summary>
        public List<string> GetUserSprints(string email)
        {
            try
            {
                var sprintUsers = new List<Sprint>();

                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var sprintId = (from s in db.SprintUsers
                                   where s.userEmail == email
                                   select s.sprintId).ToArray();

                    foreach (var sprintIds in sprintId)
                    {
                        var addSprint = true;
                        var sprintUser = (from s in db.Sprints
                                          where s.Id == sprintIds
                                          select s).First();
                        foreach (var sprint in sprintUsers)
                        {
                            if (sprintUser.Id == sprint.Id)
                            {
                                addSprint = false;
                            }
                        }
                        if (addSprint)
                            sprintUsers.Add(sprintUser);
                    }
                }

                var searchResults = new List<string>();
                foreach (var p in sprintUsers)
                {
                    searchResults.Add(p.Id + "." + p.Name);
                }
                return searchResults;
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return null;
        }

    }
}
