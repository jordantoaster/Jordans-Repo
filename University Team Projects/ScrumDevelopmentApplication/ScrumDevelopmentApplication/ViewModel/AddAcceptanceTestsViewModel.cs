using System.Diagnostics;
using System.Windows;
using System.Windows.Media;
using ScrumDevelopmentApplication.AcceptanceTestServiceReference;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using ScrumDevelopmentApplication.ProjectUserServiceReference;
using ScrumDevelopmentApplication.UserStoryServiceReference;
using ScrumDevelopmentApplication.View.Wizards;
using User = ScrumDevelopmentApplication.Model.User;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class AddAcceptanceTestViewModel : ViewModelBase
    {
        private IDialogService _dialogService;
        public AddAcceptanceTestViewModel(IDialogService dialogService)
        {
            _dialogService = dialogService;
        }
       
         /// <summary>
        /// Takes in parameters and performs various validation checks
        /// </summary>
        public void ValidTest(TextBox name, TextBox givenDescription, TextBox whenDescription, TextBox thenDescription, int id, Window wizard)
        {
            bool emptyFields = false;
            emptyFields = IsEmptyFieldsAcceptanceTest(name, givenDescription, whenDescription, thenDescription);
            string description = givenDescription.Text + "|" + whenDescription.Text + "|" + thenDescription.Text + "|";
            if (!emptyFields)
            {
                if (AcceptanceTestModel.AddAcceptanceTest(name.Text, description, id))
                {
                    _dialogService.ShowMessageBox(name.Text + " created", "Test Created");
                    wizard.Close();
                }
                else _dialogService.ShowMessageBox("Add acceptance test failed");
            }   
            
        }

        /// <summary>
        /// a listbox update method
        /// </summary>
        public void UpdateTests(ListBox acceptanceListBox, int storyId)
        {
            string[] testList = AcceptanceTestModel.GetTestList(storyId);
            acceptanceListBox.Items.Clear();
            foreach (var s in testList)
            {
                acceptanceListBox.Items.Add(s);
            }
        }

        /// <summary>
        /// Checks if the acceptance test fields are populated
        /// </summary>
        public bool IsEmptyFieldsAcceptanceTest(TextBox acceptanceTestTitleBox, TextBox givenDescriptionBox, TextBox whenDescriptionBox, TextBox _thenDescriptionBox)
        {
            acceptanceTestTitleBox.BorderBrush = acceptanceTestTitleBox.Text != "" ? Brushes.DodgerBlue : Brushes.Red;
            givenDescriptionBox.BorderBrush = givenDescriptionBox.Text != "" ? Brushes.DodgerBlue : Brushes.Red;
            whenDescriptionBox.BorderBrush = whenDescriptionBox.Text != "" ? Brushes.DodgerBlue : Brushes.Red;
            _thenDescriptionBox.BorderBrush = _thenDescriptionBox.Text != "" ? Brushes.DodgerBlue : Brushes.Red;

            if (acceptanceTestTitleBox.Text == "" || givenDescriptionBox.Text == "" || whenDescriptionBox.Text == "" || _thenDescriptionBox.Text == "")
            {
                _dialogService.ShowMessageBox("Please complete all fields", "Empty Fields");
                return true;
            }
            return false;
        }




       
    }
}
