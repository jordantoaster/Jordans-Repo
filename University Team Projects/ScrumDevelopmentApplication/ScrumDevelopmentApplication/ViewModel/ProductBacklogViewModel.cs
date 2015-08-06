using System.ServiceModel.Channels;
using System.Windows;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using ScrumDevelopmentApplication.ProjectUserServiceReference;
using User = ScrumDevelopmentApplication.Model.User;
using UserStory = ScrumDevelopmentApplication.Model.UserStory;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class ProductBacklogViewModel
    {
        private IDialogService dialogService;
        private int priorityDeleted;

        public ProductBacklogViewModel(IDialogService dialogService)
        {
            this.dialogService = dialogService;
        }

        /// <summary>
        /// Fills a list box in the view with stories taken from the database and runs the 'ReorderListBox' method.
        /// </summary>
        public void PopulateStories(ListBox storyListBox, int projectId)
        {
            
            var storyList = UserStory.GetStoryList(projectId);
            storyListBox.Items.Clear();
            foreach (var s in storyList)
            {
                var thisStory = ("User Story." + s);
                    storyListBox.Items.Add(thisStory);
                    ReorderListBox(storyListBox);
            }
        }

        /// <summary>
        /// Reorders the items within the user story list based upon each items priority value.
        /// </summary>
        public void ReorderListBox(ListBox StoryListBox)
        {
            var listLength = StoryListBox.Items.Count;
            var lastItem = listLength - 1;
            StoryListBox.SelectedItem = StoryListBox.Items[lastItem];
            var lastStoryId = Convert.ToInt32(StoryListBox.SelectedItem.ToString().Split('.')[1]);
            var lastPriority = UserStory.GetPriority(lastStoryId);
            var lastItemObject = StoryListBox.SelectedItem;

            if (StoryListBox.Items.Count >= 2)
            {
                for (var i = listLength - 1; i > 0; i--)
                {
                    StoryListBox.SelectedItem = StoryListBox.Items[i-1];
                    var secondStoryId = Convert.ToInt32(StoryListBox.SelectedItem.ToString().Split('.')[1]);
                    var secondPriority = UserStory.GetPriority(secondStoryId);

                    if (lastPriority < secondPriority)
                    {
                        StoryListBox.Items.RemoveAt(i);
                        StoryListBox.Items.Insert(i -1, lastItemObject);
                    }
                }
            }
        }

        /// <summary>
        /// Using the specefied ID the user story model is polled to processing the information
        /// </summary>
        public void DeleteStory(int id)
        {
            try
            {
                UserStory.DeleteStory(id);
                dialogService.ShowMessageBox("User story deleted");
            }
            catch (Exception e)
            {
                dialogService.ShowMessageBox(e.ToString());
            }
        }
        /// <summary>
        /// Retrieves the priority of the user story that was deleted
        /// </summary>
        public void GetDeletedPriority(int storyId, int projectId)
        {
           priorityDeleted = UserStory.GetDeletedPriority(storyId);
        }
        /// <summary>
        /// Updates the priorities of user stories after one of the stories was deleted
        /// </summary>
        public void UpdatePriorities(int projectId)
        {
            int[] priorityList = AddUserStoryModel.GetPriorityList(projectId);
            Array.Sort(priorityList);

            for (int i = 0; i < priorityList.Length; i++)
            {
                if (priorityDeleted <= priorityList[i])
                {
                    if (UserStory.UpdatePriority(priorityList[i], priorityList[i] - 1, projectId))
                    {
                        
                    }
                }
            }
        }

        /// <summary>
        /// Works out the priority for a specific user story, and decreases it by 1 when the decrease button is pressed.
        /// </summary>
        public void DecreasePriority(int projectId, int storyId)
        {
            var priorityLength = UserStory.GetPriorityLength(projectId);
            var description = UserStory.GetDescription(storyId);
            var storyPoints = UserStory.GetStoryPoints(storyId);
            var priority = UserStory.GetPriority(storyId);
            var updatedPriority = priority + 1;
            var updatedPriority2 = priority + 1;
            if (priority < priorityLength)
            {
                var model = new EditUserStoryViewModel(new DialogService(), storyId, true, projectId);
                UserStory.UpdateSecondStory(storyId, description, storyPoints, updatedPriority, projectId);
                UserStory.UpdateUserStoryDetails(storyId, "UserStory", description, storyPoints, updatedPriority2,
                    projectId);
            }
         }

        /// <summary>
        /// Works out the priority for a specific user story, and increases it by 1 when the increase button is pressed.
        /// </summary>
        public void IncreasePriority(int projectId, int storyId)
        {
            var priorityLength = UserStory.GetPriorityLength(projectId);
            var description = UserStory.GetDescription(storyId);
            var storyPoints = UserStory.GetStoryPoints(storyId);
            var priority = UserStory.GetPriority(storyId);
            var updatedPriority = priority - 1;
            var updatedPriority2 = priority - 1;

            var model = new EditUserStoryViewModel(new DialogService(), storyId, true, projectId);
            UserStory.UpdateSecondStory(storyId, description, storyPoints, updatedPriority, projectId);
            UserStory.UpdateUserStoryDetails(storyId, "UserStory", description, storyPoints, updatedPriority2,
                projectId);
        }
        
        /// <summary>
        /// Enables or disables UserStory buttons based on the users role.
        /// </summary>
        public void UserStoryAbility(Button addUserStoryButton, Button deleteUserStoryButton, Button editUserStoryButton,
            Button addAcceptanceTest, Button moveStoryUp, Button moveStoryDown, int projectId)
        {
            var client = new ProjectUserServiceClient();
            if (!client.IsProductOwner(User.Email, projectId))
            {
                addUserStoryButton.IsEnabled = false;
                deleteUserStoryButton.IsEnabled = false;
                addAcceptanceTest.IsEnabled = false;
                moveStoryUp.IsEnabled = false;
                moveStoryDown.IsEnabled = false;
            }
        }

        public void PopulateTests(ListBox acceptanceListBox, int storyId)
        {
            string[] testList = AcceptanceTestModel.GetTestList(storyId);
            acceptanceListBox.Items.Clear();
            foreach (var s in testList)
            {
                acceptanceListBox.Items.Add(s);
            }
        }
    }
}