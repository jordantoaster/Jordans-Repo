using System.IO;
using System.ServiceModel.Channels;
using System.Windows;
using System.Xml;
using System.Xml.Linq;
using ScrumDevelopmentApplication.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.ProjectUserServiceReference;
using User = ScrumDevelopmentApplication.Model.User;
using UserStory = ScrumDevelopmentApplication.Model.UserStory;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class ProjectDashboardViewModel
    {
        private IDialogService dialogService;

        public ProjectDashboardViewModel(IDialogService dialogService)
        {
            this.dialogService = dialogService;
        }

        /// <summary>
        /// Determines if the user has the correct requirements to use the buotton on the view
        /// </summary>
        public void DisableButtons(Button addTeamMemberButton, Button addSprintButton, int projectId)
        {
            if (!ProjectDashboardModel.CheckIfProjectOwner(User.Email, projectId))
            {
                addTeamMemberButton.IsEnabled = false;
            }

            if (!ProjectDashboardModel.CheckIfScrumMaster(User.Email, projectId))
            {
                addSprintButton.IsEnabled = false;
            }
        }

        /// <summary>
        /// Fills a list box on the view from the project user table
        /// </summary>
        public void PopulateTeamMembers(ListBox teamListBox, int projectId)
        {
            var list = ProjectDashboardModel.GetProjectTeamList(projectId);
            teamListBox.Items.Clear();
            foreach (var p in list)
            {
                if (ProjectDashboardModel.CheckIfProjectOwner(p, projectId))
                {
                    teamListBox.Items.Add(p + " (Project Owner)");
                }
                if (ProjectDashboardModel.CheckIfProductOwner(p, projectId))
                {
                    teamListBox.Items.Add(p + " (Product Owner)");
                }
                if (ProjectDashboardModel.CheckIfScrumMaster(p, projectId))
                {
                    teamListBox.Items.Add(p + " (Scrum Master)");
                }
                if (ProjectDashboardModel.CheckIfDeveloper(p, projectId))
                {
                    teamListBox.Items.Add(p + " (Developer)");
                }
            }
        }

        public void PopulateSprints(ListBox sprintListBox, int projectId)
        {
            sprintListBox.Items.Clear();
            var list = ProjectDashboardModel.GetSprintList(projectId);
            foreach (var p in list)
            {
                sprintListBox.Items.Add(p);

            }
        }

        public void GoToSprintDashboard(ListBox sprints, int projectId, Page dashboard)
        {
            if (sprints.SelectedItem == null)
            {
                dialogService.ShowMessageBox("Please select a Sprint", "No Sprint selected!");
            }
            else
            {
                var index = sprints.SelectedItem.ToString().IndexOf('.');
                var sprintId = sprints.SelectedItem.ToString().Substring(0, index);
                ApplicationController.GetInstance().GoToPage(ApplicationPage.SprintDashboard, dashboard, sprintId, projectId);
            }
        }


        /// <summary>
        /// Retrieves an array of projects from the database, and returns the data to the view
        /// </summary>
        public void PopulateProjects(ListBox tabControl)
        {
            string[] projectList = ProjectWizardModel.GetAssociatedProjects();

            if (projectList != null)
            {
                foreach (var p in projectList)
                {
                    if(!tabControl.Items.Contains(p))
                    tabControl.Items.Add(p);
                }
            }
        }

        /// <summary>
        /// Retrieves XML code from file and places it in list boxes
        /// </summary>
        public void OpenProject(ListBox memberList, ListBox sprintList)
        {
            var doc = new XmlDocument();
            if (File.Exists("Project.xml"))
            {
                var dialogResult = MessageBox.Show("Open project?", "Open", MessageBoxButton.YesNo);
                if (dialogResult == MessageBoxResult.Yes)
                {
                    doc.Load("Project.xml");

                    if (doc.DocumentElement != null)
                    {
                        XmlNode members = doc.DocumentElement.SelectSingleNode("Member");
                        if (members != null)
                        {
                            var emails = members.SelectNodes("Email");
                            memberList.Items.Clear();
                            if (emails != null)
                                foreach (var email in emails)
                                {
                                    memberList.Items.Add(email);
                                }
                        }
                    }

                    if (doc.DocumentElement != null)
                    {
                        XmlNode sprints = doc.DocumentElement.SelectSingleNode("Sprint");
                        if (sprints != null)
                        {
                            XmlNodeList names = sprints.SelectNodes("Name");
                            sprintList.Items.Clear();
                            if (names != null)
                                foreach (var name in names)
                                {
                                    sprintList.Items.Add(name);
                                }
                        }
                    }
                }
            }
            else
            {
                dialogService.ShowMessageBox("No save found", "Error");
            }         
        }

        /// <summary>
        /// Saves XML code from list boxes and places it in file
        /// </summary>
        public void SaveProject(ListBox teamListBox, ListBox sprintsListBox)
        {
            var doc = new XDocument();
            var project = new XElement("Project");
            var members = new XElement("Member");
            var sprints = new XElement("Sprint");
            foreach (var p in teamListBox.Items)
            {               
                members.Add(new XElement("Email", p));                
            }
            foreach (var s in sprintsListBox.Items)
            {
                sprints.Add(new XElement("Name", s));
            }
            project.Add(members);
            project.Add(sprints);
            doc.Add(project);
            if (File.Exists("Project.xml"))
            {
                var dialogResult = MessageBox.Show("Overwrite saved file?", "Overwrite", MessageBoxButton.YesNo);
                if (dialogResult == MessageBoxResult.Yes)
                {
                    doc.Save("Project.xml");
                }
            }
            else
            {
                var dialogResult = MessageBox.Show("Save project?", "Save", MessageBoxButton.YesNo);
                if (dialogResult == MessageBoxResult.Yes)
                {
                    doc.Save("Project.xml");
                }
            }
        }
    }
}
