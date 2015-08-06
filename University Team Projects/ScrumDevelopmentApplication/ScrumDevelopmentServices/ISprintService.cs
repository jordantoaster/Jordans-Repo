using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{
    /// <summary>
    /// This interface determines the operations that have to be defined in the sprint service
    /// </summary>

    [ServiceContract]
    public interface ISprintService
    {
        [OperationContract]
        bool AddSprint(string name, string startDate, string endDate, int projectId, string userEmail);

        [OperationContract]
        string[] GetSprintList(int projectId);

        [OperationContract]
        List<string> SearchForSprintUser(string searchString, bool productOwner, bool scrumMaster, bool developer, int projectId);

        [OperationContract]
        bool AddSprintStory(int storyId, int sprintId);

        [OperationContract]
        List<string> GetSprintStories(int sprintId);

        [OperationContract]
        List<string> GetUserSprints(string email);
    }
}
