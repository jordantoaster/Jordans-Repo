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
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.ViewModel;

namespace ScrumDevelopmentApplication.View.Wizards
{
    /// <summary>
    /// Interaction logic for AddTaskWizard.xaml
    /// </summary>
    public partial class AddTaskWizard : Window
    {
        private AddTaskViewModel _model;
        private int userStoryId;
        private ListBox _listBox;

        public AddTaskWizard(string userStoryId, ListBox listBox)
        {
            InitializeComponent();
            WindowStartupLocation = System.Windows.WindowStartupLocation.CenterScreen;
            _model = new AddTaskViewModel(new DialogService());
            this.userStoryId = Convert.ToInt32(userStoryId);
            _listBox = listBox;
        }

        private void SubmitTest(object sender, RoutedEventArgs e)
        {
                _model.SubmitTest(this,TaskNameBox, DescriptionBox, BlockedCheckBox, ReasonBox, HoursBox, userStoryId);
                _model.UpdateTasks(_listBox, userStoryId);
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
