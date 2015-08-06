using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using ScrumDevelopmentApplication.Helpers;
using ScrumDevelopmentApplication.Model;

namespace ScrumDevelopmentApplication.ViewModel
{
    public class AddSprintViewModel
    {
        private IDialogService _dialogService;
        private ListBox sprintListBox;
        public AddSprintViewModel(IDialogService dialogService, ListBox sprintListBox)
        {
            _dialogService = dialogService;
            this.sprintListBox = sprintListBox;
        }

        /// <summary>
        /// using the details passed in the details are passed to other methods for validation and then forwarded to the model
        /// </summary>
        public void AddSprint(int projectId, string sprintName, string sprintStart, string sprintEnd, Window wizard)
        {
            if (CheckIfFieldsValid(sprintName, sprintStart, sprintEnd))
            {
                if (!CheckStartDateBeforeEndDate(sprintStart, sprintEnd))
                {
                    _dialogService.ShowMessageBox("End date cannot be before start date");
                }
                else if (!CheckIfNotAfterProjectDate(sprintStart, projectId))
                {
                    _dialogService.ShowMessageBox("Start date cannot be before project start date");
                }
                else
                {
                    if (SprintModel.AddSprint(projectId, sprintName, sprintStart, sprintEnd, User.Email))
                    {
                        _dialogService.ShowMessageBox("Sprint " + sprintName + " has been successfully added");
                        var dashboardModel = new ProjectDashboardViewModel(_dialogService);
                        dashboardModel.PopulateSprints(sprintListBox, projectId);
                        wizard.Close();
                    }
                    else _dialogService.ShowMessageBox("Add sprint failed", "Sprint fail");
                }
            }
        }


        /// <summary>
        /// Determines if the user has entered data
        /// </summary>
        public bool CheckIfFieldsValid(string sprintName, string sprintStart, string sprintEnd)
        {
            if (sprintName == "" || sprintStart == "" || sprintEnd == "")
            {
                _dialogService.ShowMessageBox("Please enter all required information");
                return false;
            }
            return true;
        }


        /// <summary>
        /// The next two methods check for valid date ranges
        /// </summary>
        public bool CheckStartDateBeforeEndDate(string startDate, string endDate)
        {
            return IsStringDateAfter(endDate, startDate);
        }

        public bool CheckIfNotAfterProjectDate(string date, int projectId)
        {
            var nowdate = SprintModel.GetProjectStartDate(projectId);//replace with project start date
            return IsStringDateAfter(date, nowdate);
        }

        public bool IsStringDateAfter(string date, string date2)
        {
            var date2Array = date2.Split('/');
            var dateArray = date.Split('/');
            var day2 = Convert.ToInt32(date2Array[0]);
            var month2 = Convert.ToInt32(date2Array[1]);
            var year2 = Convert.ToInt32(date2Array[2]);

            var day = Convert.ToInt32(dateArray[0]);
            var month = Convert.ToInt32(dateArray[1]);
            var year = Convert.ToInt32(dateArray[2]);
            if (year < year2)
            {
                return false;
            }
            if ((year == year2) && month < month2)
            {
                return false;
            }
            if ((month == month2) && day < day2)
            {
                return false;
            }

            return true;
        }
    }
}
