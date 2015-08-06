using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using ScrumDevelopmentApplication.Helpers;
using System.Windows.Media;
using ScrumDevelopmentApplication.Model;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class AddUserStoryViewModel : ViewModelBase
    {
        private IDialogService _dialogService;
        private ListBox storyListBox;
        public AddUserStoryViewModel(IDialogService dialogService, ListBox storyListBox)
        {
            _dialogService = dialogService;
            this.storyListBox = storyListBox;
        }

        /// <summary>
        /// Checks if the user story text boxes are populated
        /// </summary>
        public bool IsEmptyFields(TextBox asADescription, TextBox iWantDescription, TextBox becauseDescription)
        {
            asADescription.BorderBrush = asADescription.Text != "" ? Brushes.DodgerBlue : Brushes.Red;
            iWantDescription.BorderBrush = iWantDescription.Text != "" ? Brushes.DodgerBlue : Brushes.Red;
            becauseDescription.BorderBrush = becauseDescription.Text != "" ? Brushes.DodgerBlue : Brushes.Red;

            if (asADescription.Text == "" || iWantDescription.Text == "" || becauseDescription.Text == "")
            {
                _dialogService.ShowMessageBox("Please complete all fields", "Empty Fields");
                return true;
            }
            return false;
        }

        /// <summary>
        /// Using the parameters this method performs the logic to determine if the story is valid
        /// </summary>
        public void CheckIfValidStory(int sbacklogid, TextBox asADescription, TextBox iWantDescription, TextBox becauseDescription, int projectId, Window wizard)
        {
            bool emptyFields = false;
            emptyFields = IsEmptyFields(asADescription, iWantDescription, becauseDescription);

            if (!emptyFields)
            {
                if (AddUserStoryModel.CreateNewUserStory(sbacklogid, "User Story", asADescription.Text,
                    iWantDescription.Text, becauseDescription.Text,
                    projectId))
                {
                    var backlogModel = new ProductBacklogViewModel(_dialogService);
                    //backlogModel.PopulateStories(storyListBox, projectId);
                    _dialogService.ShowMessageBox("User Story Created");
                    wizard.Close();
                }
                else
                {
                    _dialogService.ShowMessageBox("User Story not Created");
                }
            }
        }

        /// <summary>
        /// updates the list box based on an id
        /// </summary>
        public void updateStories(ListBox StoryListBox, int projectId)
        {
            var storyList = UserStory.GetStoryList(projectId);
            StoryListBox.Items.Clear();
            foreach (var s in storyList)
            {
                var thisStory = ("User Story." + s);
                if (!StoryListBox.Items.Contains(s))
                {
                    StoryListBox.Items.Add(thisStory);
                    ReorderListBox(StoryListBox);
                }
            }
        }


        /// <summary>
        /// Used to re order a list box based on the user input
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
                    StoryListBox.SelectedItem = StoryListBox.Items[i - 1];
                    var secondStoryId = Convert.ToInt32(StoryListBox.SelectedItem.ToString().Split('.')[1]);
                    var secondPriority = UserStory.GetPriority(secondStoryId);

                    if (lastPriority < secondPriority)
                    {
                        StoryListBox.Items.RemoveAt(i);
                        StoryListBox.Items.Insert(i - 1, lastItemObject);
                    }
                }
            }
        }
    }
}



