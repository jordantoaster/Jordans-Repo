using System.Windows;
using ScrumDevelopmentApplication.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.View;
using System.Windows.Media;
using System.Net.Mail;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class AddTeamMemberViewModel : ViewModelBase
    {
        private IDialogService _dialogService;

        public AddTeamMemberViewModel(IDialogService dialogService)
        {
            _dialogService = dialogService;
        }


        /// <summary>
        /// Used to determine if the user can take the roles defined in the check boxes
        /// </summary>
        public void CheckIfValidUser(SearchItem selectedItem, CheckBox productOwner, CheckBox scrumMaster,
            CheckBox developer,
            int projectId, Window wizard)
        {
            if (selectedItem == null)
            {
                _dialogService.ShowMessageBox("Please select the User to add", "Select the User");
            }
            else
            {
                string email = selectedItem.Email;
                string rolePO = "";
                string roleSM = "";
                string roleDev = "";
                bool ProductOwner = false;
                bool ScrumMaster = false;
                bool Developer = false;
                if (productOwner.IsChecked == true)
                {
                    rolePO = "ProductOwner";
                    ProductOwner = AddTeamMember.IsUserInTheProject(email, projectId, rolePO);
                }
                if (scrumMaster.IsChecked == true)
                {
                    roleSM = "ScrumMaster";
                    ScrumMaster = AddTeamMember.IsUserInTheProject(email, projectId, roleSM);
                }
                if (developer.IsChecked == true)
                {
                    roleDev = "Developer";
                    Developer = AddTeamMember.IsUserInTheProject(email, projectId, roleDev);
                }

                if (!ProductOwner || !ScrumMaster || !Developer)
                {
                    if (RoleSelected(productOwner, scrumMaster, developer))
                    {
                        var addTeamMember = new AddTeamMember(email);
                        bool validUser = addTeamMember.CompareEmail(email);

                        if (validUser)
                        {
                            if (scrumMaster.IsChecked == true || productOwner.IsChecked == true ||
                                developer.IsChecked == true)
                            {
                                bool validRoles = addTeamMember.ValidRoles(email, scrumMaster, productOwner, developer);

                                if (validRoles)
                                {
                                    if ((!ProductOwner && productOwner.IsChecked == true) &&
                                        (!ScrumMaster && scrumMaster.IsChecked == true) &&
                                        (!Developer && developer.IsChecked == true))
                                    {
                                        addTeamMember.AddMember(email, true, true, true, projectId);
                                    }
                                    if ((!ProductOwner && productOwner.IsChecked == true) &&
                                        (!ScrumMaster && scrumMaster.IsChecked == true))
                                    {
                                        addTeamMember.AddMember(email, true, true, false, projectId);
                                    }
                                    if ((!ProductOwner && productOwner.IsChecked == true) &&
                                        (!Developer && developer.IsChecked == true))
                                    {
                                        addTeamMember.AddMember(email, false, true, true, projectId);
                                    }
                                    if ((!ScrumMaster && scrumMaster.IsChecked == true) &&
                                        (!Developer && developer.IsChecked == true))
                                    {
                                        addTeamMember.AddMember(email, true, false, true, projectId);
                                    }
                                    if (!ProductOwner && productOwner.IsChecked == true)
                                    {
                                        addTeamMember.AddMember(email, false, true, false, projectId);
                                    }
                                    if (!ScrumMaster && scrumMaster.IsChecked == true)
                                    {
                                        addTeamMember.AddMember(email, true, false, false, projectId);
                                    }
                                    if (!Developer && developer.IsChecked == true)
                                    {
                                        addTeamMember.AddMember(email, false, false, true, projectId);
                                    }
                                                                     
                                    //Here I will pass the project name to a service which whill return the project description
                                    _dialogService.ShowMessageBox("User added to project successfully",
                                        "User added to project");
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
                    _dialogService.ShowMessageBox("User already assigned to this project",
                         "User already added");
                }               
            }
        }


        /// <summary>
        /// Checks if a role is selected
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
        /// Searches for a user based on the search string and the roles selected
        /// </summary>
        public void SearchAndAdd(ListView searchBox, string searchString, bool productOwner, bool scrumMaster, bool developer)
        {
            var results = AddTeamMember.SearchForUsers(searchString, productOwner, scrumMaster, developer);
            searchBox.Items.Clear();
            if (results.Any())
            {
                for (var i=0; i<results.Length; i++)
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
        public void enableAdd(bool answer, Button addButton)
        {
            if (answer)
            {
                addButton.IsEnabled = true;
            }
        }


        /// <summary>
        /// Updates the list box when an action is performed
        /// </summary>
        public void UpdateTeamMembers(ListBox teamListBox, int projectId, Button button)
        {
            var list = ProjectDashboardModel.GetProjectTeamList(projectId);
            teamListBox.Items.Clear();
            foreach (var p in list)
            {
                if (ProjectDashboardModel.CheckIfProjectOwner(p, projectId))
                {
                    teamListBox.Items.Add(p + " (Project Owner)");
                }
                if (ProjectDashboardModel.CheckIfProductOwner(p, projectId))
                {
                    teamListBox.Items.Add(p + " (Product Owner)");
                }
                if (ProjectDashboardModel.CheckIfScrumMaster(p, projectId))
                {
                    teamListBox.Items.Add(p + " (Scrum Master)");
                }
                if (ProjectDashboardModel.CheckIfDeveloper(p, projectId))
                {
                    teamListBox.Items.Add(p + " (Developer)");
                }
            }
            if (ProjectDashboardModel.CheckIfScrumMaster(User.Email, projectId))
            {
                button.IsEnabled = true;
            }
        }
    }
}