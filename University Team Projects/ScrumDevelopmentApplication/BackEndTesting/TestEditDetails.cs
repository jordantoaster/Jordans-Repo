using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using BackEndTesting.UserServiceReference;
using NUnit.Framework;

namespace BackEndTesting
{
    [TestFixture]
    class TestEditDetails
    {
        UserServiceClient user = new UserServiceClient();
        private String email = "aon@aon.com";
        private String name = "aon@aon.com";
        private String oldpassword = "aon@aon.com";
        private string bio = "bio";
        private bool developer = true;
        private bool scrumMaster = true;
        private bool productOwner = true;


        private String newName = "aon@aon.com1";
        private String password = "aon@aon.com1";
        private string newBio = "newBio";
        private bool newDeveloper = false;
        private bool newScrumMaster = false;
        private bool newProductOwner = false;

        [Test]
        public void Test_EditName()
        {
            //user.DeleteUser(email);
            user.InsertUser(email, name, oldpassword, productOwner, scrumMaster, developer, bio);
            user.UpdateUser(email, newName, oldpassword, oldpassword, productOwner, scrumMaster, developer, bio);
            Debug.WriteLine("new name = " + user.GetLoggedInName(email));
            Assert.AreNotEqual((user.GetLoggedInName(email)), name);

        }

        [Test]
        public void Test_EditPassword()
        {
            user.InsertUser(email, name, oldpassword, productOwner, scrumMaster, developer, bio);
            user.UpdateUser(email, name, oldpassword, password, productOwner, scrumMaster, developer, bio);     //Due to User password being updated here, false should be returned during the following update due to the password no longer being equal to the old password
            Assert.AreEqual(false, user.UpdateUser(email, name, oldpassword, oldpassword, productOwner, scrumMaster, developer, bio));
        }

        [Test]
        public void Test_EditProductOwner()
        {
            user.DeleteUser(email);
            user.InsertUser(email, name, oldpassword, productOwner, scrumMaster, developer, bio);
            user.UpdateUser(email, name, oldpassword, oldpassword, newProductOwner, scrumMaster, developer, bio);
            Debug.WriteLine("new productOwner = " + user.GetLoggedInProductOwner(email));
            Assert.AreNotEqual((user.GetLoggedInProductOwner(email)), productOwner);
        }

        [Test]
        public void Test_EditScrumMaster()
        {
            user.DeleteUser(email);
            user.InsertUser(email, name, oldpassword, productOwner, scrumMaster, developer, bio);
            user.UpdateUser(email, name, oldpassword, oldpassword, productOwner, newScrumMaster, developer, bio);
            Debug.WriteLine("new Scrum Master = " + user.GetLoggedInScrumMaster(email));
            Assert.AreNotEqual((user.GetLoggedInScrumMaster(email)), scrumMaster);
        }

        [Test]
        public void Test_EditDeveloper()
        {
            user.DeleteUser(email);
            user.InsertUser(email, name, oldpassword, productOwner, scrumMaster, developer, bio);
            user.UpdateUser(email, name, oldpassword, oldpassword, productOwner, scrumMaster, newDeveloper, bio);
            Debug.WriteLine("new Developer = " + user.GetLoggedInDeveloper(email));
            Assert.AreNotEqual((user.GetLoggedInDeveloper(email)), developer);
        }

        [Test]
        public void Test_EditBio()
        {
            user.DeleteUser(email);
            user.InsertUser(email, name, oldpassword, productOwner, scrumMaster, developer, bio);
            user.UpdateUser(email, name, oldpassword, oldpassword, productOwner, scrumMaster, developer, newBio);
            Debug.WriteLine("new Developer = " + user.GetLoggedInDeveloper(email));
            Assert.AreEqual((user.GetLoggedBio(email)), newBio);
        }

    }
}
