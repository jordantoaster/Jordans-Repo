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
    public partial class ProductBacklogPage : Page
    {
        private String Productbacklog;
        ProductBacklogViewModel dashboard;
        int projectId;

        public ProductBacklogPage(string parameter)
        {
            projectId = Convert.ToInt32(parameter);

            InitializeComponent();

            dashboard = new ProductBacklogViewModel(new DialogService());
            dashboard.PopulateStories(StoryListBox, projectId);
            dashboard.UserStoryAbility(AddUserStoryButton, DeleteUserStoryButton, EditUserStoryButton, AddAcceptanceTestsButton, 
                MoveStoryUpButton, MoveStoryDownButton, projectId);

        }

        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.LoginPage, this);
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToWindowWithListBox(Windows.AddUserStoryWizard, ""+projectId, StoryListBox);
        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (StoryListBox.SelectedItem == null)
            {
                {
                    MessageBox.Show("Select a user story", "No user story selected");
                }
            }
            else if (
                    MessageBox.Show("Delete User Story", "Do you want to delete this User Story?",
                        MessageBoxButton.YesNo) == MessageBoxResult.Yes)
            {
               
                int storyId = Convert.ToInt32(StoryListBox.SelectedItem.ToString().Split('.')[1]);
                dashboard.GetDeletedPriority(storyId, projectId);             
                dashboard.DeleteStory(storyId);
                dashboard.UpdatePriorities(projectId); 
                dashboard.PopulateStories(StoryListBox, projectId);
                           
            }
        }

        /// <summary>
        /// Removes the selected listbox item and re-adds it one position above. 
        /// </summary>
        private void MoveStoryUp_Click(object sender, RoutedEventArgs e)
        {
            if (StoryListBox.SelectedItem == null)
            {
                MessageBox.Show("Select a user story", "No user story selected");
            }
            else if (StoryListBox.SelectedIndex >= 1)
            {
                int storyId = Convert.ToInt32(StoryListBox.SelectedItem.ToString().Split('.')[1]);
                int selectedIndex = this.StoryListBox.SelectedIndex;
                object selectedItem = this.StoryListBox.SelectedItem;
                dashboard.IncreasePriority(projectId, storyId);
                this.StoryListBox.Items.RemoveAt(selectedIndex);
                this.StoryListBox.Items.Insert(selectedIndex - 1, selectedItem);

                this.StoryListBox.SelectedIndex = selectedIndex - 1;
            }
            else
            {
                MessageBox.Show("User story priority cannot be increased any further");
            }
            
        }

        /// <summary>
        /// Removes the selected listbox item and re-adds it one position below
        /// </summary>
        private void MoveStoryDown_Click(object sender, RoutedEventArgs e)
        {
            if (StoryListBox.SelectedItem == null)
            {
                MessageBox.Show("Select a user story", "No user story selected");
            }
            else
            {
                int selectedIndex = this.StoryListBox.SelectedIndex;
                object selectedItem = this.StoryListBox.SelectedItem;
                int storyId = Convert.ToInt32(StoryListBox.SelectedItem.ToString().Split('.')[1]);

                if (selectedIndex < (StoryListBox.Items.Count - 1))
                {
                    dashboard.DecreasePriority(projectId, storyId);
                    this.StoryListBox.Items.RemoveAt(selectedIndex);
                    this.StoryListBox.Items.Insert(selectedIndex + 1, selectedItem);
                    this.StoryListBox.SelectedIndex = selectedIndex + 1;
                }
                else
                {
                    MessageBox.Show("User story priority cannot be decreased any further");
                }
            }
        }

        private void EditButton_Click(object sender, RoutedEventArgs e)
        {
            if (StoryListBox.SelectedItem == null)
            {
                MessageBox.Show("Select a user story", "No user story selected");
            }
            else
            {
                var index = StoryListBox.SelectedItem.ToString().IndexOf('.');
                int storyId = Convert.ToInt32(StoryListBox.SelectedItem.ToString().Split('.')[1]);
                var editDetails = new EditUserStoryViewModel(new DialogService(), storyId, false, projectId, Productbacklog, StoryListBox);
            }
        }

        private void Back_OnClick(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.ProjectDashboard, this, ""+projectId);
        }

        private void Acceptance_Click(object sender, RoutedEventArgs e)
        {
            if (StoryListBox.SelectedItem == null)
            {
                MessageBox.Show("Select a user story", "No user story selected");
            }
            else
            {
                string storyId = StoryListBox.SelectedItem.ToString().Split('.')[1];
                ApplicationController.GetInstance().GoToWindowWithListBox(Windows.AddAcceptanceTest, storyId, AcceptanceListBox);
            }
        }

        private void ViewAcceptanceTestButton_Click(object sender, RoutedEventArgs e)
        {
            if (AcceptanceListBox.SelectedItem == null)
            {
                MessageBox.Show("Select an acceptance test", "No acceptance test selected");
            }
            else
            {
               // var index = AcceptanceListBox.SelectedItem.ToString().IndexOf('.');
                int acceptanceTestId = Convert.ToInt32(AcceptanceListBox.SelectedItem.ToString().Split('.')[0]);
                ViewAcceptanceTestViewModel viewModel = new ViewAcceptanceTestViewModel(new DialogService(), acceptanceTestId, false);  
            }
        }

        private void Home_OnClick(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.UserDashboard, this, sParam: "");
        }

        private void StoryListBox_OnSelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (StoryListBox.SelectedItem != null)
            {
                int storyId = Convert.ToInt32(StoryListBox.SelectedItem.ToString().Split('.')[1]);
                dashboard.PopulateTests(AcceptanceListBox, storyId);
            }
        }

        private void Stories_OnMouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            if (StoryListBox.SelectedItem == null)
            {
                MessageBox.Show("Select a user story", "No user story selected");
            }
            else
            {
                var index = StoryListBox.SelectedItem.ToString().IndexOf('.');
                int storyId = Convert.ToInt32(StoryListBox.SelectedItem.ToString().Split('.')[1]);
                var editDetails = new EditUserStoryViewModel(new DialogService(), storyId, false, projectId, Productbacklog, StoryListBox);
            }
        }

        private void Tests_OnMouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            if (AcceptanceListBox.SelectedItem == null)
            {
                MessageBox.Show("Select an acceptance test", "No acceptance test selected");
            }
            else
            {
                // var index = AcceptanceListBox.SelectedItem.ToString().IndexOf('.');
                int acceptanceTestId = Convert.ToInt32(AcceptanceListBox.SelectedItem.ToString().Split('.')[0]);
                ViewAcceptanceTestViewModel viewModel = new ViewAcceptanceTestViewModel(new DialogService(), acceptanceTestId, false);
            }
        }
    }
}