using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;
using BackEndTesting.ProjectServiceReference;
using NUnit.Framework;
using ScrumDevelopmentServices;

namespace BackEndTesting
{
    [TestFixture]
    public class TestProject
    {
        private ProjectServiceClient _projectClient;

        [SetUp]
        public void Setup()
        {
            _projectClient = new ProjectServiceClient();
            _projectClient.Open();
        }

        [Test]
        public void Test_ValidInsertProject()
        {
            _projectClient.DeleteProject("sganley01@qub.ac.uk", 1);
            Assert.IsTrue(_projectClient.InsertProject("TestProject", "sganley01@qub.ac.uk", "This is a test project", "11/11/11"));
            _projectClient.DeleteProject("sganley01@qub.ac.uk", 1);
        }

        [TearDown]
        public void Teardown()
        {
            _projectClient.Close();
        }
    }
}
