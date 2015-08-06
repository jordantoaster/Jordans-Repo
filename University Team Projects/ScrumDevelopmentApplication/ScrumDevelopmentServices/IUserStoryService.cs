using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace ScrumDevelopmentServices
{
    /// <summary>
    /// This interface determines the operations that have to be defined in the story service
    /// </summary>
    
    [ServiceContract]
    public interface IUserStoryService
    {
        [OperationContract]
        bool InsertUserStory(int? newSBacklogId, string newTitle, string newDescription, int newPriority, int newProjectId);
        [OperationContract]
        bool UpdateUserStory(int id, string newTitle, string newDescription, int newStoryPoints,
            int newPriority);
        [OperationContract]
        string[] GetUserStory(int userStoryId);
        [OperationContract]
        bool DeleteUserStory(int id);
        [OperationContract]
        bool DoesUserStoryExist(int id);
        [OperationContract]
        int GetLastUserStoryId();
        [OperationContract]
        int GetPriority(int projectId);
        [OperationContract]
        int GetPriorityLength(int projectId);
        [OperationContract]
        int GetUserStoryId(int priority, int projectId);
        [OperationContract]
        int GetPriorityUpdate(int userStoryId);
        [OperationContract]
        string GetDescription(int userStoryId);
        [OperationContract]
        int GetStoryPoints(int userStoryId);
        [OperationContract]
        List<string> GetStoryList(int projectId);  
        [OperationContract]
        int[] GetPriorityList(int projectId);
        [OperationContract]
        bool InsertPriority(int oldpriority, int newpriority, int projectId);
        [OperationContract]
        bool IsStoryInTheSprint(int storyId, int sprintId);
       
    }
}
