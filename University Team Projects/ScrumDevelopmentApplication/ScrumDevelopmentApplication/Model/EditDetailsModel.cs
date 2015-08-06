using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using ScrumDevelopmentApplication.UserServiceReference;
using ScrumDevelopmentInterface;
using ScrumDevelopmentServer;

namespace ScrumDevelopmentApplication.Model
{
    internal class EditDetailsModel
    {
        /// <summary>
        /// Passes the received data into the user service for processsing
        /// </summary>
        public static bool EditExistingUser(string email, string name, string oldPassword, string newPassword, bool productOwner, 
            bool scrumMaster, bool developer, string bio)
        {
            //call out to service
            var userClient = new UserServiceClient();
            try
            {
                return userClient.UpdateUser(User.Email, name, oldPassword, newPassword, productOwner, scrumMaster, developer, bio); 
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Im sorry, somthing went wrong on our end. Please try again later",
                    "Edit Details Unsuccessful");
            }
            return false;
        }
        /// <summary>
        /// Returns the bio from the database, based on user email
        /// </summary>
        public static string GetBio(string email)
        {
            var client = new UserServiceClient();
            try
            {
                return client.GetLoggedBio(email);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Im sorry, somthing went wrong on our end. Please try again later",
                    "Edit Details Unsuccessful");
            }
            return "";
        }

        public static string GetUsername(string email)
        {
            var client = new UserServiceClient();
            try
            {
                return client.GetLoggedInName(email);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Im sorry, somthing went wrong on our end. Please try again later",
                    "Edit Details Unsuccessful");
            }
            return "";
        }
    }
}
