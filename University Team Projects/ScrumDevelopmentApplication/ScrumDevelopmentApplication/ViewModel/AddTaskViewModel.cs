using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Dispatcher;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using System.Windows.Navigation;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using System.Windows.Media;
using System.Windows;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class AddTaskViewModel
    {
        private IDialogService _dialogService;

        public AddTaskViewModel(IDialogService dialogService)
        {
            _dialogService = dialogService;
        }

        public void SubmitTest(Window window, TextBox taskNameBox, TextBox descriptionBox, CheckBox blockedCheckBox,
            TextBox reasonBox, TextBox hoursBox, int userStoryId)
        {
            bool empty = AreFieldsEmpty(taskNameBox, descriptionBox);
            bool validHour = ValidHours(hoursBox);
            bool validBlocked = TaskBlockedStatusOk(blockedCheckBox, reasonBox);

            if (empty && validHour && validBlocked)
            {
                if (TaskModel.SubmitTest(taskNameBox.Text, descriptionBox.Text, blockedCheckBox.IsChecked,
                reasonBox.Text, Convert.ToInt32(hoursBox.Text), userStoryId))
                {
                    _dialogService.ShowMessageBox("Task " + taskNameBox.Text + " added Successfully");
                    window.Close();
                }
                else _dialogService.ShowMessageBox("Add task failed");
            }
        }

        public void UpdateTasks(ListBox taskListBox, int userStoryId)
        {
            SprintModel.ShowTasks(userStoryId, taskListBox);
        }

        public bool AreFieldsEmpty(TextBox taskBox, TextBox desBox)
        {
            if ((taskBox.Text == "") || (desBox.Text == "") && (taskBox.Text == null) || (desBox.Text == null))
            {
                taskBox.BorderBrush = Brushes.Red;
                desBox.BorderBrush = Brushes.Red;
                _dialogService.ShowMessageBox("Task box or description box is empty", "Task creation unsuccessful");
                return false;
            }
            return true;
        }

        public bool ValidHours(TextBox text)
        {

            if (text.Text == "" || text.Text == null)
            {
                _dialogService.ShowMessageBox("Enter valid hours for the task", "Task creation unsuccessful");
                return false;
            }

            if (text.Text.All(char.IsDigit))
            {
                try
                {
                    int hours = Convert.ToInt32(text.Text);
                    int minHours = 0;
                    int maxHours = 30;

                    if (hours > minHours && hours <= maxHours)
                    {
                        return true;
                    }
                    _dialogService.ShowMessageBox("Enter valid hours for the task", "Task creation unsuccessful");
                    return false;
                }
                catch (Exception)
                {
                    _dialogService.ShowMessageBox("Please enter a numeric value between 1 and 30 for hours remaining",
                        "Task creation unsuccessful");
                    return false;
                }
            } _dialogService.ShowMessageBox("Please enter a numeric value between 1 and 30 for hours remaining",
                         "Task creation unsuccessful");
            return false;
        }

        /// <summary>
        /// Determines if a task is blocked and provides feedback to prompt the user
        /// </summary>
        public bool TaskBlockedStatusOk(CheckBox blockedCheckbox, TextBox reasonTextbox)
        {
            bool isBlocked = IsBoxChecked(blockedCheckbox);
            bool textBoxEmpty = IsTextboxEmpty(reasonTextbox);

            if (isBlocked == true && textBoxEmpty == true)
            {
                reasonTextbox.BorderBrush = Brushes.Red;
                _dialogService.ShowMessageBox("Please enter the reason for being blocked", "Task creation unsuccessful");
                return false;
            }
            return true;
        }

        /// <summary>
        /// determines if the check box is ticked
        /// </summary>
        public bool IsBoxChecked(CheckBox box)
        {
            if (box.IsChecked == true)
                return true;
            else return false;
        }

        /// <summary>
        /// empty feild validation
        /// </summary>
        public bool IsTextboxEmpty(TextBox textbox)
        {
            if (textbox.Text == "" || textbox.Text == null)
            {
                return true;
            }
            return false;
        }
    }
}
