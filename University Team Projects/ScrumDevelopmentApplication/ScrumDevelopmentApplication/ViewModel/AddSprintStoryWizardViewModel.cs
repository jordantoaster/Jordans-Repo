using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class AddSprintStoryWizardViewModel : ViewModelBase
    {
        private IDialogService _dialogService;
        public AddSprintStoryWizardViewModel(IDialogService dialogService)
        {
            _dialogService = dialogService;
        }
        /// <summary>
        /// Searches for a list of user stories that can be assigned from product backlog to sprint backlog
        /// </summary>
        public void searchStories(ListView searchBox, int projectId)
        {
            var results = AddSprintStoryModel.SearchForStories(projectId);
            searchBox.Items.Clear();
            if (results.Any())
            {
                for (var i = 0; i < results.Length; i++)
                {
                    searchBox.Items.Add(new UserStoryName { Name = "UserStory." + results[i] });
                    searchBox.SelectedItems.Add(i);
                }
            }
            else
            {
                _dialogService.ShowMessageBox("No results found");
            }
        }
        /// <summary>
        /// Assigns user stories from product backlog to sprint backlog
        /// </summary>
        public void AddStories(UserStoryName selectedItem, int sprintId, Window wizard)
        {
            if (selectedItem == null)
            {
                _dialogService.ShowMessageBox("Please select a story to add", "Select a Story");
            }
            else
            {               
                int storyId = Convert.ToInt32(selectedItem.Name.Split('.')[1]);
                if (!AddSprintStoryModel.IsStoryInTheSprint(storyId, sprintId))
                {
                    if (AddSprintStoryModel.addStory(storyId, sprintId))
                    {
                        _dialogService.ShowMessageBox("User Story added to the sprint successfully", "User Story added to sprint");
                        wizard.Close();
                    }
                    else
                    {
                        _dialogService.ShowMessageBox(
                            "This User Story can not be assigned to this sprint", "User Story Invalid");
                    }
                }
                else
                {
                    _dialogService.ShowMessageBox("User Story already assigned to this sprint",
                        "User Story already added");
                }
                
            }
            
        }
        /// <summary>
        /// Enables Add button in the wizard
        /// </summary>
        public void enableAdd(bool answer, Button addButton)
        {
            if (answer)
            {
                addButton.IsEnabled = true;
            }
        }
        /// <summary>
        /// Updates stories in the listbox on sprint dashboard
        /// </summary>
        public void UpdateStories(ListBox storyListBox, int sprintId)
        {
            string[] storyList = AddSprintStoryModel.GetStoryList(sprintId);
            storyListBox.Items.Clear();
            foreach (var s in storyList)
            {
                    storyListBox.Items.Add("User Story." + s);
            }
        }
    }
}
