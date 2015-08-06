using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.ProjectUserServiceReference;

namespace ScrumDevelopmentApplication.ViewModel
{
    class UserDashboardViewModel
    {
        private IDialogService dialogService;
        public UserDashboardViewModel(bool opened, IDialogService dialogService, Page loginPage = null)
        {
            this.dialogService = dialogService;
            if (!opened) ApplicationController.GetInstance().GoToPage(Model.ApplicationPage.UserDashboard, loginPage);  
        }

        /// <summary>
        /// Retrieves an array of projects from the database, and returns the data to the view
        /// </summary>
        public void PopulateProjects(ListBox projects)
        {
            string[] projectList = ProjectWizardModel.GetAssociatedProjects();

            if (projectList != null)
            {
                foreach (var p in projectList)
                {
                    if (!projects.Items.Contains(p))
                        projects.Items.Add(p);//(p.id+". "+p.name);
                }
            }         
        }

        /// <summary>
        /// A navigation method that carrys a selected projects ID
        /// </summary>
        public void GoToProjectDashboard(ListBox Projects, Page dashboard)
        {
           if (Projects.SelectedItem == null)
            {
                dialogService.ShowMessageBox("Please select a project", "No project selected!");
            }
            else
            {
                var index = Projects.SelectedItem.ToString().IndexOf('.');
                var projectId = Projects.SelectedItem.ToString().Substring(0, index);
                ApplicationController.GetInstance().GoToPage(ApplicationPage.ProjectDashboard, dashboard, projectId);
            }       
        }
    }
}
