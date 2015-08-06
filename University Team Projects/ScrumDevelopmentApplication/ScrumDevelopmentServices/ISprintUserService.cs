using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{
    /// <summary>
    /// This interface determines the operations that have to be defined in the sprintuser service
    /// </summary>

    [ServiceContract]
    public interface ISprintUserService
    {
        [OperationContract]
        bool InsertSprintUser(string email, bool scrumMaster, bool productOwner, bool developer, int projectId, int sprintId);

        [OperationContract]
        string[] GetProjectTeamList(string sprintId);

        [OperationContract]
        bool IsProjectOwner(string email, string sprintId);

        [OperationContract]
        bool IsProductOwner(string email, string sprintId);

        [OperationContract]
        bool IsScrumMaster(string email, string sprintId);

        [OperationContract]
        bool IsDeveloper(string email, string sprintId);

        [OperationContract]
        bool IsUserInTheSprint(string email, int sprintId, int projectId);
    }
}
