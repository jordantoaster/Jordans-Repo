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
    /// Interaction logic for Page1.xaml
    /// </summary>
    public partial class AcceptanceTestPage : Page
    {
        AcceptanceTestViewModel dashboard;
        int userStory;

        public AcceptanceTestPage(int story, int projectId)
        {
            userStory = story;
            InitializeComponent();

            dashboard = new AcceptanceTestViewModel(new DialogService());
            dashboard.PopulateTests(TestListBox, userStory);
            dashboard.DisableNewAcceptanceTest(AddAcceptanceTestButton, projectId);
        }

        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.LoginPage, this);
        }

        private void RefreshButton_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.AcceptanceTestPage, this);
        }

        private void Acceptance_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToWindow(Windows.AddAcceptanceTest, "");
        }

        private void BackToProductBacklogPage_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.ProductBacklogPage, this);
        }

    }
}