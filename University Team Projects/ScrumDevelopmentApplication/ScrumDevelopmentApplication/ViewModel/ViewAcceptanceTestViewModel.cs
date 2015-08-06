using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using System.Windows.Media;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;
using ScrumDevelopmentApplication.View.Wizards;

namespace ScrumDevelopmentApplication.ViewModel
{
    class ViewAcceptanceTestViewModel : ViewModelBase
    {
        private IDialogService _dialogService;
        public ViewAcceptanceTestViewModel(IDialogService dialogService, int acceptanceTestId, bool opened)
        {
            _dialogService = dialogService;
            if (!opened)
            {
                var wizard = new ViewAcceptanceTests(acceptanceTestId);
                ApplicationController.GetInstance().GoToWindow(Windows.ViewAcceptanceTests, null, wizard);
                if (PopulateAcceptanceTestFields(acceptanceTestId, wizard))
                {
                    Debug.WriteLine("Populated Acceptance Test Fields worked");
                }
                else
                {
                    dialogService.ShowMessageBox("Im sorry, we were unable to prepopulate your story details");
                }

            }
        }


       
        public bool PopulateAcceptanceTestFields(int acceptanceTestId, ViewAcceptanceTests wizard)
        {
            var storyDetails = AcceptanceTestModel.GetAcceptanceTestDetails(acceptanceTestId);
            if (storyDetails != null)
            {

                string givenText = getStringFromAcceptanceTestDescription(storyDetails, 0);
                string whenText = getStringFromAcceptanceTestDescription(storyDetails, 1);
                string thenText = getStringFromAcceptanceTestDescription(storyDetails, 2);

                wizard.AcceptanceTestBox.Text = storyDetails[1];
                wizard.GivenDescriptionBox.Text = givenText;
                wizard.WhenDescriptionBox.Text = whenText;
                wizard.ThenDescriptionBox.Text = thenText;

                return true;
            }
            return false;
        }

        private string getStringFromAcceptanceTestDescription(string[] acceptanceTestDetails, int descriptionIwant)
        {
            if (acceptanceTestDetails != null)
            {
                const char delimit = '|';
                string[] description = acceptanceTestDetails[2].Split(delimit);

                if (descriptionIwant == 0)
                    return description[0];
                if (descriptionIwant == 1)
                    return description[1];
                if (descriptionIwant == 2)
                    return description[2];
            }

            return "Error retreiving description";
        }

      

    }
}
