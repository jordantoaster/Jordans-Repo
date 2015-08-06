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
    public class EditDetailsViewModelTests
    {
        private TextBox _nameBox;
        private PasswordBox _oldPasswordBox, _newPasswordBox, _confirmPasswordBox;
        private bool _productOwner, _scrumMaster, _developer;
        private EditDetailsViewModel _editDetails;

        [SetUp]
        public void SetUpVariables()
        {
            _editDetails = new EditDetailsViewModel(null, true, new MessageBoxStub());
            _productOwner = false;
            _scrumMaster = false;
            _developer = false;

        }

        [Test]
        public void RoleNotSelectedTest()
        {
            Assert.IsFalse(_editDetails.IsRoleSelected(_productOwner, _scrumMaster, _developer));
        }

        [TearDown]
        public void TearDownVariables()
        {
            _editDetails = null;
        }

        [Test]
        public void RoleSelectedTest()
        {
            _editDetails = new EditDetailsViewModel(null, true, new MessageBoxStub());
            _productOwner = true;
            _scrumMaster = true;
            _developer = true;
            Assert.IsTrue(_editDetails.IsRoleSelected(_productOwner, _scrumMaster, _developer));
        }

        [Test]
        public void EmptyFieldsTest()
        {
            _editDetails = new EditDetailsViewModel(null, true, new MessageBoxStub());
            _nameBox = new TextBox();
            _oldPasswordBox = new PasswordBox();
            _newPasswordBox = new PasswordBox();
            _confirmPasswordBox = new PasswordBox();
            Assert.IsTrue(_editDetails.IsOldPasswordEmpty(_oldPasswordBox) && _editDetails.IsNewPasswordEmpty
                (_newPasswordBox, _confirmPasswordBox) && _editDetails.IsNameEmpty(_nameBox));
        }

        [Test]
        public void NotEmptyFieldsTest()
        {
            _editDetails = new EditDetailsViewModel(null, true, new MessageBoxStub());
            _oldPasswordBox.Password = "I have Text";
            _newPasswordBox.Password = "I have Text";
            _confirmPasswordBox.Password = "I have Text";
            _nameBox.Text = "I have Text";
            Assert.IsFalse(_editDetails.IsOldPasswordEmpty(_oldPasswordBox) && _editDetails.IsNewPasswordEmpty
                (_newPasswordBox, _confirmPasswordBox) && _editDetails.IsNameEmpty(_nameBox));
        }

        [Test]
        public void PasswordFieldsDontMatchTest()
        {
            _editDetails = new EditDetailsViewModel(null, true, new MessageBoxStub());
            _newPasswordBox.Password = "password";
            _confirmPasswordBox.Password = "passwor";
            Assert.IsFalse(_editDetails.IsPasswordValid(_newPasswordBox, _confirmPasswordBox));
        }

        [Test]
        public void PasswordFieldsMatchTest()
        {
            _editDetails = new EditDetailsViewModel(null, true, new MessageBoxStub());
            _newPasswordBox.Password = "password";
            _confirmPasswordBox.Password = "password";
            Assert.IsTrue(_editDetails.IsPasswordValid(_newPasswordBox, _confirmPasswordBox));
        }

        [Test]
        public void PasswordFieldsTooSmall()
        {
            _editDetails = new EditDetailsViewModel(null, true, new MessageBoxStub());
            _newPasswordBox.Password = "small";
            _confirmPasswordBox.Password = "small";
            Assert.IsFalse(_editDetails.IsPasswordValid(_newPasswordBox, _confirmPasswordBox));
        }

        [Test]
        public void PasswordFieldsNotTooSmall()
        {
            _editDetails = new EditDetailsViewModel(null, true, new MessageBoxStub());
            _newPasswordBox.Password = "nottoosmall";
            _confirmPasswordBox.Password = "nottoosmall";
            Assert.IsTrue(_editDetails.IsPasswordValid(_newPasswordBox, _confirmPasswordBox));
        }
    }
}
