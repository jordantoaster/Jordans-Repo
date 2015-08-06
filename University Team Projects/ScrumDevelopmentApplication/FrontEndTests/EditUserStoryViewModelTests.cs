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
    public class EditUserStoryViewModelTests
    {
        private TextBox _asADescriptionBox, _iWantDescriptionBox, _becauseDescription, _priorityBox;
        private EditUserStoryViewModel _wizardVm;
        private int userStoryId;
        private int projectId;
        private bool opened = true;

        [SetUp]
        public void InitialiseTest()
        {
            _asADescriptionBox = new TextBox();
            _iWantDescriptionBox = new TextBox();
            _becauseDescription = new TextBox();
            _priorityBox = new TextBox();
            _wizardVm = new EditUserStoryViewModel(new MessageBoxStub(), userStoryId, opened, projectId);
        }
        [Test]
        public void EmptyFieldsTest()
        {
            Assert.IsTrue(_wizardVm.IsEmptyFields(_asADescriptionBox, _iWantDescriptionBox, _becauseDescription, _priorityBox));
        }
        [Test]
        public void NotEmptyFieldsTest()
        {
            _asADescriptionBox.Text = "Description";
            _iWantDescriptionBox.Text = "Example";
            _becauseDescription.Text = "Random";
            _priorityBox.Text = "1";
            Assert.IsFalse(_wizardVm.IsEmptyFields(_asADescriptionBox, _iWantDescriptionBox, _becauseDescription, _priorityBox));
        }
      
        [Test]
        public void ValidPriority()
        {
            _priorityBox.Text = "12";
            Assert.IsFalse(_wizardVm.IsPriorityInValid(_priorityBox));
        }

        [Test]
        public void InvalidPriority()
        {
            _priorityBox.Text = "1 34";
            Assert.IsTrue(_wizardVm.IsPriorityInValid(_priorityBox));
        }
    }
}
