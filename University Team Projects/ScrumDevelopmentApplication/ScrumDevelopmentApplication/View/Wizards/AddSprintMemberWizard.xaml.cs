using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.ViewModel;
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

namespace ScrumDevelopmentApplication.View.Wizards
{
    /// <summary>
    /// Interaction logic for AddSprintMemberWizard.xaml
    /// </summary>
    public partial class AddSprintMemberWizard : Window
    {
         int sprintId;
         int projectId;
        private ListBox _listBox;

        public AddSprintMemberWizard(string parameter, string pId, ListBox listBox)
        {
            sprintId = Convert.ToInt32(parameter);
            projectId = Convert.ToInt32(pId);

            InitializeComponent();
            WindowStartupLocation = System.Windows.WindowStartupLocation.CenterScreen;
            AddButton.IsEnabled = false;
            _listBox = listBox;
        }

        public void AddTeamMemberToList_click(object sender, RoutedEventArgs e)
        {
            var model = new AddSprintTeamMemberViewModel(new DialogService());
            model.SearchAndAdd(ResultsBox, EmailBox.Text, (bool)ProductOwnerCheckBox.IsChecked, (bool)ScrumMasterCheckBox.IsChecked, (bool)DeveloperCheckBox.IsChecked, projectId);
            model.enableAdd(true, AddButton);
            
        }

        private void FinishedButton_Click(object sender, RoutedEventArgs e)
        {
            if (ResultsBox.SelectedIndex == -1)
            {
                MessageBox.Show("Please choose a user", "User not selected");
            }
            else
            {
                var addMemberTolist = new AddSprintTeamMemberViewModel(new DialogService());
                addMemberTolist.CheckIfValidUser(ResultsBox.SelectedItem as SearchItem, ProductOwnerCheckBox, ScrumMasterCheckBox, DeveloperCheckBox, projectId, sprintId, this);
                addMemberTolist.UpdateTeamMembers(_listBox, sprintId);
            }
        }
    }
}
