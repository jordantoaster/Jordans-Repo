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
    class EditTaskViewModelTests
    {
        private Button _editButton, _deleteButton;
        private EditTaskViewModel _model;
        [SetUp]
        public void SetUpVariables()
        {
            _model = new EditTaskViewModel(new MessageBoxStub());
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

        [TearDown]
        public void TearDownVariables()
        {
            _model = null;
            _editButton = null;
            _deleteButton = null;
        }
    }
}
