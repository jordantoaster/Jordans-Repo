using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Formatters;
using System.Security.Cryptography;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;
using BackEndTesting.AcceptanceTestServiceReference;
using BackEndTesting.UserStoryServiceReference;
using NUnit.Framework;
using ScrumDevelopmentServices;

namespace BackEndTesting
{
    [TestFixture]
    public class TestUserStory
    {
        private UserStoryServiceClient _userStoryClient;
       
        [SetUp]
        public void Setup()
        {
            _userStoryClient = new UserStoryServiceClient();
            _userStoryClient.Open();
        }

        [Test]
        public void Test_ValidInsertUserStory()
        {
            const string testTitle = "Testing", testDescription = "Testing";
            const int testSBacklogId = 1, testPriority = 1, projectId = 1;
            Assert.IsTrue(_userStoryClient.InsertUserStory(testSBacklogId, testTitle, testDescription,
                            testPriority, projectId));

            _userStoryClient.DeleteUserStory(_userStoryClient.GetLastUserStoryId());
        }

        [Test]
        public void Test_DeleteUserStory()
        {
            const string testTitle = "Testing", testDescription = "Testing";
            const int testPriority = 1, projectId = 1; ;
            int? sBacklogId = null;
            Assert.IsTrue(_userStoryClient.InsertUserStory(sBacklogId, testTitle, testDescription,
                            testPriority, projectId));
            _userStoryClient.DeleteUserStory(_userStoryClient.GetLastUserStoryId());
            int deletedUser = _userStoryClient.GetLastUserStoryId();
            Assert.IsFalse(_userStoryClient.DoesUserStoryExist(deletedUser));
        }

        [TearDown]
        public void Teardown()
        {
            _userStoryClient.Close();
        }
    }
}
