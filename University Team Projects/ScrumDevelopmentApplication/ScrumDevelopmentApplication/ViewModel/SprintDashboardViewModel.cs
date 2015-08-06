using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class SprintDashboardViewModel
    {

        private IDialogService dialogService;

        public SprintDashboardViewModel(IDialogService dialogService)
        {
            this.dialogService = dialogService;
        }

        /// <summary>
        /// Determines if the user has the correct requirements to use the buotton on the view
        /// </summary>
        public void DisableButtons(Button addSprintMemberButton, Button addSprintStoryButton, string sprintId)
        {

            if (!SprintDashboardModel.CheckIfScrumMaster(User.Email, sprintId))
            {
                addSprintMemberButton.IsEnabled = false;
            }
            if (!SprintDashboardModel.CheckIfScrumMaster(User.Email, sprintId))
            {
                addSprintStoryButton.IsEnabled = false;
            }
                
        }

         public void PopulateStories(ListBox storyListBox, int sprintId)
        {
            string[] storyList = AddSprintStoryModel.GetStoryList(sprintId);
            foreach (var s in storyList)
            {
                if (!storyListBox.Items.Contains(s))
                    storyListBox.Items.Add("User Story." + s);
            }
        }

         /// <summary>
        /// Fills a list box on the view from the project user table
        /// </summary>
        public void PopulateTeamMembers(ListBox teamListBox, string sprintId)
        {
            var list = SprintDashboardModel.GetSprintTeamList(sprintId);

            if(list.Any())
            { 
            foreach (var p in list)
            {
                if (SprintDashboardModel.CheckIfProductOwner(p, sprintId) &&
                    !teamListBox.Items.Contains(p + " (Product Owner)"))
                {
                    teamListBox.Items.Add(p + " (Product Owner)");
                }
                if (SprintDashboardModel.CheckIfScrumMaster(p, sprintId) &&
                    !teamListBox.Items.Contains(p + " (Scrum Master)"))
                {
                    teamListBox.Items.Add(p + " (Scrum Master)");
                }
                if (SprintDashboardModel.CheckIfDeveloper(p, sprintId) &&
                    !teamListBox.Items.Contains(p + " (Developer)"))
                {
                    teamListBox.Items.Add(p + " (Developer)");
                }
            }
            }
        }

        public void PopulateSprints(ListBox tabControl, int projectId)
        {
            string[] sprintList = SprintDashboardModel.GetSprintList(projectId);

            if (sprintList != null)
            {
                foreach (var p in sprintList)
                {
                    if (!tabControl.Items.Contains(p))
                        tabControl.Items.Add(p);
                }
            }
        }
    }
}