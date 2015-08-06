using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Formatters;
using System.Security.Cryptography;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;
using BackEndTesting.SprintUserServiceReference;
using NUnit.Framework;
using ScrumDevelopmentServices;

namespace BackEndTesting
{
    [TestFixture]
    public class TestAddSprintUser
    {
        private SprintUserServiceClient _sprintUserClient;


        [SetUp]
        public void Setup()
        {
            _sprintUserClient = new SprintUserServiceClient();
            _sprintUserClient.Open();
        }

        [Test]
        public void Test_ValidInsertSprintUser()
        {
            int sprintId = 1;
            int projectId = 3;
            string email = "test@test";
            bool developer = true;
            bool scrumMaster = true;
            bool productOwner = true;

            Assert.IsTrue(_sprintUserClient.InsertSprintUser(email, developer, scrumMaster, productOwner,
                            projectId, sprintId));
        }

        [Test]
        public void Test_InvalidInsertSprintUser()
        {
            int sprintId = -100;
            int projectId = 1;
            string email = "@mail.com";
            bool developer = true;
            bool scrumMaster = true;
            bool productOwner = true;

            Assert.IsFalse(_sprintUserClient.InsertSprintUser(email, developer, scrumMaster, productOwner,
                            projectId, sprintId));
        }

        [Test]
        public void Test_InvalidInsertSprintUserTwo()
        {
            int sprintId = -3;
            int projectId = -100;
            string email = "@mail.com";
            bool developer = true;
            bool scrumMaster = true;
            bool productOwner = true;

            Assert.IsFalse(_sprintUserClient.InsertSprintUser(email, developer, scrumMaster, productOwner,
                            projectId, sprintId));
        }

        [TearDown]
        public void Teardown()
        {
            _sprintUserClient.Close();
        }
    }
}
