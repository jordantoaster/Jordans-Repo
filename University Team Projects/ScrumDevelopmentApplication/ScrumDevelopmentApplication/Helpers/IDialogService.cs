using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScrumDevelopmentApplication.Helpers
{
    /// <summary>
    /// A helper class that represents message boxes across the application
    /// Makes testing much more user friendly
    /// </summary>
    public interface IDialogService
    {
        void ShowMessageBox(String message, String dialogTitle);
        void ShowMessageBox(String message);
    }
}