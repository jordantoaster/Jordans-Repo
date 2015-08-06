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
using Microsoft.SqlServer.Server;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.ViewModel;

namespace ScrumDevelopmentApplication.View.Wizards
{
    /// <summary>
    /// Interaction logic for EditUserStoryWizard.xaml
    /// </summary>
    public partial class EditUserStoryWizard : Window
    {
        private int userStoryId;
        private int projectId;
        private ListBox _listBox;
        private IDialogService dialogService;

        public EditUserStoryWizard(int userStoryId, int projectId, ListBox listBox)
        {
            this.userStoryId = userStoryId;
            this.projectId = projectId;
            InitializeComponent();
            WindowStartupLocation = System.Windows.WindowStartupLocation.CenterScreen;
            _listBox = listBox;
            var model = new EditUserStoryViewModel(new DialogService(), userStoryId, true, projectId);
            model.PopulateStories(userStoryId, this);
            model.checkRole(projectId, ComboBox, PriorityBox, AsADescriptionBox, IWantDescriptionBox, BecauseDescriptionBox, SubmitButton);
        }
        /// <summary>
        /// After submit button is clicked, creates a new instance of edit user story view model
        /// and passes all required information to edit the user story
        /// </summary>
        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var model = new EditUserStoryViewModel(new DialogService(), userStoryId, true, projectId);
            bool success = model.UpdateDetails(userStoryId, this);
            if (success)
            {
                model.executeEditDetails(userStoryId, this);
                model.UpdateStories(_listBox, projectId);
            }
        }
        /// <summary>
        /// Creates a drop down menu for story points and populates it with predefined data
        /// </summary>
        public void ComboBox_Click(object sender, RoutedEventArgs e)
        {
            List<string> points = new List<string>();
            points.Add("0");
            points.Add("1");
            points.Add("2");
            points.Add("3");
            points.Add("5");
            points.Add("8");
            points.Add("13");
            points.Add("20");
            points.Add("40");
            points.Add("100");
            
            var comboBox = sender as ComboBox;
            comboBox.ItemsSource = points;
        }
        /// <summary>
        /// Ensures that only numbers are being allowed in the priority box
        /// </summary>
        private void PriorityBox_PreviewTextInput(object sender, TextCompositionEventArgs e)
        {           
            if (!char.IsDigit(e.Text, e.Text.Length - 1))
            {
                e.Handled = true;
            }
        }
    }
}
