using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using ScrumDevelopmentApplication.AcceptanceTestServiceReference;
using ScrumDevelopmentApplication.UserStoryServiceReference;
using ScrumDevelopmentApplication.View.Wizards;

namespace ScrumDevelopmentApplication.Model
{
    class UserStory
    {
        /// <summary>
        /// Retrieves the user story details from the database
        /// </summary>
        public static string[] GetUserStoryDetails(int userStoryId)
        {
            var userStoryClient = new UserStoryServiceClient();

            try
            {
                return userStoryClient.GetUserStory(userStoryId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, something went wrong on our end, please try again later", "System error");
            }
            return null;
        }

        /// <summary>
        /// Updates the user story details in the database using the recieved details
        /// </summary>
        public static bool UpdateUserStoryDetails(int userStoryId, string title, string description, int storyPoints, int priority, int projectId)
        {
            var userStoryClient = new UserStoryServiceClient();
            int length = GetPriorityLength(projectId);

            if (priority > length || priority <= 0)
            {
                return false;
            }

            try
            {
                return userStoryClient.UpdateUserStory(userStoryId, title, description, storyPoints, priority);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, something went wrong on our end, please try again later", "System error");
            }
            return false;
        }
        /// <summary>
        /// Updates the information about second user story if there is priority being changed between two stories
        /// </summary>
        public static bool UpdateSecondStory(int userStoryId, string description, int storyPoints, int priority, int projectId)
        {
            var userStoryClient = new UserStoryServiceClient();

            int newPriority = GetPriority(userStoryId);
            int newUserStoryId = GetUserStoryId(priority, projectId);
            int newStoryPoints = GetStoryPoints(newUserStoryId);
 
            string newDescription = GetDescription(newUserStoryId);
            int length = GetPriorityLength(projectId);

            if (priority > length || priority <= 0)
            {
                return false;
            }

            try
            {
                return userStoryClient.UpdateUserStory(newUserStoryId, "User Story", newDescription, newStoryPoints, newPriority);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, something went wrong on our end, please try again later", "System error");
            }
            return false;
        }
        /// <summary>
        /// Swap method to decrease the priorities after user story is deleted
        /// </summary>
        public static bool UpdatePriority(int oldpriority, int newpriority, int projectId)
        {
            var userStory = new UserStoryServiceClient();
            try
            {
                return userStory.InsertPriority(oldpriority, newpriority, projectId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, something went wrong on our end, please try again later", "System error");
            }
            return false;
        }
        /// <summary>
        /// Retreives the list of stories as a string array
        /// </summary>
        public static string[] GetStoryList(int projectId)
        {
            var userStoryClient = new UserStoryServiceClient();

            try
            {
                return userStoryClient.GetStoryList(projectId);
            }
            catch (Exception e)
            {
                MessageBox.Show("Im sorry, something went wrong on our end, please try again later", "System error");
            }
            return null;
        }

        /// <summary>
        /// Deletes a story from the database, specefied by ID
        /// </summary>
        public static void DeleteStory(int id)
        {
            var userStoryClient = new UserStoryServiceClient();

            try
            {
                userStoryClient.DeleteUserStory(id);
            }
            catch (Exception e)
            {
                MessageBox.Show("Im sorry, something went wrong on our end, please try again later", "System error");
            }
        }
        /// <summary>
        /// Returns the priority of a user story that is deleted
        /// </summary>
        public static int GetDeletedPriority(int storyId)
        {
            var userStoryClient = new UserStoryServiceClient();

            try
            {
                return userStoryClient.GetPriorityUpdate(storyId);
            }
            catch (Exception e)
            {
                MessageBox.Show("Im sorry, something went wrong on our end, please try again later", "System error");
            }
            return 0;
        }

        /// <summary>
        /// Returns the priority of a user story based on its unique Id
        /// </summary>
        public static int GetPriority(int userStoryId)
        {
            var userStory = new UserStoryServiceClient();
            try
            {
                return userStory.GetPriorityUpdate(userStoryId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Could not retrieve Priority");
            }
            return 0;
        }
        /// <summary>
        /// Returns the length of the list of user stories with assigned priority
        /// </summary>
        public static int GetPriorityLength(int projectId)
        {
            var userStory = new UserStoryServiceClient();
            try
            {
                return userStory.GetPriorityLength(projectId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Could not retrieve Priority");
            }
            return 0;
        }
        /// <summary>
        /// Returns the Id of a user story, based on its projectID and priority
        /// </summary>
        public static int GetUserStoryId(int priority, int projectId)
        {
            var userStory = new UserStoryServiceClient();
            try
            {
                return userStory.GetUserStoryId(priority, projectId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Could not retrieve Priority");
            }
            return 0;
        }
        /// <summary>
        /// Returns story points of the user story based on its unique Id
        /// </summary>
        public static int GetStoryPoints(int userStoryId)
        {
            var userStory = new UserStoryServiceClient();
            try
            {
                return userStory.GetStoryPoints(userStoryId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Could not retrieve Priority");
            }
            return 0;
        }
        /// <summary>
        /// Returns description of the user story based on its unique Id
        /// </summary>
        public static string GetDescription(int userStoryId)
        {
            var userStory = new UserStoryServiceClient();
            try
            {
                return userStory.GetDescription(userStoryId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Could not retrieve Priority");
            }
            return "";
        }

       
    }


}
