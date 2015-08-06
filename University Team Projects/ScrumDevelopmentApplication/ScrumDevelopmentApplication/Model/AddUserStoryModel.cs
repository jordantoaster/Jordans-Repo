using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using ScrumDevelopmentApplication.UserStoryServiceReference;

namespace ScrumDevelopmentApplication.Model
{
    class AddUserStoryModel
    {
        /// <summary>
        /// Merges the story description strings, Filters the data into the service and adds new story to the database
        /// </summary>
        public static bool CreateNewUserStory(int sBacklogId, string storyTitle, string asAStoryDescription, string iWantStoryDescription, string becauseStoryDescription,
            int projectId)
        {
            var projectClient = new UserStoryServiceClient();

            int priority = GetPriority(projectId);
            
            try
            {
                string storyDescription = asAStoryDescription + "|" + iWantStoryDescription + "|" +
                                          becauseStoryDescription;
                return projectClient.InsertUserStory(sBacklogId, storyTitle, storyDescription, priority,
                     projectId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Im sorry, somthing went wrong on our end. Please try again later", "User Story not added");
                return false;
            }
        }

        

        /// <summary>
        /// Gets the ID of the last user story in the database
        /// </summary>
        public static int GetLastUserStoryId()
        {
            var userStory = new UserStoryServiceClient();
            try
            {
                return  userStory.GetLastUserStoryId();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Could not retrieve UserStory Id");

            }

            return 0;
        }
        /// <summary>
        /// Retrieves the priority of a user story(used for increasing the priority)
        /// </summary>
        public static int GetPriority(int projectId)
        {
            var userStory = new UserStoryServiceClient();
            try
            {
                return userStory.GetPriority(projectId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Could not retrieve Priority");
            }
            return 0;
        }
        /// <summary>
        /// Returns the list of priorities related to the project
        /// </summary>
        public static int[] GetPriorityList(int projectId)
        {
            var userStory = new UserStoryServiceClient();
            try
            {
                return userStory.GetPriorityList(projectId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Could not retrieve Priority");
            }
            return null;

        }
    }
}
