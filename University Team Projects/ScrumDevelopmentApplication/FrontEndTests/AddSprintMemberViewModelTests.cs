using System.Windows.Controls;
using FrontEndTests.Stubs;
using NUnit.Framework;
using ScrumDevelopmentApplication.ViewModel;

namespace FrontEndTests
{
    class AddSprintMemberViewModelTests
    {
        [TestFixture, RequiresSTA]
        internal class AddTeamMemberViewModelTests
        {

            [SetUp]
            public void initialiseTest()
            {
                textBox = new TextBox();
                teamMemberVm = new AddTeamMemberViewModel(new MessageBoxStub());
                scrumMaster = new CheckBox();
                productOwner = new CheckBox();
                developer = new CheckBox();
            }

            private TextBox textBox;
            private AddTeamMemberViewModel teamMemberVm;
            CheckBox scrumMaster;
            CheckBox productOwner;
            CheckBox developer;

            [Test]
            public void roleSelected_ValidData()
            {
                scrumMaster.IsChecked = true;
                productOwner.IsChecked = false;
                developer.IsChecked = false;

                bool isChecked = teamMemberVm.RoleSelected(scrumMaster, productOwner, developer);
                Assert.AreEqual(true, isChecked);
            }

            [Test]
            public void roleSelected_ValidDataTwo()
            {
                scrumMaster.IsChecked = false;
                productOwner.IsChecked = true;
                developer.IsChecked = true;

                bool isChecked = teamMemberVm.RoleSelected(scrumMaster, productOwner, developer);
                Assert.AreEqual(true, isChecked);
            }


            [Test]
            public void roleSelected_ValidDataThree()
            {
                scrumMaster.IsChecked = true;
                productOwner.IsChecked = true;
                developer.IsChecked = true;

                bool isChecked = teamMemberVm.RoleSelected(scrumMaster, productOwner, developer);
                Assert.AreEqual(true, isChecked);
            }

            [Test]
            public void roleSelected_InvalidData()
            {
                scrumMaster.IsChecked = false;
                productOwner.IsChecked = false;
                developer.IsChecked = false;

                bool isChecked = teamMemberVm.RoleSelected(scrumMaster, productOwner, developer);
                Assert.AreEqual(false, isChecked);
            }
        }
    }
}
