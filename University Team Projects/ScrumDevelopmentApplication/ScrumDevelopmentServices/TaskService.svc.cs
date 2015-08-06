using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "TaskService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select TaskService.svc or TaskService.svc.cs at the Solution Explorer and start debugging.
    public class TaskService : ITaskService
    {
        /// <summary>
        /// This service method takes in parameters needed to define a task and inserts it to the database task table
        /// </summary>
        public bool InsertTask(string name, string description, bool? blocked, string reason, int hours, int userStoryId)
        {
            try
            {
                if (blocked == false) reason = null;
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var task = new Task
                    {
                        Name = name,
                        Description = description,
                        Blocked = blocked,
                        Reason = reason,
                        Hours = hours,
                        userStoryId = userStoryId
                    };
                    db.Tasks.Add(task);
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
        /// Takes in parameters that define a task and using the id identifier replaces the details with new ones
        /// </summary>
        public bool EditTask(int id, string newName, string newDescription, int newHours, bool? newBlocked, string newReason)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var task = db.Tasks.Find(id);
                    task.Name = newName;
                    task.Description = newDescription;
                    task.Hours = newHours;
                    task.Blocked = newBlocked;
                    task.Reason = newBlocked == true ? newReason : null;
                    db.SaveChanges();
                }
                return true;
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }

        /// <summary>
        /// A method that returns the task name based on an id
        /// </summary>
        public string GetName(int id)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var task = db.Tasks.Find(id);
                    return task.Name;
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return null;
        }

        /// <summary>
        /// returns the task description based on an id
        /// </summary>
        public string GetDescription(int id)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var task = db.Tasks.Find(id);
                    return task.Description;
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return null;
        }

        /// <summary>
        /// returns the task hours based on an id
        /// </summary>
        public int? GetHours(int id)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var task = db.Tasks.Find(id);
                    return task.Hours;
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return null; throw new NotImplementedException();
        }

        /// <summary>
        /// returns the task blocked boolean based on an id
        /// </summary>
        public bool? GetBlocked(int id)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var task = db.Tasks.Find(id);
                    return task.Blocked;
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return null; throw new NotImplementedException();
        }

        /// <summary>
        /// returns the task reason based on an id
        /// </summary>
        public string GetReason(int id)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var task = db.Tasks.Find(id);
                    return task.Reason;
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return null;
        }

        /// <summary>
        /// returns the task owner based on an id
        /// </summary>
        public string GetOwner(int id)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var task = db.Tasks.Find(id);
                    return task.userEmail;
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return null;
        }

        /// <summary>
        /// sets the task to blocked based on an id
        /// </summary>
        public bool BlockTask(int id, string reason)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var task = db.Tasks.Find(id);
                    task.Blocked = true;
                    task.Reason = reason;
                    db.SaveChanges();
                }
                return true;
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }

        /// <summary>
        /// Deletes a task based on a id
        /// </summary>
        public bool DeleteTask(int id)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var task = db.Tasks.Find(id);
                    db.Tasks.Remove(task);
                    db.SaveChanges();
                }
                return true;
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }

        /// <summary>
        /// Uses a task id to assign it to a user
        /// </summary>
        public bool AssignTask(int id, string userEmail)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var task = db.Tasks.Find(id);
                    task.userEmail = userEmail;
                    db.SaveChanges();
                }
                return true;
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }

        /// <summary>
        /// returns a list of tasks based on a user story
        /// </summary>
        public string[] GetTaskList(int userStoryId)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var tasks = (from t in db.Tasks
                                     where t.userStoryId==userStoryId
                                     select t.Id+". "+t.Name).ToArray();

                    return tasks;
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return null;
        }

        public int GetLastTaskId()
        {
            Console.WriteLine("Entering GetLastTaskId...");
            int id;
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    id = (from u in db.Tasks
                        select u.Id).Max();
                }
                return id;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return -1;
        }
    }
}
