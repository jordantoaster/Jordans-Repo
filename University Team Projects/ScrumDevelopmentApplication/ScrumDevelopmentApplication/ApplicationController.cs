using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.View;
using ScrumDevelopmentApplication.View.Wizards;

namespace ScrumDevelopmentApplication
{
    class ApplicationController
    {
        static ApplicationController _instance;
        public static ApplicationController GetInstance()
        {
            return _instance ?? (_instance = new ApplicationController());
        }

        Border _stage;

        private ApplicationController() { }

        public void GoToPage(ApplicationPage newPage, Page previousPage, string sParam = "", int sParamTwo = 0, object oParam = null, int iParam = 0)
        {
             var p1 = new Page();
            switch (newPage)
            {
                case ApplicationPage.LoginPage:
                    p1 = new LoginPage();
                    break;
                case ApplicationPage.RegistrationPage:
                    p1 = new RegistrationPage();
                    break;
                case ApplicationPage.UserDashboard:
                    p1 = new UserDashboard();
                    break;
                case ApplicationPage.EditDetails:
                    p1 = new EditDetails();
                    break;
                case ApplicationPage.ProjectDashboard:
                    p1 = new ProjectDashboard(sParam);
                    break;
                case ApplicationPage.ProductBacklogPage:
                    p1 = new ProductBacklogPage(sParam);
                    break;
                case ApplicationPage.SprintDashboard:
                    p1 = new SprintDashboard(sParam, sParamTwo);
                    break;
                case ApplicationPage.SprintStory:
                    p1 = new SprintStory(sParam, sParamTwo, iParam);
                    break;
            }
             previousPage.NavigationService.Navigate(p1);
        }

        public void GoToWindowWithListBox(Windows newWindow, string parameter, ListBox listBox, Button button = null, string parameter2 = "", string parameter3 = "")
        {
            switch (newWindow)
            {
                case Windows.ProjectWizard:
                    new ProjectWizard(listBox).Show();
                    break;
                case Windows.AddTeamMemberWizard:
                    Window addTeam = new AddTeamMemberWizard(parameter, listBox, button);
                    addTeam.Show();
                    break;
                case Windows.AddUserStoryWizard:
                    new AddUserStory(parameter, listBox).Show();
                    break;
                case Windows.AddAcceptanceTest:
                    new AddAcceptanceTest(parameter, listBox).Show();
                    break;
                case Windows.NewSprintWizard:
                    new NewSprintWizard(parameter, listBox).Show();
                    break;
                case Windows.AddSprintMemberWizard:
                    new AddSprintMemberWizard(parameter, parameter2, listBox).Show();
                    break;
                case Windows.AddSprintStoryWizard:
                    new AddSprintStoryWizard(parameter, parameter2, listBox).Show();
                    break;
                case Windows.AddTaskWizard:
                    new AddTaskWizard(parameter, listBox).Show();
                    break;
                case Windows.AssignOwnershipWizard:
                    new AssignOwnershipWizard(parameter, parameter2, parameter3, listBox).Show();
                    break;
                case Windows.EditUserStoryWizard:
                    new EditUserStoryWizard(Convert.ToInt32(parameter), Convert.ToInt32(parameter2), listBox).Show();
                    break;
             
            }
        }

        public void GoToWindow(Windows newWindow, string parameter, Window editUserStoryWindow = null, string parameterTwo = null)
        {
            switch (newWindow)
            {
                case Windows.EditTasksWizard:
                    new EditTasksWizard(parameter).Show();
                    break;

            }
            if (editUserStoryWindow != null)
            {
                editUserStoryWindow.Show();
            }

        }

        public void SetStage(Border Stage)
        {
            _stage = Stage;
        }
    }
}
