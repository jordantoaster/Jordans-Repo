using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Xml.Linq;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.ViewModel;
using ScrumDevelopmentApplication.Helpers;

namespace ScrumDevelopmentApplication.View
{
    /// <summary>
    /// Interaction logic for ProjectDashboard.xaml
    /// </summary>
    public partial class ProjectDashboard : Page
    {
        int projectId;
        ProjectDashboardViewModel dashboard;
        public ProjectDashboard(string parameter)
        {
            projectId = Convert.ToInt32(parameter);

            InitializeComponent();

            dashboard = new ProjectDashboardViewModel(new DialogService());
            dashboard.PopulateProjects(TabControl);
            dashboard.PopulateTeamMembers(TeamListBox, projectId);
            dashboard.DisableButtons(AddTeamMemberButton, AddSprint, projectId);
            dashboard.PopulateSprints(SprintsListBox, projectId);
        }

        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.LoginPage, this, sParam: null);
        }
        private void AddTeamMember_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToWindowWithListBox(Windows.AddTeamMemberWizard, ""+projectId, TeamListBox, AddSprint);
        }

        private void ViewProductBacklogButton_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.ProductBacklogPage, this, ""+projectId);
        }

        private void Home_OnClick(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.UserDashboard, this, sParam: "");
        }

        private void SprintDashboarButton_OnClick(object sender, RoutedEventArgs e)
        {
            dashboard.GoToSprintDashboard(SprintsListBox, projectId, this);
        }

        private void AddSprint_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToWindowWithListBox(Windows.NewSprintWizard, "" + projectId, SprintsListBox);
        }

        private void tabItem1_Clicked(object sender, RoutedEventArgs e)
        {
            var index = TabControl.SelectedItem.ToString().IndexOf('.');
            var projectId = TabControl.SelectedItem.ToString().Substring(0, index);
            ApplicationController.GetInstance().GoToPage(ApplicationPage.ProjectDashboard, this, projectId);
        }

        private void SaveProject_Click(object sender, RoutedEventArgs e)
        {
            dashboard.SaveProject(TeamListBox, SprintsListBox);
        }

        private void OpenSavedProject_Click(object sender, RoutedEventArgs e)
        {
            dashboard.OpenProject(TeamListBox, SprintsListBox);
        }

        private void Sprints_OnMouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            dashboard.GoToSprintDashboard(SprintsListBox, projectId, this);
        }
    }
}

