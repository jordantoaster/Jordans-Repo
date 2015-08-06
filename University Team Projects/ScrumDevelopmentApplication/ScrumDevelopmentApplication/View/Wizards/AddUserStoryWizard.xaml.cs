using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
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
    /// Interaction logic for AddUserStory.xaml
    /// </summary>
    public partial class AddUserStory : Window
    {
        int projectId;
        private ListBox _listBox;
        private ListBox storyListBox;
        public AddUserStory(string parameter, ListBox listBox)
        {
            projectId = Convert.ToInt32(parameter);
            this.storyListBox = storyListBox;
            InitializeComponent();
            WindowStartupLocation = System.Windows.WindowStartupLocation.CenterScreen;
            _listBox = listBox;
        }
        /// <summary>
        /// After submit button is clicked, created a new instance of add user story view model
        /// and passes all required information to it for processing
        /// </summary>
        private void SubmitUserStory(object sender, RoutedEventArgs e)
        {
            var addStory = new AddUserStoryViewModel(new DialogService(), storyListBox);
            addStory.CheckIfValidStory(1, AsADescriptionBox, IWantDescriptionBox, BecauseDescriptionBox,
                  projectId, this);
            addStory.updateStories(_listBox, projectId);
        }

  
    }
}