using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using ScrumDevelopmentApplication.ProjectServiceReference;
using ScrumDevelopmentApplication.ProjectUserServiceReference;
using ScrumDevelopmentInterface;
using ScrumDevelopmentServer;

namespace ScrumDevelopmentApplication.Model
{
    class ProjectWizardModel
    {
        /// <summary>
        /// Passes the received data to the service and returns a boolean based on the operations success
        /// </summary>
        public static bool CreateNewProject(string name, string email, string description, string startDate)
        {
            //call out to service
            var projectClient = new ProjectServiceClient();
            try
            {
                return projectClient.InsertProject(name, email, description, startDate);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Im sorry, somthing went wrong on our end. Please try again later", "Project not created");
                return false;
            }
        }

        /// <summary>
        /// Retrives the list of projects as an array into order too filter the data to the view
        /// </summary>
        public static string[] GetProjects()
        {
            var projectClient = new ProjectServiceClient();
            try
            {
                return projectClient.GetProjectList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Im sorry, somthing went wrong on our end. Please try again later");
                return null;
            }
        }

        /// <summary>
        /// Returns the projects accociated with a user as a string array
        /// </summary>
        public static string[] GetAssociatedProjects()
        {
            var projectClient = new ProjectUserServiceClient();
            try
            {
                return projectClient.GetAssociatedProjectList(User.Email);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Im sorry, somthing went wrong on our end. Please try again later");
                return null;
            }
        }
    }
}
