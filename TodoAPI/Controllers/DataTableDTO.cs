// Credit: Automation Curry Puff https://automationcurrypuff.home.blog/2019/08/01/how-to-convert-a-list-of-class-objects-into-datatable-in-c/

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ExtensionMethods
{
    public static class MyExtensions
    {
        public static DataTable ToDataTable<T>(this IEnumerable<T> self)
        {
            var properties = typeof(T).GetProperties();

            var dataTable = new DataTable();
            foreach (var info in properties)
                dataTable.Columns.Add(info.Name, Nullable.GetUnderlyingType(info.PropertyType)
                   ?? info.PropertyType);

            foreach (var entity in self)
                dataTable.Rows.Add(properties.Select(p => p.GetValue(entity)).ToArray());

            return dataTable;
        }
    }
}
