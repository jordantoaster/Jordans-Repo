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
    class SprintStoryViewModelTests
    {
        private Button _editButton, _deleteButton;
        private SprintStoryViewModel _model;
        [SetUp]
        public void SetUpVariables()
        {
            _model = new SprintStoryViewModel(new MessageBoxStub());
            _editButton = new Button();
            _deleteButton = new Button();
            _editButton.IsEnabled = false;
            _deleteButton.IsEnabled = false;
        }

        [Test]
        public void ButtonsEnableTest()
        {
            _model.EnableButtons(_editButton, _deleteButton);
            Assert.IsTrue(_editButton.IsEnabled);
            Assert.IsTrue(_deleteButton.IsEnabled);
        }

        public void ButtonsDisableTest()
        {
            _model.DisableButtons(_editButton, _deleteButton);
            Assert.IsFalse(_editButton.IsEnabled);
            Assert.IsFalse(_deleteButton.IsEnabled);
        }

        [TearDown]
        public void TearDownVariables()
        {
            _model = null;
            _editButton = null;
            _deleteButton = null;
        }
    }
}
