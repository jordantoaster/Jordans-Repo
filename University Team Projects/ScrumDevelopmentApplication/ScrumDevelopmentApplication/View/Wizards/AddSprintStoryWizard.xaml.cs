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
using System.Windows.Shapes;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.ViewModel;

namespace ScrumDevelopmentApplication.View.Wizards
{
    /// <summary>
    /// Interaction logic for AddSprintStoryWizard.xaml
    /// </summary>
    public partial class AddSprintStoryWizard : Window
    {
        int projectId;
        int sprintID;
        private ListBox _listBox;
        public AddSprintStoryWizard(string parameter, string projectID, ListBox listBox)
        {
            sprintID = Convert.ToInt32(parameter);
            projectId = Convert.ToInt32(projectID);
            InitializeComponent();
            WindowStartupLocation = System.Windows.WindowStartupLocation.CenterScreen;
            AddButton.IsEnabled = false;
            _listBox = listBox;
        }
        /// <summary>
        /// Searches for user stories in the product backlog and enables the add button 
        /// </summary>
        public void Search_Click(object sender, RoutedEventArgs e)
        {
            var addStory = new AddSprintStoryWizardViewModel(new DialogService());
            addStory.searchStories(ResultsBox, projectId);
            addStory.enableAdd(true, AddButton);
        }
        /// <summary>
        /// Adds selected user stories to the sprint backlog and updates the list
        /// </summary>
        public void AddButton_Click(object sender, RoutedEventArgs e)
        {
            var addStory = new AddSprintStoryWizardViewModel(new DialogService());
            addStory.AddStories(ResultsBox.SelectedItem as UserStoryName, sprintID, this);
            addStory.UpdateStories(_listBox, sprintID);
        }
    }
}
