using System.Windows.Controls;
using FrontEndTests.Stubs;
using NUnit.Framework;
using ScrumDevelopmentApplication.ViewModel;

namespace FrontEndTests
{
    [TestFixture, RequiresSTA]
    public class RegisterViewModelTests
    {
        private bool _projectOwner, _scrumMaster, _developer;
        private ListBox _roles;
        private TextBox _emailBox, _nameBox, _bio;
        private PasswordBox _passwordBox, _confirmPasswordBox;
        private RegisterViewModel _register;

        [SetUp]
        public void SetUpVariables()
        {
            _emailBox = new TextBox();
            _nameBox = new TextBox();
            _passwordBox = new PasswordBox();
            _confirmPasswordBox = new PasswordBox();
            _roles = new ListBox();
            _bio = new TextBox();
            _register = new RegisterViewModel(null, true, new MessageBoxStub());
            _projectOwner = false;
            _scrumMaster = false;
            _developer = false;
            _roles = new ListBox();
        }

        [TearDown]
        public void TearDownVariables()
        {
            _register = null;
            _roles = null;
        }

        [Test]
        public void EmptyFieldsTest()
        {
            _register = new RegisterViewModel(null, true, new MessageBoxStub());
            _emailBox = new TextBox();
            _nameBox = new TextBox();
            _passwordBox = new PasswordBox();
            _confirmPasswordBox = new PasswordBox();
            _roles = new ListBox();
            _bio = new TextBox();
            Assert.IsTrue(_register.IsEmptyFields(_emailBox, _nameBox, _passwordBox, _confirmPasswordBox,_bio));
        }

        [Test]
        public void NotEmptyFieldsTest()
        {
            _register = new RegisterViewModel(null, true, new MessageBoxStub());
            _emailBox.Text = "I have Text";
            _nameBox.Text = "I have Text";
            _passwordBox.Password = "I have Text";
            _confirmPasswordBox.Password = "I have Text";
            _bio.Text = "I have Text";
            _roles = new ListBox();
            Assert.IsFalse(_register.IsEmptyFields(_emailBox, _nameBox, _passwordBox, _confirmPasswordBox,_bio));
        }

        [Test]
        public void NotValidEmailTest()
        {
            _register = new RegisterViewModel(null, true, new MessageBoxStub());
            _emailBox.Text = "Not a valid email";
            Assert.IsFalse(_register.IsEmailValid(_emailBox));
        }

        [Test]
        public void ValidEmailTest()
        {
            _register = new RegisterViewModel(null, true, new MessageBoxStub());
            _emailBox.Text = "Iam@validemail.com";
            Assert.IsTrue(_register.IsEmailValid(_emailBox));
        }

        [Test]
        public void PasswordFieldsDontMatchTest()
        {
            _register = new RegisterViewModel(null, true, new MessageBoxStub());
            _passwordBox.Password = "password";
            _confirmPasswordBox.Password = "passwor";
            Assert.IsFalse(_register.IsPasswordValid(_passwordBox, _confirmPasswordBox));
        }

        [Test]
        public void PasswordFieldsMatchTest()
        {
            _register = new RegisterViewModel(null, true, new MessageBoxStub());
            _passwordBox.Password = "password";
            _confirmPasswordBox.Password = "password";
            Assert.IsTrue(_register.IsPasswordValid(_passwordBox, _confirmPasswordBox));
        }

        [Test]
        public void PasswordFieldsTooSmall()
        {
            _register = new RegisterViewModel(null, true, new MessageBoxStub());
            _passwordBox.Password = "small";
            _confirmPasswordBox.Password = "small";
            Assert.IsFalse(_register.IsPasswordValid(_passwordBox, _confirmPasswordBox));
        }

        [Test]
        public void PasswordFieldsNotTooSmall()
        {
            _register = new RegisterViewModel(null, true, new MessageBoxStub());
            _passwordBox.Password = "nottoosmall";
            _confirmPasswordBox.Password = "nottoosmall";
            Assert.IsTrue(_register.IsPasswordValid(_passwordBox, _confirmPasswordBox));
        }
    }
}