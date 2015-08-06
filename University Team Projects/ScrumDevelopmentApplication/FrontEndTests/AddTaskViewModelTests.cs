using System.Windows.Controls;
using FrontEndTests.Stubs;
using NUnit.Framework;
using ScrumDevelopmentApplication.ViewModel;
using ScrumDevelopmentApplication.Helpers;

namespace FrontEndTests
{
    [TestFixture, RequiresSTA]
    internal class AddTaskViewModelTests
    {
        AddSprintViewModel _model;

        [SetUp]
        public void InitialiseTest()
        {
           //_model = new AddSprintViewModel(new MessageBoxStub());
        }
    }
}
