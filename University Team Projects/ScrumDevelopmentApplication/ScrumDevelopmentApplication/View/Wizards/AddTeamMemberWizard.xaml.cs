using System;
using System.Windows;
using System.Windows.Controls;
using ScrumDevelopmentApplication.ViewModel;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;

namespace ScrumDevelopmentApplication.View.Wizards
{
    /// <summary>
    /// Interaction logic for AddTeamMemberWizard.xaml
    /// </summary>
    public partial class AddTeamMemberWizard : Window
    {
        private int projectId;
        private ListBox _listBox;
        private Button _button;

        public AddTeamMemberWizard(string parameter, ListBox listBox, Button button)
        {
            projectId = Convert.ToInt32(parameter);
            InitializeComponent();
            WindowStartupLocation = System.Windows.WindowStartupLocation.CenterScreen;
            AddButton.IsEnabled = false;
            _listBox = listBox;
            _button = button;
        }

        public void AddTeamMemberToList_click(object sender, RoutedEventArgs e)
        {
            var model = new AddTeamMemberViewModel(new DialogService());
            model.SearchAndAdd(ResultsBox, EmailBox.Text, (bool)ProductOwnerCheckBox.IsChecked, (bool)ScrumMasterCheckBox.IsChecked, (bool)DeveloperCheckBox.IsChecked);
            model.enableAdd(true, AddButton);
        }

        private void FinishedButton_Click(object sender, RoutedEventArgs e)
        {
            var addMemberTolist = new AddTeamMemberViewModel(new DialogService());
            addMemberTolist.CheckIfValidUser(ResultsBox.SelectedItem as SearchItem, ProductOwnerCheckBox, ScrumMasterCheckBox, DeveloperCheckBox, projectId, this);
            addMemberTolist.UpdateTeamMembers(_listBox, projectId, _button);
            
        }
    }
}
