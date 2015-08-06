using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;
using BackEndTesting.UserServiceReference;
using NUnit.Framework;
using ScrumDevelopmentServices;

namespace BackEndTesting
{
    [TestFixture]
    public class TestLogin
    {
        private string _email,
            _password,
            _isUserAuthenticated,
            _usernameErrorMessage,
            _passwordErrorMessage,
            _errorWithSystem,
            _bio;
        private UserServiceClient _userClient;

        [SetUp]
        public void Setup()
        {
            _email = "test@email.com";
            _password = "password1";
            _bio = "bio";
            _usernameErrorMessage = "Username incorrect";
            _passwordErrorMessage = "Password incorrect";
            _errorWithSystem = "Sorry, there's been an error in our system please try back in a few minutes.";
            _userClient = new UserServiceClient();
            _userClient.Open();
        }

        [Test]
        public void Test_CorrectCreditentialsLogin()
        {
            _userClient.DeleteUser(_email);
            _userClient.InsertUser(_email, "name", _password, true, true, true, _bio);
            _isUserAuthenticated = _userClient.AuthenticatedLogin(_email, _password);
            _userClient.DeleteUser(_email);
            Assert.AreEqual("valid", _isUserAuthenticated);
        }

        [Test]
        public void Test_NullCreditentials()
        {
            _isUserAuthenticated = _userClient.AuthenticatedLogin(null, null);
            Assert.AreEqual(_errorWithSystem, _isUserAuthenticated);
        }

        [Test]
        public void Test_ValidEmail_NullPassword()
        {
            _isUserAuthenticated = _userClient.AuthenticatedLogin(_email, null);
            Assert.AreEqual(_passwordErrorMessage, _isUserAuthenticated);
        }

        [Test]
        public void Test_ValidEmail_WrongPassword()
        {
            _userClient.InsertUser(_email, "name", _password, true, true, true, _bio);
            const string falsePassword = "falsePassword";
            _isUserAuthenticated = _userClient.AuthenticatedLogin(_email, falsePassword);
            _userClient.DeleteUser(_email);
            Assert.AreEqual(_passwordErrorMessage, _isUserAuthenticated);
        }

        [Test]
        public void Test_Encryption()
        {
            const string testPassword = "password1";
            string encrypted = Security.Encrypt(testPassword);
            string decrypted = Security.Decrypt(encrypted);
            Assert.AreEqual(testPassword, decrypted);
        }

        [TearDown]
        public void Teardown()
        {
            _userClient.Close();
        }
    }
}
