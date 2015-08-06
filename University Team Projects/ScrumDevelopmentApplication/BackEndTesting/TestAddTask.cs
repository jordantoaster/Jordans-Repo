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
using BackEndTesting.TaskServiceReference;

namespace BackEndTesting
{
    [TestFixture]
    internal class TestAddTask
    {
        private TaskServiceClient _taskClient;

        [SetUp]
        public void Setup()
        {
            _taskClient = new TaskServiceClient();
            _taskClient.Open();
        }

        [Test]
        public void testValidTask()
        {
            string name = "Task one";
            string description = "This is a description";
            bool block = true;
            string reason = "Mark is working on it";
            int hours = 4;
            int storyId = 1;

            Assert.IsFalse(_taskClient.InsertTask(name,description,block,reason,hours, storyId));
        }

        [Test]
        public void testValidTaskTwo()
        {
            string name = "";
            string description = "";
            bool block = true;
            string reason = "";
            int hours = 400000000;
            int storyId = 10000;

            Assert.IsFalse(_taskClient.InsertTask(name, description, block, reason, hours, storyId));
        }

        [TearDown]
        public void Teardown()
        {
            _taskClient.Close();
        }
    }
}
