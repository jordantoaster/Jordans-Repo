using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using ScrumDevelopmentApplication.SprintServiceReference;
using ScrumDevelopmentApplication.SprintUserServiceReference;
using ScrumDevelopmentApplication.TaskServiceReference;

namespace ScrumDevelopmentApplication.Model
{
    class TaskModel
    {
        /// <summary>
        /// Refers a user details to the service to assign task ownership
        /// </summary>
        public static void AssignOwnership(int id, String email)
        {
            var client = new TaskServiceClient();
            try
            {
                client.AssignTask(id, email);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry our system is down. Please try again later", "System Down");
            }
        }

        /// <summary>
        /// gets an array of sprint users from the service
        /// </summary>
        public static string[] GetSprintUsers(int sprintId)
        {
            var client = new SprintUserServiceClient();
            try
            {
                return client.GetProjectTeamList("" + sprintId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return new string[]{};
        }

        /// <summary>
        /// using the id, it is passed to the service for deletion
        /// </summary>
        public static void DeleteTask(int taskId)
        {
            var client = new TaskServiceClient();
            try
            {
                client.DeleteTask(taskId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
        }

        /// <summary>
        /// Used to pass all the task data into the backend for processing
        /// </summary>
        public static bool SubmitTest(string taskNameBox, string descriptionBox, bool? blocked, string reason, int hours, int userStoryId)
        {
            var client = new TaskServiceClient();
            try
            {
                return client.InsertTask(taskNameBox, descriptionBox, blocked, reason, hours, userStoryId); ;
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }

        /// <summary>
        /// Passing modified task data to the service for saving
        /// </summary>
        public static bool SaveChanges(int taskId, string name, string description, bool? isChecked, string reason, int hours)
        {
            var client = new TaskServiceClient();
            try
            {
                return client.EditTask(taskId, name, description, hours, isChecked, reason);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }

        /// <summary>
        /// grabs data from the service which is used to populate text boxes
        /// </summary>
        public static void FillEditDetails(int taskId, TextBox taskNameBox, TextBox descriptionBox, CheckBox blockedCheckBox, TextBox reasonBox, TextBox hoursBox)
        {
            var client = new TaskServiceClient();
            try
            {
                taskNameBox.Text = client.GetName(taskId);
                descriptionBox.Text = client.GetDescription(taskId);
                blockedCheckBox.IsChecked = client.GetBlocked(taskId);
                reasonBox.Text = blockedCheckBox.IsChecked == true ? client.GetReason(taskId) : "";
                hoursBox.Text = client.GetHours(taskId).ToString();
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
        }
    }
}
