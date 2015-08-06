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
    /// Interaction logic for AddAcceptanceTest.xaml
    /// </summary>
    public partial class AddAcceptanceTest : Window
    {
        private int userStoryId;
        private ListBox _listBox;
        public AddAcceptanceTest(string userStoryId, ListBox listBox)
        {
            this.userStoryId = Convert.ToInt32(userStoryId);
            InitializeComponent();
            WindowStartupLocation = System.Windows.WindowStartupLocation.CenterScreen;
            _listBox = listBox;
        }

        private void SubmitTest(object sender, RoutedEventArgs e)
        {
            var addTest = new AddAcceptanceTestViewModel(new DialogService());
            addTest.ValidTest(AcceptanceTestBox, GivenDescriptionBox, WhenDescriptionBox, ThenDescriptionBox, userStoryId, this);
            addTest.UpdateTests(_listBox, userStoryId);
        }
    }
}
