using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class AddSprintTeamMemberViewModel
    {
        private IDialogService _dialogService;

        public AddSprintTeamMemberViewModel(IDialogService dialogService)
        {
            _dialogService = dialogService;
        }

        /// <summary>
        /// Searches for a list of team members and populates the search box in the wizard
        /// </summary>
        public void SearchAndAdd(ListView searchBox, string searchString, bool productOwner, bool scrumMaster, bool developer, int projectId)
        {
            var results = AddSprintTeamMember.SearchForUsers(searchString, productOwner, scrumMaster, developer, projectId);
            searchBox.Items.Clear();
            if (results.Any())
            {
                for (var i = 0; i < results.Length; i++)
                {
                    searchBox.Items.Add(new SearchItem { Email = results[i], Name = results[++i] });
                    searchBox.SelectedItems.Add(i);
                }
            }
            else
            {
                _dialogService.ShowMessageBox("No results found");
            }
        }


        /// <summary>
        /// Using the parameters given checks are made to determine if the details are valid
        /// </summary>
        public void CheckIfValidUser(SearchItem selectedItem, CheckBox productOwner, CheckBox scrumMaster, CheckBox developer,
            int projectId, int sprintId, Window wizard)
        {
            if (selectedItem == null)
            {
                _dialogService.ShowMessageBox("Please select the User to add", "Select the User");
            }
            else
            {
                string email = selectedItem.Email;
                if (!AddSprintTeamMember.IsUserInTheSprint(email, sprintId, projectId))
                {
                    if (RoleSelected(productOwner, scrumMaster, developer))
                    {
                        var addTeamMember = new AddSprintTeamMember(email);
                        bool validUser = addTeamMember.CompareEmail(email);

                        if (validUser)
                        {
                            if (scrumMaster.IsChecked == true || productOwner.IsChecked == true || developer.IsChecked == true)
                            {
                                bool validRoles = addTeamMember.ValidRoles(email, scrumMaster, productOwner, developer);

                                if (validRoles)
                                {
                                    addTeamMember.AddMember(email, (bool)scrumMaster.IsChecked,
                                                           (bool)productOwner.IsChecked, (bool)developer.IsChecked, projectId, sprintId);
                                    _dialogService.ShowMessageBox("User added to project successfully", "User added to project");
                                    wizard.Close();
                                }
                                else
                                {
                                    _dialogService.ShowMessageBox(
                                        "This user can not be assigned to the role you have selected", "Role Invalid");
                                }
                            }
                        }
                    }
                }
                else
                {
                    _dialogService.ShowMessageBox("User already assigned to this sprint",
                         "User already added");
                }
                
            }           
        }


        /// <summary>
        /// Ensures a role is clicked by the user in the wizard
        /// </summary>
        public bool RoleSelected(CheckBox productOwner, CheckBox scrumMaster, CheckBox developer)
        {
            if (scrumMaster.IsChecked == false && productOwner.IsChecked == false && developer.IsChecked == false)
            {
                _dialogService.ShowMessageBox("Please choose a role for this team member", "Role not selected");
                scrumMaster.BorderBrush = Brushes.Red;
                productOwner.BorderBrush = Brushes.Red;
                developer.BorderBrush = Brushes.Red;
                return false;
            }
            return true;
        }
        /// <summary>
        /// Enables Add button in the wizard
        /// </summary>
        public void enableAdd(bool answer, Button addButton)
        {
            if (answer)
            {
                addButton.IsEnabled = true;
            }
        }


        /// <summary>
        /// This method is used to update the listbox with team members
        /// </summary>
        public void UpdateTeamMembers(ListBox teamListBox, int sprint)
        {
            string sprintId = "" + sprint;
            var list = SprintDashboardModel.GetSprintTeamList(sprintId);

            if (list.Any())
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
    }
}
