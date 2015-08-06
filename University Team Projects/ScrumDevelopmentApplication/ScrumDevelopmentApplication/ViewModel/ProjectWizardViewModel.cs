using System;
using System.Collections.Generic;
using System.Linq;
using System.Media;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class ProjectWizardViewModel : ViewModelBase
    {
        private IDialogService _dialogService;
        public ProjectWizardViewModel(IDialogService dialogService)
        {
            _dialogService = dialogService;
        }
        /// <summary>
        /// Checks if the project is valid based on the parameters being passed in
        /// </summary>
        public void CheckIfValidProject(TextBox name, string user, TextBox description, DatePicker startDate, Window wizard)
        {
            bool emptyFields = false;
            bool projectName = false;
            bool descriptionValid = false;
            bool projectNameLength = true;
            emptyFields = IsEmptyFields(name, description, startDate.Text);
            projectName = IsProjectNameEmpty(name);
            descriptionValid = IsDescriptionEmpty(description);
            projectNameLength = IsProjectNameLengthValid(name);

            if (!projectName && !descriptionValid && projectNameLength && !emptyFields)
            {
                bool success = Model.ProjectWizardModel.CreateNewProject(name.Text, user, description.Text, startDate.Text);
                if (success)
                {
                    _dialogService.ShowMessageBox(name.Text + " created", "Project Created");
                    wizard.Close();
                }
            }
        }
       
        /// <summary>
        /// Checks if there are no empty fields
        /// </summary>
        public bool IsEmptyFields(TextBox name, TextBox description, string startDate)
        {
            name.BorderBrush = name.Text != "" ? Brushes.DodgerBlue : Brushes.Red;
            description.BorderBrush = description.Text != "" ? Brushes.DodgerBlue : Brushes.Red;

            if (name.Text == "" || description.Text == "" || startDate == "")
            {
                _dialogService.ShowMessageBox("Please complete all fields", "Empty Fields");
                return true;
            }
            return false;
        }
        /// <summary>
        /// Checks if the project name is valid
        /// </summary>
        public bool IsProjectNameLengthValid(TextBox name)
        {
            if (name.Text.Length <= 2)
            {
                _dialogService.ShowMessageBox("Project Name must be a minimum of 3 characters", "Project Not Created");
                return false;
            }
            else if (name.Text.Length > 50)
            {
                _dialogService.ShowMessageBox("Project Name cannot exceed 50 characters.", "Project Not Created");
                return false;
            }
            return true;
        }
        /// <summary>
        /// Checks if the project name is not empty
        /// </summary>
        public bool IsProjectNameEmpty(TextBox name)
        {
            name.BorderBrush = name.Text != "" ? Brushes.DodgerBlue : Brushes.Red;

            if (name.Text == "")
            {
                return true;
            }
            return false;
        }
        /// <summary>
        /// Checks if description field is not empty
        /// </summary>
        public bool IsDescriptionEmpty(TextBox description)
        {
            description.BorderBrush = description.Text != "" ? Brushes.DodgerBlue : Brushes.Red;

            if (description.Text == "")
            {
                return true;
            }
            return false;
        }
        /// <summary>
        /// Populates the list with the associated projects
        /// </summary>
        public void populateListBox(ListBox listBox)
        {
            string[] projectList = ProjectWizardModel.GetAssociatedProjects();

            if (projectList != null)
            {
                foreach (var p in projectList)
                {
                    if (!listBox.Items.Contains(p))
                        listBox.Items.Add(p);//(p.id+". "+p.name);
                }
            }  
        }
    }
}

