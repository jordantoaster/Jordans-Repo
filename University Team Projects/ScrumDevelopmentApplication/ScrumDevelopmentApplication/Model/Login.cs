using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Media.Animation;
using ScrumDevelopmentApplication.UserServiceReference;
using ScrumDevelopmentInterface;
using ScrumDevelopmentServer;

namespace ScrumDevelopmentApplication.Model
{
    internal class Login 
    {
        private string _email, _password;
        public Login(string email, string password)
        {
            _email = email;
            _password = password;
        }

        /// <summary>
        /// Passes the data to attempt a log in and then various methods are called to set the users values
        /// to variables for use in the application.
        /// </summary>
        public static string AttemptLogin(string email, string password)
        {

            var userClient = new UserServiceClient();
            try
            {
                const string errorWithSystem = "Sorry, there's been an error in our system please try back in a few minutes.";
                string loginResult = userClient.AuthenticatedLogin(email, password);
                if (loginResult == "valid")
                {
                    var userEmail = email;
                    var name = userClient.GetLoggedInName(email);
                    var scrumMaster = userClient.GetLoggedInScrumMaster(email);
                    var developer = userClient.GetLoggedInDeveloper(email);
                    var projectOwner = userClient.GetLoggedInProductOwner(email);
                    var userPassword = password;
                    SetUserDetails(userEmail, name, scrumMaster, developer, projectOwner, userPassword);
                    
                    return "valid";
                }
                if (loginResult == errorWithSystem)
                {
                    MessageBox.Show(errorWithSystem);
                }
                return userClient.AuthenticatedLogin(email, password);
               
            }
            catch (Exception e)
            {
                Debug.WriteLine("Error occurred when attempting to login: " + e);
                MessageBox.Show("Login Unsuccessful. Please try again.");
            }

            return null;
        }

        /// <summary>
        /// Instantiates the Users details in the user model to the values extracted from the DB
        /// </summary>
        private static void SetUserDetails(string email, string name, bool scrumMaster, bool developer, bool productOwner, string userPassword)
        {
            User.Email = email;
            User.Name = name;
            User.ScrumMaster = scrumMaster;
            User.Developer = developer;
            User.ProductOwner = productOwner;
            User.Password = userPassword;

        }
    }
    
}
