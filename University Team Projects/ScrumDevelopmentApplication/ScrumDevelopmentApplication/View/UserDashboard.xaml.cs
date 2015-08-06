using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.ViewModel;

namespace ScrumDevelopmentApplication.View
{
    /// <summary>
    /// Interaction logic for UserDashboard.xaml
    /// </summary>
    public partial class UserDashboard : Page
    {
        UserDashboardViewModel dashboard;
        public UserDashboard()
        {
            InitializeComponent();
            dashboard = new UserDashboardViewModel(true, new DialogService());
            dashboard.PopulateProjects(Projects);
        }

        private void EditYourDetails_OnClick(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.EditDetails, this, sParam: "");
        }

        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.LoginPage, this, sParam: "");
        }
        private void CreateNewProject_OnClick(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToWindowWithListBox(Windows.ProjectWizard, "", Projects);
        }

        private void GotoProject_OnClick(object sender, RoutedEventArgs e)
        {
          dashboard.GoToProjectDashboard(Projects, this);
        }

        private void Projects_OnMouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            dashboard.GoToProjectDashboard(Projects, this);
        }
    }
}
