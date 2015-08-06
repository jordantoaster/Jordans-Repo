using System;
using System.Diagnostics;
using ScrumDevelopmentApplication.SprintServiceReference;
using ScrumDevelopmentApplication.UserStoryServiceReference;

namespace ScrumDevelopmentApplication.Model
{
    class AddSprintStoryModel
    {
        /// <summary>
        /// Calls the backend service that uses a projectId to find stories
        /// </summary>
        public static string[] SearchForStories(int projectId)
        {
            var userStoryClient = new UserStoryServiceClient();
            try
            {
                return userStoryClient.GetStoryList(projectId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return null;
        }

        /// <summary>
        /// Passing in details that will be used to assign the story to the sprint
        /// </summary>
        public static bool addStory(int storyId, int sprintId)
        {
            var sprintClient = new SprintServiceClient();
            try
            {
                return sprintClient.AddSprintStory(storyId, sprintId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }

        /// <summary>
        /// Returns an array that will contain a list of stories assigned to the sprint
        /// </summary>
        public static string[] GetStoryList(int sprintId)
        {
            var sprintClient = new SprintServiceClient();
            try
            {
                return sprintClient.GetSprintStories(sprintId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return null;
        }

        /// <summary>
        /// Uses the parameters to determine in the service if the story is assigned to a sprint
        /// </summary>
        public static bool IsStoryInTheSprint(int storyId, int sprintId)
        {
            var userClient = new UserStoryServiceClient();
            try
            {
                return userClient.IsStoryInTheSprint(storyId, sprintId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
            }
            return false;
        }
    }
}