using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Formatters;
using System.Security.Cryptography;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;
using BackEndTesting.SprintServiceReference;
using BackEndTesting.UserStoryServiceReference;
using NUnit.Framework;
using ScrumDevelopmentServices;

namespace BackEndTesting
{
    [TestFixture]
    public class TestSprint
    {
        private SprintServiceClient _sprintClient;
        private string _name, _startDate, _endDate, _userEmail;
        private int _projectId;

        [SetUp]
        public void Setup()
        {
            _sprintClient = new SprintServiceClient();
            _sprintClient.Open();
            _name = "Sprint Test";
            _startDate = "01/01/2014";
            _endDate = "15/01/2014";
            _projectId = 3;
            _userEmail = "test@test";
        }

        [Test]
        public void Test_ValidAddSprint()
        {
            Assert.IsTrue(_sprintClient.AddSprint(_name, _startDate, _endDate, _projectId, _userEmail));
        }

        [Test]
        public void Test_InvalidProjectIdAddSprint()
        {
            Assert.IsFalse(_sprintClient.AddSprint(_name, _startDate, _endDate, -100, _userEmail));
        }

        [Test]
        public void Test_InvalidUserEmailAddSprint()
        {
            Assert.IsFalse(_sprintClient.AddSprint(_name, _startDate, _endDate, _projectId, null));
        }

        [TearDown]
        public void Teardown()
        {
            _sprintClient.Close();
        }
    }
}
