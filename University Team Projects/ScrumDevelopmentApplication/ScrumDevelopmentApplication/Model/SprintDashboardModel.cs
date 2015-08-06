using ScrumDevelopmentApplication.SprintServiceReference;
using ScrumDevelopmentApplication.SprintUserServiceReference;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace ScrumDevelopmentApplication.Model
{
    public class SprintDashboardModel
    {
        public SprintDashboardModel() { }


        /// <summary>
        /// Refers to the backend service to get a list of sprint team members
        /// </summary>
        public static string[] GetSprintTeamList(string sprintId)
        {
            var client = new SprintUserServiceClient();
            try
            {
                return client.GetProjectTeamList(sprintId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, our system is currently down. Please try again later.", "System Down");
            }
            return null;
        }

        /// <summary>
        /// The next set of methods are used to determine a users role in the sprint
        /// </summary>
        public static bool CheckIfProductOwner(string p, string sprintId)
        {
            var client = new SprintUserServiceClient();
            try
            {
                return client.IsProductOwner(p, sprintId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, our system is currently down. Please try again later.", "System Down");
            }
            return false;
        }

        public static bool CheckIfScrumMaster(string p, string sprintId)
        {
            var client = new SprintUserServiceClient();
            try
            {
                return client.IsScrumMaster(p, sprintId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, our system is currently down. Please try again later.", "System Down");
            }
            return false;
        }

        public static bool CheckIfDeveloper(string p, string sprintId)
        {
            var client = new SprintUserServiceClient();
            try
            {
                return client.IsDeveloper(p, sprintId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, our system is currently down. Please try again later.", "System Down");
            }
            return false;
        }

        /// <summary>
        /// Gets an array of sprints from the service
        /// </summary>
        public static string[] GetSprintList(int projectId)
        {
            var client = new SprintServiceClient();
            try
            {
                return client.GetUserSprints(User.Email);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, our system is currently down. Please try again later.", "System Down");
            }
            return null;

        } 
    }
}
