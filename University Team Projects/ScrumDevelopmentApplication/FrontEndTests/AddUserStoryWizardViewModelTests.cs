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
    public class AddUserStoryWizardViewModelTests
    {
        private TextBox _asADescriptionBox, _iWantDescriptionBox, _becauseDescription;
        private AddUserStoryViewModel _wizardVm;

        [SetUp]
        public void InitialiseTest()
        {
            _asADescriptionBox = new TextBox();
            _iWantDescriptionBox = new TextBox();
            _becauseDescription = new TextBox();
            _wizardVm = new AddUserStoryViewModel(new MessageBoxStub(), new ListBox());
        }
        [Test]
        public void EmptyFieldsTest()
        {
            _asADescriptionBox = new TextBox();
            Assert.IsTrue(_wizardVm.IsEmptyFields( _asADescriptionBox, _iWantDescriptionBox, _becauseDescription));
        }
        [Test]
        public void NotEmptyFieldsTest()
        {
            _asADescriptionBox.Text = "Des";
            _iWantDescriptionBox.Text = "Des2";
            _becauseDescription.Text = "Des3";
            Assert.IsFalse(_wizardVm.IsEmptyFields( _asADescriptionBox, _iWantDescriptionBox, _becauseDescription));
        }
    }
}

