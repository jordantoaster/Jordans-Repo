using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BackEndTesting.UserStoryServiceReference;
using NUnit.Framework;

namespace BackEndTesting
{
    [TestFixture]
    public class TestEditStory
    {
        private UserStoryServiceClient _userStoryClient;
        const string testTitle = "Testing", testDescription = "Testing";
        const int testSBacklogId = 1, testPriority = 1, projectId = 1;
        const string updateTitle = "Update", updateDescription = "Update";
        const int updateStoryPoints = 2, updatePriority = 2;
        [SetUp]
        public void Setup()
        {
            _userStoryClient = new UserStoryServiceClient();
            _userStoryClient.Open();
        }

        [Test]
        public void Test_ValidUpdateUserStory()
        {
            Assert.IsTrue(_userStoryClient.InsertUserStory(testSBacklogId, testTitle, testDescription,
                            testPriority, projectId));
            int storyId = _userStoryClient.GetUserStoryId(testPriority, projectId);
            Assert.IsTrue(_userStoryClient.UpdateUserStory(storyId, updateTitle, updateDescription, updateStoryPoints,
                  updatePriority));
            _userStoryClient.DeleteUserStory(_userStoryClient.GetUserStoryId(updatePriority, projectId));
        }

        [Test]
        public void Test_InvalidStoryPoints()
        {
            Assert.IsTrue(_userStoryClient.InsertUserStory(testSBacklogId, testTitle, testDescription,
                            testPriority, projectId));
            int storyId = _userStoryClient.GetUserStoryId(testPriority, projectId);
            const int invalidStoryPoints = -10;
            Assert.IsFalse(_userStoryClient.UpdateUserStory(storyId, updateTitle, updateDescription,
                invalidStoryPoints, updatePriority));
            _userStoryClient.DeleteUserStory(_userStoryClient.GetUserStoryId(updatePriority, projectId));
        }

        [Test]
        public void Test_InvalidPriority()
        {
            Assert.IsTrue(_userStoryClient.InsertUserStory(testSBacklogId, testTitle, testDescription,
                            testPriority, projectId));
            int storyId = _userStoryClient.GetUserStoryId(testPriority, projectId);
            const int invalidPriority = 0;
            Assert.IsFalse(_userStoryClient.UpdateUserStory(storyId, updateTitle, updateDescription,
                updateStoryPoints, invalidPriority));
            _userStoryClient.DeleteUserStory(_userStoryClient.GetUserStoryId(updatePriority, projectId));
        }
    }
}
