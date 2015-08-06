using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Media.Animation;
using ScrumDevelopmentApplication.ProjectUserServiceReference;
using ScrumDevelopmentApplication.ProjectServiceReference;
using ScrumDevelopmentApplication.UserServiceReference;
using ScrumDevelopmentServer;
using System.Windows.Controls;
using IUserService = ScrumDevelopmentInterface.IUserService;

namespace ScrumDevelopmentApplication.Model
{
    internal class AddTeamMember
    {
        private string _email;
        public AddTeamMember(string email)
        {
            _email = email;
        }

        /// <summary>
        /// Adds a user to the database if the validation is satisfied
        /// </summary>
        public bool AddMember(string email, bool scrumMaster, bool productOwner, bool developer, int projectId)
        {
            var projectClient = new ProjectServiceClient();
            var description = projectClient.GetProjectDescription(projectId);
            var projectUserClient = new ProjectUserServiceClient();
            try
            {
                if (productOwner)
                {
                    projectUserClient.DeleteProductOwner(projectId);
                }
                return projectUserClient.InsertProjectUser(email, scrumMaster, productOwner, developer, projectId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }

        /// <summary>
        /// Returns an array of users who match the search parameters
        /// </summary>
        public static string[] SearchForUsers(string searchString, bool productOwner, bool scrumMaster, bool developer)
        {
            var projectClient = new ProjectServiceClient();
            try
            {
                return projectClient.SearchForProjectUser(searchString, productOwner, scrumMaster, developer);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return null;
        }

        /// <summary>
        /// Creates a user client that calls the compare method in the user service
        /// </summary>
        public bool CompareEmail(string email)
        {

            var userClient = new UserServiceClient();
            try
            {
                if (userClient.CompareEmail(email))
                {
                    return true;
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine("Error occurred when checking if a valid email address: " + e);
                MessageBox.Show("Not a recognised email. Please try again.");
            }
            return false;
        }

        /// <summary>
        /// Flters data through to the service to determine if the selected roles are valid
        /// </summary>
        public bool ValidRoles(String email, CheckBox scrumMaster, CheckBox productOwner, CheckBox developer)
        {
            var userClient = new UserServiceClient();

            try
            {
                if (userClient.CheckIfRolesValid(email, scrumMaster.IsChecked, productOwner.IsChecked, developer.IsChecked))
                {
                    return true;
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine("Error occurred when checking if a valid email address: " + e);
                MessageBox.Show("Not a recognised email. Please try again.");
            }

            return false;
        }
        /// <summary>
        /// Checks if user is already assigned to the project
        /// </summary>
        public static bool IsUserInTheProject(string email, int projectId, string role)
        {
            var projectClient = new ProjectUserServiceClient();
            try
            {
                return projectClient.IsUserInTheProject(email, projectId, role);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }
        /// <summary>
        /// Checks if user is a project owner
        /// </summary>
        public static bool IsProjectOwner(string email, int projectId)
        {
            var projectClient = new ProjectUserServiceClient();
            try
            {
                return projectClient.IsProjectOwner(email, projectId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }
    }
}
