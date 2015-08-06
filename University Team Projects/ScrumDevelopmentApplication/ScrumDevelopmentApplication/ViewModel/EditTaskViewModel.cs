using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Dispatcher;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class EditTaskViewModel
    {
        private IDialogService _dialogService;
        public EditTaskViewModel(IDialogService dialogService)
        {
            _dialogService = dialogService;
        }

        public void TakeOwnership(int taskId, Button editBut, Button deleteBut)
        {
            if (AssignOwnership(taskId, User.Email))
            {
                EnableButtons(editBut, deleteBut);
            }
        }

        public void EnableButtons(Button editButton, Button deleteButton)
        {
            editButton.IsEnabled = true;
            deleteButton.IsEnabled = true;
        }

        public bool AssignOwnership(int taskId, String email)
        {
            if (!string.IsNullOrEmpty(email))
            {
                TaskModel.AssignOwnership(taskId, email);
                _dialogService.ShowMessageBox(email + " has been assigned to this task", "User Assigned");
                return true;
            }
            else
            {
                _dialogService.ShowMessageBox("Please select a user to assign to this task");
                return false;
            }
        }

        public void GetSprintUsers(int sprintId, ListBox userListBox)
        {
            var users = TaskModel.GetSprintUsers(sprintId);
            foreach (var u in users)
            {
                userListBox.Items.Add(u);
            }
        }

        public void DeleteTask(int taskId)
        {
            TaskModel.DeleteTask(taskId);
        }

        public bool SaveChanges(TextBox taskNameBox, TextBox descriptionBox, CheckBox blockedCheckBox, TextBox reasonBox, TextBox hoursBox, int taskId)
        {
            if (TaskModel.SaveChanges(taskId, taskNameBox.Text, descriptionBox.Text, blockedCheckBox.IsChecked,
                reasonBox.Text, Convert.ToInt32(hoursBox.Text)))
            {
                _dialogService.ShowMessageBox("Changes saved Successfully");
                return true;
            }
            return false;
        }

        public void FillEditDetails(TextBox taskNameBox, TextBox descriptionBox, CheckBox blockedCheckBox, TextBox reasonBox, TextBox hoursBox, int taskId)
        {
            TaskModel.FillEditDetails(taskId, taskNameBox, descriptionBox, blockedCheckBox, reasonBox, hoursBox);
        }

        public void UpdateTasks(ListBox taskListBox, int userStoryId)
        {
            SprintModel.ShowTasks(userStoryId, taskListBox);
        }
    }
}
