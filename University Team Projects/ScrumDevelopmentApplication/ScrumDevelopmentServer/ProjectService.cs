using ScrumDevelopmentInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using ScrumDevelopmentServer.ScrumDevelopmentDatabaseDataSetTableAdapters;

namespace ScrumDevelopmentServer
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "ProjectService" in both code and config file together.
    public class ProjectService : IProjectService
    {
        public bool InsertProject(string name, string email, string description)
        {
            Console.WriteLine("Entering InsertProject...");
            try
            {
                using (var projectAdapter = new ProjectTableAdapter())
                {
                    projectAdapter.Insert(name, description);
                    if (InsertProjectUser(name, description, email, "ProjectOwner"))
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
        public bool InsertProjectUser(string name, string description, string email, string role)
        {
            Console.WriteLine("Entering InsertProjectUser...");
            try
            {
                using (var projectUserAdapter = new ProjectUserTableAdapter())
                {
                    projectUserAdapter.Insert(email, name, role, description);
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
        public bool DeleteProject(string email, string name, string description)
        {
            Console.WriteLine("Entering DeleteProject...");
            try
            {
                using (var projectAdapter = new ProjectTableAdapter())
                {
                    if (DeleteProjectUser(email, name, description, "ProjectOwner"))
                    {
                        projectAdapter.Delete(name, description);
                        Console.WriteLine("Returning true...");
                        Console.WriteLine("Exiting DeleteProject...");
                        return true;
                    }
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
        public bool DeleteProjectUser(string email, string name, string description, string role)
        {
            Console.WriteLine("Entering DeleteProjectUser...");
            try
            {
                using (var projectUserAdapter = new ProjectUserTableAdapter())
                {
                    projectUserAdapter.Delete(email, name, role, description);
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
