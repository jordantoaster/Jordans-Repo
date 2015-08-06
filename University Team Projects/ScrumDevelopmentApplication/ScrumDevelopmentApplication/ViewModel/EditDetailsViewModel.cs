using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using System.Windows.Media;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class EditDetailsViewModel : ViewModelBase
    {
        private IDialogService dialogService;
        private Page editDetailsPage;
        public EditDetailsViewModel(Page editDetailsPage, bool opened, IDialogService dialogService)
        {
            this.editDetailsPage = editDetailsPage;
            this.dialogService = dialogService;
            if (!opened)
            {
                ApplicationController.GetInstance().GoToPage(Model.ApplicationPage.EditDetails, editDetailsPage, sParam: "");
            }

        }

        /// <summary>
        /// Performed validation on all the controls and data and checks it is valid to be passed onto the model
        /// </summary>
        public void EditUserDetails(String email, TextBox name, PasswordBox oldPassword, PasswordBox newPassword, PasswordBox confirmPassword,
            CheckBox productOwner, CheckBox scrumMaster, CheckBox developer, TextBox bioBox)
        {

            bool isDeveloper = IsBoxChecked(developer);
            bool isScrumMaster = IsBoxChecked(scrumMaster);
            bool isProductOwner = IsBoxChecked(productOwner);
            bool newPasswordEmpty = IsNewPasswordEmpty(newPassword, confirmPassword);
            bool oldPasswordEmpty = IsOldPasswordEmpty(oldPassword);
            bool nameEmpty = IsNameEmpty(name);
            bool isBioEmpty = IsBioEmpty(bioBox);

            if (!nameEmpty)
            {
                if (newPasswordEmpty && !oldPasswordEmpty && IsRoleSelected(isProductOwner, isScrumMaster, isDeveloper) && !isBioEmpty)
                {
                    if (EditDetailsModel.EditExistingUser(email, name.Text, oldPassword.Password, oldPassword.Password,
                        isProductOwner, isScrumMaster, isDeveloper, bioBox.Text))
                    {
                        ApplicationController.GetInstance().GoToPage(ApplicationPage.UserDashboard, editDetailsPage);
                        UpdateEditedUserFields(name.Text, isProductOwner, isScrumMaster, isDeveloper);
                    } else dialogService.ShowMessageBox("Edit details failed", "Edit fail");
                }

                else if (!newPasswordEmpty && IsPasswordValid(newPassword, confirmPassword) && !oldPasswordEmpty && !isBioEmpty)
                {
                    if (EditDetailsModel.EditExistingUser(email, name.Text, oldPassword.Password, newPassword.Password,
                        isProductOwner, isScrumMaster, isDeveloper, bioBox.Text))
                    {
                        ApplicationController.GetInstance().GoToPage(ApplicationPage.UserDashboard, editDetailsPage);
                        UpdateEditedUserFields(name.Text, isProductOwner, isScrumMaster, isDeveloper);
                    } else dialogService.ShowMessageBox("Edit details failed", "Edit fail");
                }
            }
        }

        /// <summary>
        /// basic check to determine if a box ix being used
        /// </summary>
        public bool IsBoxChecked(CheckBox box)
        {
            if (box.IsChecked == true)
                return true;
            else return false;
        }

        /// <summary>
        /// Using the password boxes checks are performed to ensure security and validation
        /// </summary>
        public bool IsPasswordValid(PasswordBox password, PasswordBox passwordConfirm)
        {
            if (password.Password == passwordConfirm.Password && password.Password.Length > 7)
            {
                password.BorderBrush = Brushes.DodgerBlue;
                passwordConfirm.BorderBrush = Brushes.DodgerBlue;
                return true;
            }
            else if (password.Password.Length < 7)
            {
                password.BorderBrush = Brushes.Red;
                passwordConfirm.BorderBrush = Brushes.Red;
                dialogService.ShowMessageBox("Password must be at least 8 characters in length", "Invalid Password");
                return false;
            }
            else
            {
                password.BorderBrush = Brushes.Red;
                passwordConfirm.BorderBrush = Brushes.Red;
                dialogService.ShowMessageBox("The 'New Password' and 'Confirm Password' fields do not match", "Invalid Password");
                return false;
            }
        }

        /// <summary>
        /// Checks if a feild is empty
        /// </summary>
        public bool IsOldPasswordEmpty(PasswordBox oldPassword)
        {
            oldPassword.BorderBrush = oldPassword.Password != "" ? Brushes.DodgerBlue : Brushes.Red;

            if (oldPassword.Password == "")
            {
                dialogService.ShowMessageBox("Please enter old password to confirm changes");
                return true;
            }
            return false;
        }

        /// <summary>
        /// checks if the name feild is empty
        /// </summary>
        public bool IsNameEmpty(TextBox name)
        {
            name.BorderBrush = name.Text != "" ? Brushes.DodgerBlue : Brushes.Red;

            if (name.Text == "")
            {
                dialogService.ShowMessageBox("Please enter a valid Name", "Invalid Name");
                return true;
            }
            return false;
        }

        /// <summary>
        /// checks if the password feild is empty
        /// </summary>
        public bool IsNewPasswordEmpty(PasswordBox newPassword, PasswordBox confirmPassword)
        {

            if (newPassword.Password == "" && confirmPassword.Password == "")
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// Updates the text boxes based on the user input
        /// </summary>
        public void UpdateEditedUserFields(string name, bool isProductOwner, bool isScrumMaster, bool isDeveloper)
        {
            User.Name = name;
            User.ProductOwner = isProductOwner;
            User.ScrumMaster = isScrumMaster;
            User.Developer = isDeveloper;
        }

        /// <summary>
        /// Determines if the user has selected a role
        /// </summary>
        public bool IsRoleSelected(bool productOwner, bool scrumMaster, bool developer)
        {
            if (productOwner || scrumMaster || developer)
            {
                return true;
            }
            dialogService.ShowMessageBox("Please choose a role");
            return false;
        }

        /// <summary>
        /// ensures the bio is populated
        /// </summary>
        public bool IsBioEmpty(TextBox bio)
        {
            bio.BorderBrush = bio.Text != "" ? Brushes.DodgerBlue : Brushes.Red;

            if (bio.Text == "")
            {
                dialogService.ShowMessageBox("Please enter Bio", "Invalid Bio");
                return true;
            }
            return false;
        }

        /// <summary>
        /// simply gets the bio for use in the system
        /// </summary>
        public static string GetBio(string email)
        {
            return EditDetailsModel.GetBio(email);
        }

        public static string GetUsername(string email)
        {
            return EditDetailsModel.GetUsername(email);
        }
    }
}