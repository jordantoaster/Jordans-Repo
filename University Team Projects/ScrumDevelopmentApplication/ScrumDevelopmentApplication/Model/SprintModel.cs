using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.ProjectServiceReference;
using ScrumDevelopmentApplication.SprintServiceReference;
using ScrumDevelopmentApplication.TaskServiceReference;

namespace ScrumDevelopmentApplication.Model
{
    class SprintModel
    {
        /// <summary>
        /// Retrieves the start date of a particular project from the database
        /// </summary>
        public static string GetProjectStartDate(int projectId)
        {
            var client = new ProjectServiceClient();
            try
            {
                return client.GetProjectStartDate(projectId);
            }
            catch (Exception e)
            {
                MessageBox.Show("Im sorry, our service is down. Please try again later", "System Down");
            }
            return "";
        }

        /// <summary>
        /// Passes the data required to add a sprint to the database
        /// </summary>
        public static bool AddSprint(int projectId, string name, string startDate, string endDate, string email)
        {
            var client = new SprintServiceClient();
            try
            {
                return client.AddSprint(name, startDate, endDate, projectId, email);
            }
            catch (Exception e)
            {
                MessageBox.Show("Im sorry, our service is down. Please try again later", "System Down");
            }
            return false;
        }

        public static bool CheckIfTaskOwner(string email, int taskId)
        {
            var client = new TaskServiceClient();
            try
            {
                string user = client.GetOwner(taskId);
                if (User.Email == user)
                {
                    return true;
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, our system is currently down. Please try again later.", "System Down");
            }
            return false;
        }

        public static void ShowTasks(int userStoryId, ListBox taskListBox)
        {
            var client = new TaskServiceClient();
            var tasks = client.GetTaskList(userStoryId);
            taskListBox.Items.Clear();
            foreach (var task in tasks)
            {
                int taskId = Convert.ToInt32(task.Split('.')[0]);
                if(client.GetOwner(taskId)==null)
                taskListBox.Items.Add(task);
                else taskListBox.Items.Add(task+" ("+client.GetOwner(taskId)+")");
            }
        }
    }
}
