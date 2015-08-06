using ScrumDevelopmentApplication.Helpers;

namespace FrontEndTests.Stubs
{
    internal class MessageBoxStub : IDialogService
    {
        public void ShowMessageBox(string message, string dialogTitle)
        {
        }

        public void ShowMessageBox(string message)
        {
        }
    }
}