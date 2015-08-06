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
    /// Interaction logic for EditDetails.xaml
    /// </summary>
    public partial class EditDetails : Page
    {
        public EditDetails()
        {
            InitializeComponent();
            UsernameBox.Text = EditDetailsViewModel.GetUsername(User.Email);
            UpdateCheckboxes(ProductOwnerCheckBox, User.ProductOwner);
            UpdateCheckboxes(ScrumMasterCheckBox, User.ScrumMaster);
            UpdateCheckboxes(DeveloperCheckBox, User.Developer);
            BioBox.Text = EditDetailsViewModel.GetBio(User.Email);
        }

        private void SubmitChanges_Click_1(object sender, RoutedEventArgs e)
        {
            EditDetailsViewModel model = new EditDetailsViewModel(this, true, new DialogService());
            
            model.EditUserDetails(User.Email, UsernameBox, OldPasswordBox, NewPasswordBox, ConfirmPasswordBox, 
                ProductOwnerCheckBox, ScrumMasterCheckBox, DeveloperCheckBox, BioBox);
            
            //ApplicationController.GetInstance().GoToPage(ApplicationPage.UserDashboard, this, "");
        }

        private void CancelChanges_Click_1(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.UserDashboard, this, sParam: "");
            
        }

        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            ApplicationController.GetInstance().GoToPage(ApplicationPage.LoginPage, this, sParam: "");
        }

        private void UpdateCheckboxes(CheckBox box, bool user)
        {
            if (user == true)
            {
                box.IsChecked = true;
            }
            else box.IsChecked = false;
        }
    }
}
