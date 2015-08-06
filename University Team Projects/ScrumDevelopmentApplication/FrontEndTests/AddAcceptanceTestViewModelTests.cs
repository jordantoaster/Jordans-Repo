using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using FrontEndTests.Stubs;
using NUnit.Framework;
using ScrumDevelopmentApplication.ViewModel;


namespace FrontEndTests
{
    [TestFixture, RequiresSTA]
    class AddAcceptanceTestViewModelTests
    {
        private TextBox _acceptanceTestTitleBox, _givenDescriptionBox, _whenDescriptionBox, _thenDescriptionBox;
        private AddAcceptanceTestViewModel _wizardVm;
        
        [SetUp]
        public void InitialiseTest()
        {
            _acceptanceTestTitleBox = new TextBox();
            _givenDescriptionBox = new TextBox();
            _whenDescriptionBox = new TextBox();
            _thenDescriptionBox = new TextBox();
            _wizardVm = new AddAcceptanceTestViewModel(new MessageBoxStub());
        }

        [Test]
        public void EmptyFieldsTest()
        {
            _acceptanceTestTitleBox.Text = "";
            _givenDescriptionBox.Text = "";
            _whenDescriptionBox.Text = "";
            _thenDescriptionBox.Text = "";
            Assert.IsTrue(_wizardVm.IsEmptyFieldsAcceptanceTest(_acceptanceTestTitleBox, _givenDescriptionBox, _whenDescriptionBox, _thenDescriptionBox));
        }
        [Test]
        public void OneEmptyFieldsTest()
        {
            _acceptanceTestTitleBox.Text = "Title";
            _givenDescriptionBox.Text = "Description";
            _whenDescriptionBox.Text = "";
            _thenDescriptionBox.Text = "Description2";
            Assert.IsTrue(_wizardVm.IsEmptyFieldsAcceptanceTest(_acceptanceTestTitleBox, _givenDescriptionBox, _whenDescriptionBox, _thenDescriptionBox));
        }

        [Test]
        public void CorrectFieldsTest()
        {
            _acceptanceTestTitleBox.Text = "Description0";
            _givenDescriptionBox.Text = "Description1";
            _whenDescriptionBox.Text = "Description2";
            _thenDescriptionBox.Text = "Description3";
            Assert.IsFalse(_wizardVm.IsEmptyFieldsAcceptanceTest(_acceptanceTestTitleBox, _givenDescriptionBox, _whenDescriptionBox, _thenDescriptionBox));
        }
    }
}
