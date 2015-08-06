using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ScrumDevelopmentApplication;
using NUnit.Framework;
using ScrumDevelopmentApplication.View;
using Assert = NUnit.Framework.Assert;

namespace ScrumDevelopmentApplicationUnitTests
{
    [TestClass]
    public class RegisterTests
    {
        [Test]
        public void pageOpens()
        {
            var register = new RegistrationPage();
            Assert.True(register.IsLoaded);
        }
    }
}
