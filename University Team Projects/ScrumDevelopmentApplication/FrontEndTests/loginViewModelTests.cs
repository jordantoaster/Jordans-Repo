using System.Windows.Controls;
using FrontEndTests.Stubs;
using NUnit.Framework;
using ScrumDevelopmentApplication.ViewModel;

namespace FrontEndTests
{
    [TestFixture, RequiresSTA]
    internal class Logintest
    {
        [SetUp]
        public void initialiseTest()
        {
            textBox = new TextBox();
            passwordBox = new PasswordBox();
            checkBox = new CheckBox();
            page = new Page();
            loginVm = new LoginViewModel(textBox, passwordBox, checkBox, page, new MessageBoxStub());
        }

        private TextBox textBox;
        private PasswordBox passwordBox;
        private CheckBox checkBox;
        private Page page;
        private LoginViewModel loginVm;

        [Test]
        public void Test_IsEmptyFields_InvalidData()
        {
            textBox.Text = "";
            passwordBox.Password = "";

            bool isEmpty = loginVm.IsEmptyFields(textBox, passwordBox);
            Assert.AreEqual(true, isEmpty);
        }

        [Test]
        public void Test_ValidLogin_InvalidData_ShortPassword()
        {
            textBox.Text = "jordan@gmail.com";
            passwordBox.Password = "jord2";

            bool validLogin = loginVm.ValidLogin(textBox, passwordBox);
            Assert.AreEqual(false, validLogin);
        }

        [Test]
        public void Test_ValidLogin_InvalidData_ShortEmail()
        {
            textBox.Text = "j@";
            passwordBox.Password = "jord2an123";

            bool validLogin = loginVm.ValidLogin(textBox, passwordBox);
            Assert.AreEqual(false, validLogin);
        }

        [Test]
        public void Test_IsEmptyFields_ValidData()
        {
            textBox.Text = "jordan@gmail.com";
            passwordBox.Password = "jordan123";

            bool isEmpty = loginVm.IsEmptyFields(textBox, passwordBox);
            Assert.AreEqual(false, isEmpty);
        }

        [Test]
        public void Test_Validlogin_InvalidData()
        {
            textBox.Text = "";
            passwordBox.Password = "";

            bool validLogin = loginVm.ValidLogin(textBox, passwordBox);
            Assert.AreEqual(false, validLogin);
        }

        [Test]
        public void Test_Validlogin_ValidData()
        {
            textBox.Text = "jordan@ymail.com";
            passwordBox.Password = "jordan321";

            bool validLogin = loginVm.ValidLogin(textBox, passwordBox);
            Assert.AreEqual(true, validLogin);
        }

        [Test]
        public void Test_isEmailValid_InvalidData()
        {
            textBox.Text = "";

            bool isEmailValid = loginVm.isEmailValid(textBox);
            Assert.AreEqual(false, isEmailValid);
        }

        public void Test_isEmailValid_InvalidData_ShortEmail()
        {
            textBox.Text = "j@";

            bool isEmailValid = loginVm.isEmailValid(textBox);
            Assert.AreEqual(false, isEmailValid);
        }

        [Test]
        public void Test_isEmailValid_ValidData()
        {
            textBox.Text = "jordan@gmail.com";

            bool isEmailValid = loginVm.isEmailValid(textBox);
            Assert.AreEqual(true, isEmailValid);
        }

        [Test]
        public void Test_isPasswordValid_InvalidData()
        {
            passwordBox.Password = "abcdef";

            bool isPasswordValid = loginVm.isPasswordValid(passwordBox);
            Assert.AreEqual(false, isPasswordValid);
        }

        [Test]
        public void Test_isPasswordValid_ValidData()
        {
            passwordBox.Password = "jordan12345";

            bool isPasswordValid = loginVm.isPasswordValid(passwordBox);
            Assert.AreEqual(true, isPasswordValid);
        }
    }
}