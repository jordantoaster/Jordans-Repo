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
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.ViewModel;

namespace ScrumDevelopmentApplication.View
{
    /// <summary>
    /// Interaction logic for RegistrationPage.xaml
    /// </summary>
    public partial class RegistrationPage : Page
    {
        public RegistrationPage()
        {
            InitializeComponent();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            RegisterViewModel model = new RegisterViewModel(this, true, new DialogService());

            EmailBox.BorderBrush = Brushes.Red;
            model.RegisterNewUser(EmailBox, NameBox, PasswordBox, ConfirmPasswordBox, RolesListBox, ProductOwnerBoxItem.IsSelected, ScrumMasterBoxItem.IsSelected, DeveloperBoxItem.IsSelected, BioBox);
        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.LoginPage, this, sParam: "");
        }
    }
}
