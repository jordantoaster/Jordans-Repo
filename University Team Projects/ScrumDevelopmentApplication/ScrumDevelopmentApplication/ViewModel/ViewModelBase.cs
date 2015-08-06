using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScrumDevelopmentApplication.ViewModel
{
    /// <summary>
    /// A helper class that may be potentiall useful for data binding
    /// </summary>
    public class ViewModelBase : INotifyPropertyChanged 
    {
        internal void RaisePropertyChanged(string prop)
        {
            if (PropertyChanged != null) { PropertyChanged(this, new PropertyChangedEventArgs(prop)); }
        }
        public event PropertyChangedEventHandler PropertyChanged; 
    }
}
