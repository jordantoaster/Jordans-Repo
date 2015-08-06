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
using System.Windows.Shapes;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.ViewModel;

namespace ScrumDevelopmentApplication.View.Wizards
{
    /// <summary>
    /// Interaction logic for NewSprintWizard.xaml
    /// </summary>
    public partial class NewSprintWizard : Window
    {
        private int projectId;
        private ListBox sprintListBox;
        public NewSprintWizard(string projectId, ListBox sprintListBox)
        {
            InitializeComponent();
            this.projectId = Convert.ToInt32(projectId);
            this.sprintListBox = sprintListBox;
            WindowStartupLocation = System.Windows.WindowStartupLocation.CenterScreen;
        }

        private void Submit_Click(object sender, RoutedEventArgs e)
        {
            AddSprintViewModel model = new AddSprintViewModel(new DialogService(), sprintListBox);
            model.AddSprint(projectId, SprintNameBox.Text, StartDatePicker.Text, EndDatePicker.Text, this);
        }
    }
}
