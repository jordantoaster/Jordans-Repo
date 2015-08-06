using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.View;
using System.Net.Mail;
using System.Windows.Media;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class LoginViewModel : ViewModelBase
    {
        private IDialogService dialogService;
        public LoginViewModel(TextBox Username, PasswordBox Password, CheckBox RememberMe, Page loginPage, IDialogService dialogService)
        {
            this.dialogService = dialogService;
            ProcessLogin(Username, Password, RememberMe, loginPage);
        }

        /// <summary>
        /// the controller method for handling the log in data passed from the view
        /// </summary>
        public void ProcessLogin(TextBox username, PasswordBox password, CheckBox rememberMe, Page loginPage)
        {
            bool loginValidated = ValidLogin(username, password);
            if (loginValidated)
            {
                //send email and encrypted password to the service - return bool authenticated

                string authenticated = Model.Login.AttemptLogin(username.Text, password.Password);
                if (authenticated == "valid")
                {
                   if (rememberMe.IsChecked != null && rememberMe.IsChecked.Value)
                    {
                        User.RememberUser = true;
                    }
                    else User.RememberUser = false;
                    
                    var dashboard = new UserDashboardViewModel(false, new DialogService(), loginPage);
                }
                else
                {
                    dialogService.ShowMessageBox(authenticated,
                    "Login Unsuccessful");
                }
            }
        }

        /// <summary>
        /// This method determines if the data passed from the view is valid
        /// </summary>
        public bool ValidLogin(TextBox Username, PasswordBox Password)
        {
            bool emptyFields = false, passwordValid = false, emailValid = false;

            emptyFields = IsEmptyFields(Username, Password);

            if (!emptyFields)
            {
                passwordValid = isPasswordValid(Password);
                if (passwordValid)
                    emailValid = isEmailValid(Username);
                if (emailValid)
                    return true;
            }
            return false;
        }

        /// <summary>
        /// This method checks if the feilds are empty
        /// </summary>
        public bool IsEmptyFields(TextBox username, PasswordBox password)
        {
            if ((username.Text == "") || (password.Password == "") && (username.Text == null) || (password.Password == null))
            {
                dialogService.ShowMessageBox("Username or Password field is empty", "Login Unsuccessful");
                username.BorderBrush = Brushes.Red;
                password.BorderBrush = Brushes.Red;
                return true;
            }
            return false;
        }

        /// <summary>
        /// This method determines if the password is off the correct length
        /// </summary>
        public bool isPasswordValid(PasswordBox password)
        {
            if (password.Password.Length <= 7)
            {
                dialogService.ShowMessageBox("Password is not long enough", "Login Unsuccessful");
                password.BorderBrush = Brushes.Red;
                return false;
            }

            return true;
        }

        /// <summary>
        /// This method determines if email has got at least three characters, in theory "a@.com" etc
        /// </summary>
        public bool isEmailValid(TextBox email)
        {
            if (email.Text.Length <= 3)
            {
                dialogService.ShowMessageBox("Email is not long enough", "Login Unsuccessful");
                email.BorderBrush = Brushes.Red;
                return false;
            }
            return true;
        }


    }
}

