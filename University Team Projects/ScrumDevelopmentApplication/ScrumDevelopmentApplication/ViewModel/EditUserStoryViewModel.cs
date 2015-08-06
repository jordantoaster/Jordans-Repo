using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.ProjectUserServiceReference;
using ScrumDevelopmentApplication.View.Wizards;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class EditUserStoryViewModel : ViewModelBase
    {
        private IDialogService dialogService;
        private int projectId;

        public EditUserStoryViewModel(IDialogService dialogService, int userStoryId, bool opened, int projectId, string productBacklog = null, ListBox listBox = null)
        {
            this.dialogService = dialogService;
            this.projectId = projectId;
            if (!opened)
            {
                var wizard = new EditUserStoryWizard(userStoryId, projectId, listBox);
                ApplicationController.GetInstance().GoToWindowWithListBox(Windows.EditUserStoryWizard, ""+userStoryId, listBox, null, ""+projectId);
            }
        }


        /// <summary>
        /// based on an id the listbox is populated
        /// </summary>
        public void PopulateStories(int userStoryId, EditUserStoryWizard wizard)
        {

            if (PopulateUserStoryFields(userStoryId, wizard))
            {
                Debug.WriteLine("Populating UserStory Field has worked!");
            }
            else
            {
                dialogService.ShowMessageBox("Im sorry, we were unable to prepopulate your story details");
            }
        }



        /// <summary>
        /// Updates the details of the user story 
        /// </summary>
        public void executeEditDetails(int userStoryId, EditUserStoryWizard wizard)
        {
            string storyDescription = wizard.AsADescriptionBox.Text + "|" + wizard.IWantDescriptionBox.Text + "|" +
                                         wizard.BecauseDescriptionBox.Text;

            string description = storyDescription;
            int storyPoints = Convert.ToInt32(wizard.ComboBox.Text);           
            bool emptyFields = false;
            bool priorityValid = false;
            emptyFields = IsEmptyFields(wizard.AsADescriptionBox, wizard.IWantDescriptionBox, wizard.BecauseDescriptionBox, wizard.PriorityBox);           
            priorityValid = IsPriorityInValid(wizard.PriorityBox);

            if (!emptyFields && !priorityValid)
            {
                int priority = Convert.ToInt32(wizard.PriorityBox.Text);
                if (UserStory.UpdateUserStoryDetails(userStoryId, "UserStory", description, storyPoints, priority, projectId))
                {
                    wizard.Close();
                }
                else
                {
                    dialogService.ShowMessageBox("Update failed, please try again or come back later", "Update failed");
                }
            }         
        }


        /// <summary>
        /// Updates the details of the second user story if priority is being swapped
        /// </summary>
        public bool UpdateDetails(int userStoryId, EditUserStoryWizard wizard)
        {
            string storyDescription = wizard.AsADescriptionBox.Text + "|" + wizard.IWantDescriptionBox.Text + "|" +
                                         wizard.BecauseDescriptionBox.Text;
        
            string description = storyDescription;
            int storyPoints = Convert.ToInt32(wizard.ComboBox.Text);
            bool priorityValid = false;
            bool emptyFields = false;
            priorityValid = IsPriorityInValid(wizard.PriorityBox);
            emptyFields = IsEmptyFields(wizard.AsADescriptionBox, wizard.IWantDescriptionBox,
                wizard.BecauseDescriptionBox, wizard.PriorityBox);

            if (!emptyFields && !priorityValid)
            {
                try
                {
                    int priority = Convert.ToInt32(wizard.PriorityBox.Text);
                    if (UserStory.UpdateSecondStory(userStoryId, description, storyPoints, priority, projectId))
                    {
                        dialogService.ShowMessageBox("User story updated successfully", "Success");
                        return true;
                    }
                    else
                    {
                        dialogService.ShowMessageBox("Priority out of range", "Update failed");
                        return false;
                    }
                }
                catch (Exception)
                {
                    dialogService.ShowMessageBox("Priority out of range", "Update failed");
                    return false;
                }                
            }
            return false;
        }
        /// <summary>
        /// Ensures a valid role is entered
        /// </summary>
        public void checkRole(int projectId, ComboBox comboBox, TextBox priorityBox, TextBox
            AsADescriptionBox, TextBox IWantDescriptionBox, TextBox BecauseDescriptionBox, Button submitButton)
        {
            comboBox.IsEnabled = false;
            priorityBox.IsEnabled = false;
            AsADescriptionBox.IsEnabled = false;
            IWantDescriptionBox.IsEnabled = false;
            BecauseDescriptionBox.IsEnabled = false;
            submitButton.IsEnabled = false;

            if (ProjectDashboardModel.CheckIfScrumMaster(User.Email, projectId))
            {
                comboBox.IsEnabled = true;
                submitButton.IsEnabled = true;
            }
            if (ProjectDashboardModel.CheckIfProductOwner(User.Email, projectId))
            {
                priorityBox.IsEnabled = true;
                AsADescriptionBox.IsEnabled = true;
                IWantDescriptionBox.IsEnabled = true;
                BecauseDescriptionBox.IsEnabled = true;
                submitButton.IsEnabled = true;
            }
        }

        /// <summary>
        /// Checks if text box feilds are empty
        /// </summary>
        public bool IsEmptyFields(TextBox asADescription, TextBox iWantDescription, TextBox becauseDescription, TextBox priorityBox)
        {

            asADescription.BorderBrush = asADescription.Text != "" ? Brushes.DodgerBlue : Brushes.Red;
            iWantDescription.BorderBrush = iWantDescription.Text != "" ? Brushes.DodgerBlue : Brushes.Red;
            becauseDescription.BorderBrush = becauseDescription.Text != "" ? Brushes.DodgerBlue : Brushes.Red;
            priorityBox.BorderBrush = priorityBox.Text != "" ? Brushes.DodgerBlue : Brushes.Red;
            

            if (asADescription.Text == "" || iWantDescription.Text == "" || becauseDescription.Text == "" || priorityBox.Text == "")
            {
                dialogService.ShowMessageBox("Please complete all fields", "Empty Fields");
                return true;
            }
            return false;
        }
        /// <summary>
        /// Checks if there are no empty spaces in the priority that is being submitted
        /// </summary>
        public bool IsPriorityInValid(TextBox priorityBox)
        {
            if (priorityBox.Text.Contains(" "))
            {
                dialogService.ShowMessageBox("Priority Invalid", "Invalid Priority");
                return true;
            }
            return false;
        }
        /// <summary>
        /// Updates the storylist box
        /// </summary>
        public void UpdateStories(ListBox storyListBox, int i)
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
        /// Reorders the listbox based on parameters
        /// </summary>
        public void ReorderListBox(ListBox storyListBox)
        {
            var listLength = storyListBox.Items.Count;
            var lastItem = listLength - 1;
            storyListBox.SelectedItem = storyListBox.Items[lastItem];
            var lastStoryId = Convert.ToInt32(storyListBox.SelectedItem.ToString().Split('.')[1]);
            var lastPriority = UserStory.GetPriority(lastStoryId);
            var lastItemObject = storyListBox.SelectedItem;

            if (storyListBox.Items.Count >= 2)
            {
                for (var i = listLength - 1; i > 0; i--)
                {
                    storyListBox.SelectedItem = storyListBox.Items[i - 1];
                    var secondStoryId = Convert.ToInt32(storyListBox.SelectedItem.ToString().Split('.')[1]);
                    var secondPriority = UserStory.GetPriority(secondStoryId);

                    if (lastPriority < secondPriority)
                    {
                        storyListBox.Items.RemoveAt(i);
                        storyListBox.Items.Insert(i - 1, lastItemObject);
                    }
                }
            }
        }

        public bool PopulateUserStoryFields(int userStoryId, EditUserStoryWizard wizard)
        {
            var storyDetails = UserStory.GetUserStoryDetails(userStoryId);
            if (storyDetails != null)
            {
                string asAText = getStringFromUserStoryDescription(storyDetails, 0);
                string iWantText = getStringFromUserStoryDescription(storyDetails, 1);
                string becauseText = getStringFromUserStoryDescription(storyDetails, 2);

                wizard.AsADescriptionBox.Text = asAText;
                wizard.IWantDescriptionBox.Text = iWantText;
                wizard.BecauseDescriptionBox.Text = becauseText;
                wizard.ComboBox.SelectedValue = storyDetails[2];
                wizard.PriorityBox.Text = storyDetails[3];
                return true;
            }
            return false;
        }


        private string getStringFromUserStoryDescription(string[] storyDetails, int descriptionIwant)
        {

            const char delimit = '|';
            string[] description = storyDetails[1].Split(delimit);

            if (descriptionIwant == 0)
                return description[0];
            if (descriptionIwant == 1)
                return description[1];
            if (descriptionIwant == 2)
                return description[2];

            return "Error retreiving description";
        }
    }
}