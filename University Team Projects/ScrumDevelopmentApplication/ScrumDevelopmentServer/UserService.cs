using System.Data;
using System.Diagnostics;
using System.Windows.Forms;
using ScrumDevelopmentInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using ScrumDevelopmentServer.ScrumDevelopmentDatabaseDataSetTableAdapters;

namespace ScrumDevelopmentServer
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "UserService" in both code and config file together.
  
    public class UserService : IUserService
    {
      
        public bool InsertUser(string email, string name, string password, bool productOwner, bool scrumMaster, bool developer)
        {
            Console.WriteLine("Entering InsertUser...");            
            try
            {
                using (var db = new UserTableAdapter())
                {
                 
                    db.Insert(email, name, Security.Encrypt(password), productOwner, scrumMaster, developer);
                    var data = db.GetData();
                    var user = data.FindByemail(email);
                  
                    

                    Console.WriteLine("Returning true...");
                    Console.WriteLine("Exiting InsertUser...");
                    return true;
                }
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting InsertUser...");
            return false;
        }

       public bool UpdateUser(string email, string name, string oldPassword, string newPassword, bool productOwner,
       bool scrumMaster, bool developer)
        {
            try
            {
                using (var getData = new UserTableAdapter().GetData())
                {
                    var user = getData.FindByemail(email);
                    var db = new UserTableAdapter();

                    Console.WriteLine("Returning true...");

                    if (Security.Decrypt(user.password) == oldPassword)
                    {

                        user.name = name;
                        user.password = Security.Encrypt(newPassword);
                        user.productOwner = productOwner;
                        user.scrumMaster = scrumMaster;
                        user.developer = developer;

                        return true;
                    }
                    else
                    {
                        Console.WriteLine("Passwords don't match");
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);

            }
            return false;
        }

        public bool AuthenticatedLogin(string email, string password)
        {
       
                try
                {
                        using  (var db = new UserTableAdapter())
                        {
                            var data = db.GetData();
                            var user = data.FindByemail(email);    
                            Console.WriteLine("Auth encrypted pwd " + user.password);
                            string decryptedPassword = Security.Decrypt(user.password);
           
                            if (password == decryptedPassword)
                            {
                                Console.WriteLine("Login Valid - returning True");
                                return true;
                            }

                        }
                 
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error caught when autherising login:  " + e );
                }
            
        
            Console.WriteLine("Authentication failed - returning false");
            return false;
        }

        public bool UpdateUser(string email, string name, string password, bool productOwner, bool scrumMaster, bool developer)
        {
            throw new NotImplementedException();
        }

        public string getLoggedInName(String email)
        {
            String name;
            using (var db = new UserTableAdapter())
            {
                var data = db.GetData();
                var user = data.FindByemail(email);
                name = user.name;
            }
            return name;
        }

        public bool getLoggedInDeveloper(String email)
        {
            bool developer;
            using (var db = new UserTableAdapter())
            {
                var data = db.GetData();
                var user = data.FindByemail(email);
                developer = user.developer;
            }
            return developer;
        }

        public bool getLoggedInProductOwner(String email)
        {
            bool productOwner;
            using (var db = new UserTableAdapter())
            {
                var data = db.GetData();
                var user = data.FindByemail(email);
                productOwner = user.productOwner;
            }
            return productOwner;
        }


        public bool getLoggedInScrumMaster(String email)
        {
            bool scrumMaster;
            using (var db = new UserTableAdapter())
            {
                var data = db.GetData();
                var user = data.FindByemail(email);
                scrumMaster = user.scrumMaster;
            }
            return scrumMaster;
        }


        public bool DeleteUser(string email, string name, bool productOwner, bool scrumMaster, bool developer)
        {
            Console.WriteLine("Entering DeleteUser...");
            try
            {
                using (var db = new UserTableAdapter())
                {
                    db.Delete(email, name, productOwner, scrumMaster, developer);
                    Console.WriteLine("Returning true...");
                    Console.WriteLine("Exiting DeleteUser...");
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting DeleteUser...");
            return false;           
        }

        public bool CompareEmail(string email)
        {
            try
            {
                using (var db = new UserTableAdapter())
                {
                    var data = db.GetData();
                    var user = data.FindByemail(email);

                    if (user.email == email)
                    {
                        return true;
                    }
                }

            }
            catch (Exception e)
            {
                Console.WriteLine("Error caught when autherising email:  " + e);
            }
            return false;
        }

        public bool CheckIfRolesValid(String email, bool? scrumMaster, bool? productOwner, bool? developer)
        {
            using (var db = new UserTableAdapter())
            {
                var data = db.GetData();
                var user = data.FindByemail(email);

                bool validScrumMaster = false;
                bool validProductOwner = false;
                bool validDeveloper = false;

                if (user.scrumMaster == scrumMaster)
                {
                    validScrumMaster = true;
                }

                if (user.productOwner == productOwner)
                {
                    validProductOwner = true;
                }

                if (user.developer == developer)
                {
                    validDeveloper = true;
                }

                if(validScrumMaster == scrumMaster && validProductOwner == productOwner && validDeveloper == developer)
                {
                    //users boxes check = the roles stored in the DB
                    return true;
                }
            }
            return false;
        }
    }
}
