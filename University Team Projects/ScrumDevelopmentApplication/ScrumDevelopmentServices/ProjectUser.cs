//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ScrumDevelopmentServices
{
    using System;
    using System.Collections.Generic;
    
    public partial class ProjectUser
    {
        public ProjectUser()
        {
            this.SprintUsers = new HashSet<SprintUser>();
        }
    
        public string userEmail { get; set; }
        public int projectId { get; set; }
        public string roleName { get; set; }
    
        public virtual Project Project { get; set; }
        public virtual Role Role { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<SprintUser> SprintUsers { get; set; }
    }
}
