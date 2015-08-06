using System.Windows.Controls;
using FrontEndTests.Stubs;
using NUnit.Framework;
using ScrumDevelopmentApplication.ViewModel;

namespace FrontEndTests
{
    [TestFixture, RequiresSTA]
    public class ProjectWizardViewModelTests
    {
        private TextBox _nameBox;
        private TextBox _descriptionBox;
        private string _startDateBox;
        private ProjectWizardViewModel _wizardVm;
        
        [SetUp]
        public void InitialiseTest()
        {
            _nameBox = new TextBox();
            _descriptionBox = new TextBox();
            _wizardVm = new ProjectWizardViewModel(new MessageBoxStub());
        }
        [Test]
        public void EmptyFieldsTest()
        {
            _startDateBox = "";
            Assert.IsTrue(_wizardVm.IsEmptyFields(_nameBox, _descriptionBox, _startDateBox));
        }

        [Test]
        public void NotEmptyFieldsTest()
        {
            _nameBox.Text = "Project Name";
            _descriptionBox.Text = "Description";
            _startDateBox = "10/10/2010";
            Assert.IsFalse(_wizardVm.IsEmptyFields(_nameBox, _descriptionBox, _startDateBox));
        }

        [Test]
        public void ProjectNameLengthValid()
        {
            _nameBox.Text = "Test Project";
            Assert.IsTrue(_wizardVm.IsProjectNameLengthValid(_nameBox));
        }

        [Test]
        public void ProjectNameLengthInvalid()
        {
            _nameBox.Text = "T";
            Assert.IsFalse(_wizardVm.IsProjectNameLengthValid(_nameBox));
        }

        [Test]
        public void ProjectNameEmpty()
        {
            _nameBox.Text = "";
            Assert.IsTrue(_wizardVm.IsProjectNameEmpty(_nameBox));
        }

        [Test]
        public void DescriptionEmpty()
        {
            _descriptionBox.Text = "";
            Assert.IsTrue(_wizardVm.IsDescriptionEmpty(_descriptionBox));
        }

        [Test]
        public void DescriptionNotEmpty()
        {
            _descriptionBox.Text = "Test description";
            Assert.IsFalse(_wizardVm.IsDescriptionEmpty(_descriptionBox));
        }

    }
}
