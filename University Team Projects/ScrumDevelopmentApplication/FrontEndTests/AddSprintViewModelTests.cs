using System.Windows.Controls;
using FrontEndTests.Stubs;
using NUnit.Framework;
using ScrumDevelopmentApplication.ViewModel;

namespace FrontEndTests
{
    [TestFixture, RequiresSTA]
    internal class AddSprintViewModelTests
    {
        [SetUp]
        public void InitialiseTest()
        {
            _model = new AddSprintViewModel(new MessageBoxStub(), new ListBox());
        }

        private AddSprintViewModel _model;


        [Test]
        public void CheckIfFieldsValid_ValidData()
        {
            const string sprintName = "Valid Name";
            const string sprintStart = "26/11/2014";
            const string sprintEnd = "25/12/2014";

            Assert.IsTrue(_model.CheckIfFieldsValid(sprintName, sprintStart, sprintEnd));
        }

        [Test]
        public void CheckIfFieldsValid_InvalidData()
        {
            const string sprintName = "";
            const string sprintStart = "26/11/2014";
            const string sprintEnd = "";

            Assert.IsFalse(_model.CheckIfFieldsValid(sprintName, sprintStart, sprintEnd));
        }

        [Test]
        public void CheckStartDateBeforeEndDate_TrueData()
        {
            const string sprintStart = "26/11/2014";
            const string sprintEnd = "25/12/2014";

            Assert.IsTrue(_model.CheckStartDateBeforeEndDate(sprintStart, sprintEnd));
        }

        [Test]
        public void CheckStartDateBeforeEndDate_FalseData()
        {
            const string sprintStart = "26/11/2014";
            const string sprintEnd = "25/11/2014";

            Assert.IsFalse(_model.CheckStartDateBeforeEndDate(sprintStart, sprintEnd));
        }

        [Test]
        public void IsStringDateAfter_TrueData()
        {
            const string date1 = "26/11/2014";
            const string date2 = "25/12/2009";

            Assert.IsTrue(_model.IsStringDateAfter(date1, date2));
        }

        [Test]
        public void IsStringDateAfter_FalseData()
        {
            const string date1 = "26/11/2014";
            const string date2 = "25/11/2020";

            Assert.IsFalse(_model.IsStringDateAfter(date1, date2));
        }
    
    }
}