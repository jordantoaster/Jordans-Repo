using System;
using System.Collections.Generic;
using System.Diagnostics;
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
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.ViewModel;

namespace ScrumDevelopmentApplication.View.Wizards
{
    /// <summary>
    /// Interaction logic for EditTasksWizard.xaml
    /// </summary>
    public partial class EditTasksWizard : Window
    {
        EditTaskViewModel _model;
        private int _taskId;
        public EditTasksWizard(string taskId)
        {
            InitializeComponent();
            WindowStartupLocation = System.Windows.WindowStartupLocation.CenterScreen;
            _taskId = Convert.ToInt32(taskId);
            _model = new EditTaskViewModel(new DialogService());
            _model.FillEditDetails(TaskNameBox, DescriptionBox, BlockedCheckBox, ReasonBox, HoursBox, _taskId);
        }

        private void SaveChanges(object sender, RoutedEventArgs e)
        {
            try
            {
                int hours = Convert.ToInt32(HoursBox.Text);
                int minHours = 0;
                int maxHours = 30;
                if (hours > minHours && hours <= maxHours)
                {
                    if (_model.SaveChanges(TaskNameBox, DescriptionBox, BlockedCheckBox, ReasonBox, HoursBox, _taskId))
                    {
                        Close();
                    }
                    else MessageBox.Show("Edit task failed", "Edit fail");
                }
                else
                {
                    MessageBox.Show("Please enter valid hours between 1 and 30", "Invalid Hours");
                }
            }
            catch (Exception)
            {
                MessageBox.Show("Please enter valid hours between 1 and 30", "Invalid Hours");
            }
        }

        private void HoursBox_PreviewTextInput(object sender, TextCompositionEventArgs e)
        {
            if (!char.IsDigit(e.Text, e.Text.Length - 1))
            {
                e.Handled = true;
            }
        }
        
    }
}
