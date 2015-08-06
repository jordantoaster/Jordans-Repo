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
    /// Interaction logic for ViewAcceptanceTests.xaml
    /// </summary>
    public partial class ViewAcceptanceTests : Window
    {
        private int acceptanceTestId;
        private IDialogService dialogService;
        private bool opened = true;
        public ViewAcceptanceTests(int acceptanceTestId)
        {
            InitializeComponent();
            this.acceptanceTestId = acceptanceTestId;
            WindowStartupLocation = System.Windows.WindowStartupLocation.CenterScreen;
        
            var viewModel = new ViewAcceptanceTestViewModel(new DialogService(), acceptanceTestId, opened);
          
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }


    }
}
