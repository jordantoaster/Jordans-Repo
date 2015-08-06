using ScrumDevelopmentApplication.SprintServiceReference;
using ScrumDevelopmentApplication.SprintUserServiceReference;
using ScrumDevelopmentApplication.UserServiceReference;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace ScrumDevelopmentApplication.Model
{
    public class AddSprintTeamMember
    {
        private string _email;
        public AddSprintTeamMember(string email)
        {
            _email = email;
        }

        /// <summary>
        /// Returns an array of users who match the search parameters
        /// </summary>
        public static string[] SearchForUsers(string searchString, bool productOwner, bool scrumMaster, bool developer, int projectId)
        {
            var sprintClient = new SprintServiceClient();
            try
            {
                return sprintClient.SearchForSprintUser(searchString, productOwner, scrumMaster, developer, projectId);
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
        /// Adds a user to the database if the validation is satisfied
        /// </summary>
        public bool AddMember(string email, bool scrumMaster, bool productOwner, bool developer, int projectId, int sprintId)
        {
            var sprintUserClient = new SprintUserServiceClient();
            try
            {
                return sprintUserClient.InsertSprintUser(email, scrumMaster, productOwner, developer, projectId, sprintId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }
        /// <summary>
        ///  Checks if user is already assigned to the sprint
        /// </summary>
        public static bool IsUserInTheSprint(string email, int sprintId, int projectId)
        {
            var sprintClient = new SprintUserServiceClient();
            try
            {
                return sprintClient.IsUserInTheSprint(email, sprintId, projectId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }
    }
}
