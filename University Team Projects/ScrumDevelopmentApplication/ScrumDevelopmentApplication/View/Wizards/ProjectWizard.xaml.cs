using System;
using System.Windows;
using System.Windows.Controls;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.ViewModel;

namespace ScrumDevelopmentApplication.View.Wizards
{
    /// <summary>
    /// Interaction logic for ProjectWizard.xaml
    /// </summary>
    public partial class ProjectWizard : Window
    {
        private ListBox _listBox;
        public ProjectWizard(ListBox listBox)
        {
            InitializeComponent();
            WindowStartupLocation = System.Windows.WindowStartupLocation.CenterScreen;
            _listBox = listBox;
        }
        /// <summary>
        /// After submit button is clicked, creates a new instance of project view model and sends
        /// all required information to it
        /// </summary>
        private void SubmitProject(object sender, RoutedEventArgs e)
        {
            var addProject = new ProjectWizardViewModel(new DialogService());
            addProject.CheckIfValidProject(ProjectNameBox, User.Email, DescriptionBox, StartDatePicker, this);
            addProject.populateListBox(_listBox);
        }
    }
}
