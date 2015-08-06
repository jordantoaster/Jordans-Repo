using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using FrontEndTests.Stubs;
using NUnit.Framework;
using ScrumDevelopmentApplication.ViewModel;

namespace FrontEndTests
{
    [TestFixture, RequiresSTA]
    class AddTasksViewModelTests
    {
        private AddTaskViewModel _wizard;
        private TextBox _taskBox, _desBox, _blockedBox, _hoursBox;
        private CheckBox _blockedCheckBox;

        [SetUp]
        public void InitialiseTest()
        {
            _taskBox = new TextBox();
            _desBox = new TextBox();
            _blockedBox = new TextBox();
            _blockedCheckBox = new CheckBox();
            _hoursBox = new TextBox();
            _wizard = new AddTaskViewModel(new MessageBoxStub());
        }

        [TearDown]
        public void TearDownVariables()
        {
            _wizard = null;
        }

        [Test]
        public void EmptyFieldsTest()
        {
            _taskBox.Text = ""; 
            _desBox.Text = "";
           Assert.IsFalse(_wizard.AreFieldsEmpty(_taskBox, _desBox));
        }

        [Test]
        public void OneEmptyFieldTest()
        {
            _taskBox.Text = "";
            _desBox.Text = "Description";
            Assert.IsFalse(_wizard.AreFieldsEmpty(_taskBox, _desBox));
        }

        [Test]
        public void CompletedFieldTest()
        {
            _taskBox.Text = "Task";
            _desBox.Text = "Description";
            Assert.IsTrue(_wizard.AreFieldsEmpty(_taskBox, _desBox));
        }

        [Test]
        public void EmptyHoursFieldTest()
        {
            _hoursBox.Text = "";
            Assert.IsFalse(_wizard.ValidHours(_hoursBox));
        }

        [Test]
        public void NonIntHoursFieldTest()
        {
            _hoursBox.Text = "Test";
            Assert.IsFalse(_wizard.ValidHours(_hoursBox));
        }

        [Test]
        public void ZeroHoursFieldTest()
        {
            _hoursBox.Text = "0";
            Assert.IsFalse(_wizard.ValidHours(_hoursBox));
        }

        [Test]
        public void CorrectHoursFieldTest()
        {
            _hoursBox.Text = "5";
            Assert.IsTrue(_wizard.ValidHours(_hoursBox));
        }

        [Test]
        public void BlockedWithNoReasonTest()
        {
            _blockedCheckBox.IsChecked = true;
            _blockedBox.Text = "";
            Assert.IsFalse(_wizard.TaskBlockedStatusOk(_blockedCheckBox, _blockedBox));
        }

        [Test]
        public void BlockedWithReasonTest()
        {
            _blockedCheckBox.IsChecked = true;
            _blockedBox.Text = "Test Reason";
            Assert.IsTrue(_wizard.TaskBlockedStatusOk(_blockedCheckBox, _blockedBox));
        }
    }
}
