using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.View;
using Register = ScrumDevelopmentApplication.View.RegistrationPage;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class RegisterViewModel : ViewModelBase
    {
        private IDialogService dialogService;
        private Page loginPage;
        public RegisterViewModel(Page loginPage, bool opened, IDialogService dialogService)
        {
            this.loginPage = loginPage;
            this.dialogService = dialogService;
            if (!opened)
            {
                ApplicationController.GetInstance().GoToPage(Model.ApplicationPage.RegistrationPage, loginPage, sParam: "");
            }
        }

        /// <summary>
        /// This method collects information from the view, passes each relevant piece to validaton methods
        /// If the data is valid it is then passed to the model for processing
        /// </summary>
        public void RegisterNewUser(TextBox email, TextBox name, PasswordBox password, PasswordBox confirmPassword,
            ListBox roles, bool productOwner, bool scrumMaster, bool developer, TextBox bio)
        {
            bool emptyFields, emailValid = false, passwordValid = false, nameValid = false;
            emptyFields = IsEmptyFields(email, name, password, confirmPassword, bio);
            if (!emptyFields)
            {
                emailValid = IsEmailValid(email);
                if (emailValid)
                {
                    passwordValid = IsPasswordValid(password, confirmPassword);
                    nameValid = IsNameValid(name);
                }
                
            }


            if (!emptyFields && emailValid && passwordValid && nameValid)
            {
                bool successful = Model.Register.RegisterNewUser(email.Text, name.Text, password.Password, productOwner, scrumMaster,
                    developer, bio.Text);

                if (successful)
                {
                   dialogService.ShowMessageBox("You have now been registered. Click ok to enter the application", "Login Successful");
                   User.Email = email.Text;
                   User.Name = name.Text;
                   User.ScrumMaster = scrumMaster;
                   User.Developer = developer;
                   User.ProductOwner = productOwner;
                   ApplicationController.GetInstance().GoToPage(Model.ApplicationPage.UserDashboard, loginPage, sParam: "");
                }
            }
        }

        /// <summary>
        /// Ensures the name does not exceed 50 characters
        /// </summary>
        private bool IsNameValid(TextBox name)
        {
            if (name.Text.Length > 50)
            {
                dialogService.ShowMessageBox("Name cannot exceed 50 characters", "Registration Failed");
                return false;
            }
            return true;
        }

        /// <summary>
        /// Checks if the boxes in the view are empty, if so a message box will inform the user
        /// </summary>
        public bool IsEmptyFields(TextBox email, TextBox name, PasswordBox password, PasswordBox confirmPassword, TextBox bio)
        {
            email.BorderBrush = email.Text != "" ? Brushes.DodgerBlue : Brushes.Red;
            password.BorderBrush = password.Password != "" ? Brushes.DodgerBlue : Brushes.Red;
            confirmPassword.BorderBrush = confirmPassword.Password != "" ? Brushes.DodgerBlue : Brushes.Red;
            name.BorderBrush = name.Text != "" ? Brushes.DodgerBlue : Brushes.Red;

            if (email.Text == "" || name.Text == "" || password.Password == "" || confirmPassword.Password == "" || bio.Text == "")
            {
                dialogService.ShowMessageBox("Please complete all fields", "Empty Fields");
                return true;
            }
            return false;
        }

        /// <summary>
        /// If the email is in the correct format, true will be returned. the user will be informed if it is incorrect
        /// </summary>
        public bool IsEmailValid(TextBox emailaddress)
        {
            if (emailaddress.Text == "")
            {
                emailaddress.BorderBrush = Brushes.Red;
                return false;
            }
            else if (emailaddress.Text.Length > 50)
            {
                dialogService.ShowMessageBox("Email address cannot exceed 50 characters", "Registration Failed");
            }

            try
            {
                var m = new MailAddress(emailaddress.Text);
                emailaddress.BorderBrush = Brushes.DodgerBlue;
                return true;
            }
            catch (FormatException)
            {
                emailaddress.BorderBrush = Brushes.Red;
                dialogService.ShowMessageBox("Please enter a valid email address", "Email Invalid");
                return false;
            }
        }

        /// <summary>
        /// Validation method that performs checks on the password string
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
                dialogService.ShowMessageBox("The password and confirm password fields do not match", "Invalid Password");
                return false;
            }
        }
    }
}