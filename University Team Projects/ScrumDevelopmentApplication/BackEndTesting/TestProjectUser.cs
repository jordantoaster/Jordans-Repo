using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;
using BackEndTesting.UserServiceReference;
using BackEndTesting.UserStoryServiceReference;
using NUnit.Framework;
using ScrumDevelopmentServices;
using BackEndTesting.ProjectUserServiceReference;
using BackEndTesting.ProjectServiceReference;

namespace BackEndTesting
{
    [TestFixture]
    public class TestProjectUser
    {
        string _email = "test@test.com";
        bool _scrumMaster;
        bool _productOwner;
        bool _developer;
        string _projectName = "test";
        string _projectDescription = "test";

        private ProjectUserServiceClient _projectUserClient;
        private int _projectId = 1;

        [SetUp]
        public void Setup()
        {
            _projectUserClient = new ProjectUserServiceClient();
            _projectUserClient.Open();
        }

        [Test]
        public void Test_EmptyEmail()
        {
            _productOwner = false;
            _scrumMaster = true;

            bool isInserted = _projectUserClient.InsertProjectUser(null, _scrumMaster, _productOwner, _developer, _projectId);
            Assert.AreEqual(false, isInserted);
        }

        [Test]
        public void Test_EmptyProjectId()
        {
            _productOwner = false;
            _scrumMaster = true;

            bool isInserted = _projectUserClient.InsertProjectUser(_email, _scrumMaster, _productOwner, _developer, -100);
            Assert.AreEqual(false, isInserted);
        }

        [Test]
        public void Test_ValidDetails()
        {
            _productOwner = true;
            _scrumMaster = true;
            _projectUserClient.DeleteProjectUser(_email, _projectId, "ProductOwner");
            _projectUserClient.DeleteProjectUser(_email, _projectId, "ScrumMaster");
            _projectUserClient.DeleteProjectUser(_email, _projectId, "Developer");
            Assert.IsTrue(_projectUserClient.InsertProjectUser(_email, _scrumMaster, _productOwner, _developer, _projectId));
            _projectUserClient.DeleteProjectUser(_email, _projectId, "ProductOwner");
            _projectUserClient.DeleteProjectUser(_email, _projectId, "ScrumMaster");
            _projectUserClient.DeleteProjectUser(_email, _projectId, "Developer");
        }

        [TearDown]
        public void Teardown()
        {
            _projectUserClient.Close();
        }
    }
}
