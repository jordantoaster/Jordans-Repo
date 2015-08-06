using ScrumDevelopmentApplication.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.TaskServiceReference;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class SprintStoryViewModel
    {
         private IDialogService dialogService;

        public SprintStoryViewModel(IDialogService dialogService)
        {
            this.dialogService = dialogService;
        }

        public void disableIfNotSprintMember(Button editButton, Button deletebutton, Button assignButton, Button addButton, Button ownershipButton, string sprintId)
        {
            if (!SprintDashboardModel.CheckIfDeveloper(User.Email, sprintId) &&
                !SprintDashboardModel.CheckIfProductOwner(User.Email, sprintId) &&
                !SprintDashboardModel.CheckIfScrumMaster(User.Email, sprintId))
            {
                editButton.IsEnabled = false;
                deletebutton.IsEnabled = false;
                assignButton.IsEnabled = false;
                addButton.IsEnabled = false;
                ownershipButton.IsEnabled = false;
            }
        }

        public void DisableIfNotScrumMaster(Button button, string sprint)
        {
            if (!SprintDashboardModel.CheckIfScrumMaster(User.Email, sprint))
            {
                button.IsEnabled = false;
            }
        }

        public void DisableTaskButtons(Button deleteTaskButton, Button editTaskButton, int taskId)
        {
            if (!SprintModel.CheckIfTaskOwner(User.Email, taskId))
            {
                DisableButtons(editTaskButton, deleteTaskButton);
            }
            else
            {
                EnableButtons(editTaskButton, deleteTaskButton);
            }
        }

        public void EnableButtons(Button editButton, Button deleteButton)
        {
            editButton.IsEnabled = true;
            deleteButton.IsEnabled = true;
        }

        public void DisableButtons(Button editButton, Button deleteButton)
        {
            editButton.IsEnabled = false;
            deleteButton.IsEnabled = false;
        }

        public void ShowTasks(int userStoryId, ListBox taskListBox)
        {
            SprintModel.ShowTasks(userStoryId, taskListBox);
        }
    }
}
