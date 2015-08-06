using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using ScrumDevelopmentApplication.AcceptanceTestServiceReference;
using ScrumDevelopmentApplication.View.Wizards;

namespace ScrumDevelopmentApplication.Model
{
    class AcceptanceTestModel
    {
        /// <summary>
        /// Passes the recieved data to the service for processing
        /// </summary>
        public static bool AddAcceptanceTest(string name, string description, int id)
        {
            var acceptanceTest = new AcceptanceTestServiceClient();
            try
            {
                return acceptanceTest.InsertAcceptanceTest(name, description, id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                MessageBox.Show("Im sorry, somthing went wrong on our end. Please try again later", "Acceptance Test not added");
                return false;
            }
        }
        public static string[] GetAcceptanceTestDetails(int acceptanceTestId)
        {
            var acceptanceTestClient = new AcceptanceTestServiceClient();

            try
            {
                return acceptanceTestClient.GetAcceptanceTest(acceptanceTestId);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                MessageBox.Show("Im sorry, something went wrong on our end, please try again later", "System error");
            }
            return null;
        }

        public static string[] GetTestList(int storyId)
        {
            var acceptanceTestClient = new AcceptanceTestServiceClient();

            try
            {
                return acceptanceTestClient.GetTestList(storyId);
            }
            catch (Exception e)
            {
                MessageBox.Show("Im sorry, something went wrong on our end, please try again later", "System error");
            }
            return null;
        }
    }
}
