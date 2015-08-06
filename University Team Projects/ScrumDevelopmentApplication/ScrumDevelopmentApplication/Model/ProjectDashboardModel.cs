using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using ScrumDevelopmentApplication.ProjectUserServiceReference;
using ScrumDevelopmentApplication.SprintServiceReference;

namespace ScrumDevelopmentApplication.Model
{
    class ProjectDashboardModel
    {
        /// <summary>
        /// passes in data to the isproductowner method in the backend service
        /// </summary>
        public static bool CheckIfProductOwner(string email, int projectId)
        {
            var client = new ProjectUserServiceClient();
            try
            {
                return client.IsProductOwner(email, projectId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, our system is currently down. Please try again later.", "System Down");
            }
            return false;
        }

        /// <summary>
        /// perfroms the same function as the above method, but checks for project owner
        /// </summary>
        public static bool CheckIfProjectOwner(string email, int projectId)
        {
            var client = new ProjectUserServiceClient();
            try
            {
                return client.IsProjectOwner(email, projectId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, our system is currently down. Please try again later.", "System Down");
            }
            return false;
        }

        /// <summary>
        /// perfroms the same function as the above method, but checks for scrum master
        /// </summary>
        public static bool CheckIfScrumMaster(string email, int projectId)
        {
            var client = new ProjectUserServiceClient();
            try
            {
                return client.IsScrumMaster(email, projectId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, our system is currently down. Please try again later.", "System Down");
            }
            return false;
        }

        /// <summary>
        /// perfroms the same function as the above method, but checks for developer
        /// </summary>
        public static bool CheckIfDeveloper(string email, int projectId)
        {
            var client = new ProjectUserServiceClient();
            try
            {
                return client.IsDeveloper(email, projectId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, our system is currently down. Please try again later.", "System Down");
            }
            return false;
        }

        /// <summary>
        /// Gets from the service the team associated with a project
        /// </summary>
        public static string[] GetProjectTeamList(int projectId)
        {
            var client = new ProjectUserServiceClient();
            try
            {
                return client.GetProjectTeamList(projectId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, our system is currently down. Please try again later.", "System Down");
            }
            return null;
        
        }

        /// <summary>
        /// Gets the sprint from the service
        /// </summary>
        public static string[] GetSprintList(int projectId)
        {
            var client = new SprintServiceClient();
            try
            {
                return client.GetSprintList(projectId);
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
