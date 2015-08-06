using System;
using System.Collections.Generic;
using System.IO.Packaging;
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
using System.Windows.Shapes;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.ViewModel;

namespace ScrumDevelopmentApplication.View.Wizards
{
    /// <summary>
    /// Interaction logic for AssignOwnershipWizard.xaml
    /// </summary>
    public partial class AssignOwnershipWizard : Window
    {
        private int _taskId, _sprintId, _userStoryId;
        private EditTaskViewModel _model;
        private ListBox _listBox;
        public AssignOwnershipWizard(string taskId, string sprintId, string userStoryId, ListBox listBox)
        {
            InitializeComponent();
            _taskId = Convert.ToInt32(taskId);
            _sprintId = Convert.ToInt32(sprintId);
            _userStoryId = Convert.ToInt32(userStoryId);
            _model = new EditTaskViewModel(new DialogService());
            _model.GetSprintUsers(_sprintId, ResultsBox);
            _listBox = listBox;
            WindowStartupLocation = System.Windows.WindowStartupLocation.CenterScreen;
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            var email = ResultsBox.SelectedItem != null ? ResultsBox.SelectedItem.ToString() : "";
            if (_model.AssignOwnership(_taskId, email))
            {
                Close();
                _model.UpdateTasks(_listBox, _userStoryId);
            }
        }
    }
}
