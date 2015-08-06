using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.ViewModel;
using ScrumDevelopmentApplication.Helpers;

namespace ScrumDevelopmentApplication.View
{
    /// <summary>
    /// Interaction logic for SprintStory.xaml
    /// </summary>
    public partial class SprintStory : Page
    {
        string sprintId;
        int projectId, userStoryId;
        private EditTaskViewModel _model;
        SprintStoryViewModel sprint;

        public SprintStory(String id, int pId, int sId)
        {
            InitializeComponent();
            sprintId = id;
            projectId = pId;
            userStoryId = sId;
            sprint = new SprintStoryViewModel(new DialogService());
            sprint.disableIfNotSprintMember(EditTaskButton, DeleteTaskButton, AssignButton, AddTaskButton, OwnerShipButton, sprintId);
            sprint.DisableIfNotScrumMaster(AssignButton, sprintId);
            sprint.ShowTasks(userStoryId, TaskListBox);
            _model = new EditTaskViewModel(new DialogService());
            //sprint.DisableButtons(DeleteTaskButton, EditTaskButton, taskId);
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
           ApplicationController.GetInstance().GoToWindowWithListBox(Windows.AddTaskWizard, "" + userStoryId, TaskListBox);
        }

        private void EditButton_Click(object sender, RoutedEventArgs e)
        {
            if (TaskListBox.SelectedItem == null)
            {
                {
                    MessageBox.Show("Select a task", "No task selected");
                }
            }
            else
            {
                var index = TaskListBox.SelectedItem.ToString().IndexOf('.');
                int taskId = Convert.ToInt32(TaskListBox.SelectedItem.ToString().Substring(0, index));
                ApplicationController.GetInstance().GoToWindow(Windows.EditTasksWizard, "" + taskId);
            }
           
        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (TaskListBox.SelectedItem == null)
            {
               MessageBox.Show("Select a task", "No task selected");
            }
            else if (
                   MessageBox.Show("Delete task", "Do you want to delete this task?",
                        MessageBoxButton.YesNo) == MessageBoxResult.Yes)
            {
                var index = TaskListBox.SelectedItem.ToString().IndexOf('.');
                int taskId = Convert.ToInt32(TaskListBox.SelectedItem.ToString().Substring(0, index));
                _model.DeleteTask(taskId);
                sprint.ShowTasks(userStoryId, TaskListBox);
            }
        }

        private void Back_OnClick(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.SprintDashboard, this, "" + sprintId, projectId);
        }

        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.LoginPage, this, sParam: null);
        }

        private void AssignOwnership(object sender, RoutedEventArgs e)
        {
            if (TaskListBox.SelectedItem == null)
            {
                MessageBox.Show("Select a task", "No task selected");
            }
            else
            {
               var index = TaskListBox.SelectedItem.ToString().IndexOf('.');
               int taskId = Convert.ToInt32(TaskListBox.SelectedItem.ToString().Substring(0, index));
               ApplicationController.GetInstance().GoToWindowWithListBox(Windows.AssignOwnershipWizard, ""+taskId, TaskListBox, null, ""+sprintId, ""+userStoryId); 
            }
        }

        private void TakeOwnership(object sender, RoutedEventArgs e)
        {
            if (TaskListBox.SelectedItem == null)
            {
                MessageBox.Show("Select a task", "No task selected");
            }
            else
            {
                var index = TaskListBox.SelectedItem.ToString().IndexOf('.');
                int taskId = Convert.ToInt32(TaskListBox.SelectedItem.ToString().Substring(0, index));
                _model.TakeOwnership(taskId, EditTaskButton, DeleteTaskButton);
                sprint.ShowTasks(userStoryId, TaskListBox);
            }
        }
        private void Home_OnClick(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.UserDashboard, this, sParam: "");
        }

        private void TaskListBox_OnSelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (TaskListBox.SelectedItem != null)
            {
                var index = TaskListBox.SelectedItem.ToString().IndexOf('.');
                int taskId = Convert.ToInt32(TaskListBox.SelectedItem.ToString().Substring(0, index));
                sprint.DisableTaskButtons(DeleteTaskButton, EditTaskButton, taskId);
            }
        }
    }
}
