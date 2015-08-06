using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using ScrumDevelopmentInterface;
using ScrumDevelopmentServer;
using ScrumDevelopmentApplication.UserServiceReference;

namespace ScrumDevelopmentApplication.Model
{
    class Register
    {
        /// <summary>
        /// Passes the recieved data to the user service and returns a boolean highlighting if successful
        /// </summary>
        public static bool RegisterNewUser(string email, string name, string password, bool productOwner, bool scrumMaster, bool developer, string bio)
        {
            var userClient = new UserServiceClient();

            try
            {
                if (userClient.CompareEmail(email))
                {
                    MessageBox.Show("The email provided is already used", "Invalid email");
                    return false;
                }
                return userClient.InsertUser(email, name, password, productOwner, scrumMaster, developer, bio);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Im sorry, somthing went wrong on our end. Please try again later", "Registration Unsuccessful");
                return false;
            }
           
        }
        
    }
}
