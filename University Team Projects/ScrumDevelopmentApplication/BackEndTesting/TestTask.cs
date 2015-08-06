using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Formatters;
using System.Security.Cryptography;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;
using BackEndTesting.SprintServiceReference;
using BackEndTesting.TaskServiceReference;
using BackEndTesting.UserStoryServiceReference;
using NUnit.Framework;
using ScrumDevelopmentServices;

namespace BackEndTesting
{
    [TestFixture]
    public class TestTask
    {
        private TaskServiceClient _taskClient;
        private string _name, _description, _userEmail;
        private int _userStoryId, _id;
        private bool? _blocked;
        private string _reason;
        private int _hours;

        [SetUp]
        public void Setup()
        {
            _taskClient = new TaskServiceClient();
            _taskClient.Open();
            _name = "Task Test";
            _description = "TaskDescription";
            _userEmail = "test@test";
            _userStoryId = 2;
            _id = 23;
            _blocked = true;
            _reason = "Mark working on it";
            _hours = 3;
        }

        [Test]
        public void Test_ValidInsertTask()
        {
            bool result = _taskClient.InsertTask(_name, _description, _blocked, _reason, _hours, _userStoryId);
            _taskClient.DeleteTask(_taskClient.GetLastTaskId());
            Assert.IsTrue(result);

        }

        [Test]
        public void Test_InvalidUserStoryIdInsertTask()
        {
            Assert.IsFalse(_taskClient.InsertTask(_name, _description, _blocked, _reason, _hours, -100));
        }

        [Test]
        public void Test_ValidEditTask()
        {
            Assert.IsTrue(_taskClient.EditTask(_id, _name, _description, _hours, _blocked, _reason));
        }

        [Test]
        public void Test_InvalidIdEditTask()
        {
            Assert.IsFalse(_taskClient.EditTask(-100, _name, _description, _hours, _blocked, _reason));
        }

        [Test]
        public void Test_ValidDeleteTask()
        {
            _taskClient.InsertTask(_name, _description, _blocked, _reason, _hours, _userStoryId);
            int id = _taskClient.GetLastTaskId();
            bool result = _taskClient.DeleteTask(id);
            Assert.IsTrue(result);
        }

        [Test]
        public void Test_InvalidIdDeleteTask()
        {
            Assert.IsFalse(_taskClient.DeleteTask(-100));
        }

        [Test]
        public void Test_ValidAssignTask()
        {
            Assert.IsTrue(_taskClient.AssignTask(_id,_userEmail));
        }

        [Test]
        public void Test_InvalidIdAssignTask()
        {
            Assert.IsFalse(_taskClient.AssignTask(-100, _userEmail));
        }

        [Test]
        public void Test_InvalidUserEmailAssignTask()
        {
            Assert.IsFalse(_taskClient.AssignTask(_id, "null"));
        }

        [TearDown]
        public void Teardown()
        {
            _taskClient.Close();
        }
    }
}
