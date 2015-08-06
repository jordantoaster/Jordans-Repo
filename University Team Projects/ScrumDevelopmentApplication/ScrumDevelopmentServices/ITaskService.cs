using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{
    /// <summary>
    /// This interface determines the operations that have to be defined in the task service
    /// </summary>

    [ServiceContract]
    public interface ITaskService
    {
        [OperationContract]
        bool InsertTask(string name, string description, bool? blocked, string reason, int hours, int userStoryId);

        [OperationContract]
        bool EditTask(int id, string newName, string newDescription, int newHours, bool? newBlocked, string newReason);

        [OperationContract]
        string GetName(int id);

        [OperationContract]
        string GetDescription(int id);

        [OperationContract]
        int? GetHours(int id);

        [OperationContract]
        bool? GetBlocked(int id);

        [OperationContract]
        string GetReason(int id);

        [OperationContract]
        string GetOwner(int id);

        [OperationContract]
        bool BlockTask(int id, string reason);

        [OperationContract]
        bool DeleteTask(int id);

        [OperationContract]
        bool AssignTask(int id, string userEmail);

        [OperationContract]
        string[] GetTaskList(int userStoryId);

        [OperationContract]
        int GetLastTaskId();
    }
}
