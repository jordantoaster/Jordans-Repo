using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Navigation;
using System.Windows.Shapes;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.ViewModel;
using ScrumDevelopmentApplication.Helpers;

namespace ScrumDevelopmentApplication.View
{
    /// <summary>
    /// Interaction logic for SprintDashboard.xaml
    /// </summary>
    public partial class SprintDashboard : Page
    {

        string sprintId;
        int projectId;
        SprintDashboardViewModel dashboard;
        public SprintDashboard(string id, int projectID)
        {
            sprintId = id;
            int sid = Convert.ToInt32(sprintId);
            projectId = projectID;
            InitializeComponent();
            InitializeComponent();
            dashboard = new SprintDashboardViewModel(new DialogService());
            dashboard.PopulateSprints(TabControl, projectId);
            dashboard.DisableButtons(AddSprintTeamMemberButton, AddSprintStoryButton, sprintId);
            dashboard.PopulateTeamMembers(TeamListBox, sprintId);
            dashboard.PopulateStories(StoryListBox, sid);
        }

        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.LoginPage, this, sParam: null);
        }
        private void AddTeamMember_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToWindowWithListBox(Windows.AddSprintMemberWizard, "" + sprintId, TeamListBox,null, "" + projectId);
        }
        private void AddSprintStory_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToWindowWithListBox(Windows.AddSprintStoryWizard, "" + sprintId, StoryListBox, null, "" + projectId);
        }

        private void ViewStory_Click(object sender, RoutedEventArgs e)
        {
            if (StoryListBox.SelectedItem == null)
            {
                MessageBox.Show("Select a user story", "No user story selected");
            }
            else
            {
                int index = StoryListBox.SelectedItem.ToString().IndexOf('.');
                int length = (StoryListBox.SelectedItem.ToString().Length)-1;
                var storyId = Convert.ToInt32(StoryListBox.SelectedItem.ToString().Split('.')[1]);
                ApplicationController.GetInstance().GoToPage(ApplicationPage.SprintStory, this, "" + sprintId, projectId, null, storyId);
            }
            
        }
        private void Back_OnClick(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.ProjectDashboard, this, "" + projectId);
        }
        private void Home_OnClick(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.UserDashboard, this, sParam: "");
        }

        private void tabItem1_Clicked(object sender, RoutedEventArgs e)
        {
            var index = TabControl.SelectedItem.ToString().IndexOf('.');
            var sprintId = TabControl.SelectedItem.ToString().Substring(0, index);
            ApplicationController.GetInstance().GoToPage(ApplicationPage.SprintDashboard, this, sprintId, projectId);
        }

        private void Stories_OnMouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            if (StoryListBox.SelectedItem == null)
            {
                MessageBox.Show("Select a user story", "No user story selected");
            }
            else
            {
                int index = StoryListBox.SelectedItem.ToString().IndexOf('.');
                int length = (StoryListBox.SelectedItem.ToString().Length) - 1;
                var storyId = Convert.ToInt32(StoryListBox.SelectedItem.ToString().Split('.')[1]);
                ApplicationController.GetInstance().GoToPage(ApplicationPage.SprintStory, this, "" + sprintId, projectId, null, storyId);
            }
        }
    }
}
