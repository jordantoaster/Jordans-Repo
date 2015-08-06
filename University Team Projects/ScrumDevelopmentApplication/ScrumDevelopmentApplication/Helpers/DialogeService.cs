using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Channels;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace ScrumDevelopmentApplication.Helpers
{
    /// <summary>
    /// Message box implementation, the application will reference this class and pass in details
    /// </summary>
    public class DialogService : IDialogService
    {
        public void ShowMessageBox(string message, string dialogTitle)
        {
            MessageBox.Show(message, dialogTitle);
        }

        public void ShowMessageBox(string message)
        {
            MessageBox.Show(message);
        }
    }
}