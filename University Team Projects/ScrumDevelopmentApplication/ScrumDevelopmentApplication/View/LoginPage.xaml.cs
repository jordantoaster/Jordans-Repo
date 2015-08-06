using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
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
    /// Interaction logic for LoginPage.xaml
    /// </summary>
    public partial class LoginPage : Page
    {
        public LoginPage()
        {
            InitializeComponent();
            if (User.RememberUser)
            {
                UsernameBox.Text = User.Email;
            }
        }

        private void LoginButton_Click_1(object sender, RoutedEventArgs e)
        {  
            DataContext = new LoginViewModel(UsernameBox, PasswordBox, RememberMe, this, new DialogService());
        }

        private void RegisterButton_Click_1(object sender, RoutedEventArgs e)
        {
            DataContext = new RegisterViewModel(this, false, new DialogService());
        }

        private void PasswordBox_OnKeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter)
            {
                DataContext = new LoginViewModel(UsernameBox, PasswordBox, RememberMe, this, new DialogService());
            }
        }
    }
}
