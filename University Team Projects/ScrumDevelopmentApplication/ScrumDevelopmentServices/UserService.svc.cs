using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using ScrumDevelopmentServer;
using ScrumDevelopmentServer.ScrumDevelopmentDatabaseDataSetTableAdapters;
using System.Data.Entity;

namespace ScrumDevelopmentServices
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "UserService" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select UserService.svc or UserService.svc.cs at the Solution Explorer and start debugging.
    public class UserService : IUserService
    {
        string decryptedPassword;

        /// <summary>
        /// Inserts a user into the database with the parameters specefied
        /// </summary>
        public bool InsertUser(string email, string name, string password, bool productOwner, bool scrumMaster, bool developer, string bio)
        {
            Console.WriteLine("Entering InsertUser...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var entry = new User
                    {
                        email = email,
                        name = name,
                        password = Security.Encrypt(password),
                        productOwner = productOwner,
                        scrumMaster = scrumMaster,
                        developer = developer,
                        bio = bio
                    };
                    db.Users.Add(entry);
                    db.SaveChanges();
                    Console.WriteLine("Returning true...");
                    Console.WriteLine("Exiting InsertUser...");
                    return true;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            Console.WriteLine("Returning false...");
            Console.WriteLine("Exiting InsertUser...");
            return false;
        }

        /// <summary>
        /// Used to delete a user from the database
        /// </summary>
        public bool DeleteUser(string email)
        {
            Console.WriteLine("Entering DeleteUser...");
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var user = (from u in db.Users
                                where u.email == email
                                select u).First();
                    db.Users.Remove(user);
                    db.SaveChanges();
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

        /// <summary>
        /// takes in a email and password and compares against the database for equality
        /// </summary>
        public string AuthenticatedLogin(string email, string password)
        {
            const string wrongPassword = "Password incorrect";
            const string wrongEmail = "Username incorrect";
            const string errorWithSystem = "Sorry, there's been an error in our system please try back in a few minutes.";
            const string correctLogin = "valid";
            if(password == null && email != null ){ return wrongPassword;}
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var user = (from u in db.Users
                                where u.email == email
                                select u).First();

                    decryptedPassword = Security.Decrypt(user.password);

                    if (password == decryptedPassword)
                    {
                        Console.WriteLine("Login Valid - returning True");
                        return correctLogin;
                    }
                }

            }
            catch (Exception e)
            {
                Console.WriteLine("Error caught when autherising login:  " + e);
            }

            Console.WriteLine("Authentication failed - returning false");
            if ((decryptedPassword == null) && (email != null)) return wrongEmail;
            if (decryptedPassword != null && password != decryptedPassword) return wrongPassword;
            return errorWithSystem;
        }

        /// <summary>
        /// with the parameters passsed in the user specefied is updated
        /// </summary>
        public bool UpdateUser(string email, string name, string oldpassword, string password, bool productOwner, bool scrumMaster,
            bool developer, string bio)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var user = (from u in db.Users
                        where u.email == email
                        select u).First();

                    if (Security.Decrypt(user.password) == oldpassword)
                    {

                        user.name = name;
                        user.password = Security.Encrypt(password);
                        user.productOwner = productOwner;
                        user.scrumMaster = scrumMaster;
                        user.developer = developer;
                        user.bio = bio;

                        db.SaveChanges();

                        Console.WriteLine("Returning true...");
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

        /// <summary>
        /// Gets the name of the user who is currently using the system
        /// </summary>
        public string GetLoggedInName(string email)
        {
            string name;
            using (var db = new ScrumDevelopmentDatabaseEntities())
            {
                var user = (from u in db.Users
                            where u.email == email
                            select u).First();

                name = user.name;
            }
            return name;
        }

        /// <summary>
        /// The next four methods are used to determine the logged in users role
        /// </summary>
        
        public bool GetLoggedInDeveloper(string email)
        {
            bool developer = false;
            using (var db = new ScrumDevelopmentDatabaseEntities())
            {
                var user = (from u in db.Users
                            where u.email == email
                            select u).First();

                if (user.developer != null) developer = (bool)user.developer;
            }
            return developer;
        }

        public bool GetLoggedInProductOwner(string email)
        {
            bool productOwner = false;
            using (var db = new ScrumDevelopmentDatabaseEntities())
            {
                var user = (from u in db.Users
                            where u.email == email
                            select u).First();

                if (user.productOwner != null) productOwner = (bool)user.productOwner;
            }
            return productOwner;
        }

        public bool GetLoggedInScrumMaster(string email)
        {
            bool scrumMaster = false;
            using (var db = new ScrumDevelopmentDatabaseEntities())
            {
                var user = (from u in db.Users
                            where u.email == email
                            select u).First();

                if (user.scrumMaster != null) scrumMaster = (bool)user.scrumMaster;
            }
            return scrumMaster;
        }

        /// <summary>
        /// compares the passed in email against the database
        /// </summary>
        public bool CompareEmail(string email)
        {
            try
            {
                using (var db = new ScrumDevelopmentDatabaseEntities())
                {
                    var user = (from u in db.Users
                                where u.email == email
                                select u).First();

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

        /// <summary>
        /// used during registration to determine if the user has selected valid roles
        /// </summary>
        public bool CheckIfRolesValid(string email, bool? scrumMaster, bool? productOwner, bool? developer)
        {
            using (var db = new ScrumDevelopmentDatabaseEntities())
            {
             var user = (from u in db.Users
                                where u.email == email
                                select u).First();

                bool validScrumMaster = false;
                bool validProductOwner = false;
                bool validDeveloper = false;

                if (user.scrumMaster == scrumMaster && user.scrumMaster != false)
                {
                    validScrumMaster = true;
                }

                if (user.productOwner == productOwner && user.productOwner != false)
                {
                    validProductOwner = true;
                }

                if (user.developer == developer && user.developer != false)
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
        /// <summary>
        /// Returns the bio based on user's unique email
        /// </summary>
        public string GetLoggedBio(string email)
        {
            string bio;
            using (var db = new ScrumDevelopmentDatabaseEntities())
            {
                var user = (from u in db.Users
                            where u.email == email
                            select u).First();

                bio = user.bio;
            }
            return bio;
        }
    }
}
