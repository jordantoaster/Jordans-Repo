using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;
using BackEndTesting.UserServiceReference;
using NUnit.Framework;
using ScrumDevelopmentServices;

namespace BackEndTesting
{
    [TestFixture]
    public class TestRegistration
    {
        private UserServiceClient _userClient;

        [SetUp]
        public void Setup()
        {
            _userClient = new UserServiceClient();
            _userClient.Open();
        }

        [Test]
        public void Test_ValidInsertUser()
        {
            _userClient.DeleteUser("test@test.test");
            Assert.IsTrue(_userClient.InsertUser("test@test.test", "test", "password", true, true, false, "Bio"));
            _userClient.DeleteUser("test@test.test");
        }

        [Test]
        public void Test_InvalidEmailInsertUser()
        {
            Assert.IsFalse(_userClient.InsertUser(null, "test", "password", true, true, false, "Bio"));
        }

        [TearDown]
        public void Teardown()
        {
            _userClient.Close();
        }
    }
}
