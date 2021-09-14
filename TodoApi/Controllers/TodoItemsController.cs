using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using TodoApi.Models;
using ExtensionMethods;

//Raw sql query execution
namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    //[Route("api/[TodoItems]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {

        public TodoItemsController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // GET: api/TodoItems
        [HttpGet]
        public JsonResult GetAll()
        {
            string query = @"select * from dbo.TodoItems";
            DataTable table = new DataTable();
            string sqlDataSource = Configuration.GetConnectionString("TodoAppConnection");
            SqlDataReader myReader;
            List<TodoItemDTO> dtoList = new List<TodoItemDTO>() { };
            int dtoID = 0;
            var dtoName = "";
            var dtoComp = "";
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();

                    while (myReader.Read())
                    {
                        dtoID = (int)myReader.GetInt32(0);
                        dtoName = myReader.GetString(1);
                        dtoComp = myReader.GetString(2);
                        dtoList.Add(ItemToDTO(new TodoItem { Id = dtoID, TodoName = dtoName }));
                    }

                    myReader.Close();
                    myCon.Close();
                }
            }
            DataTable newerTable = MyExtensions.ToDataTable(dtoList);
            return new JsonResult(newerTable);
        }

        // GET: api/TodoItems/{TodoName}
        [HttpGet("{searchQuery}")]
        public JsonResult GetItem(string searchQuery)
        {
            string query = @"select * from dbo.TodoItems where TodoName = '" + searchQuery + @"'";
            DataTable table = new DataTable();
            string sqlDataSource = Configuration.GetConnectionString("TodoAppConnection");
            SqlDataReader myReader;
            List<TodoItemDTO> dtoList = new List<TodoItemDTO>() { };
            int dtoID = 0;
            var dtoName = "";
            var dtoComp = "";
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();

                    while (myReader.Read())
                    {
                        dtoID = (int)myReader.GetInt32(0);
                        dtoName = myReader.GetString(1);
                        dtoComp = myReader.GetString(2);
                    }

                    myReader.Close();
                    myCon.Close();
                }
            }
            try
            {
                dtoList.Add(ItemToDTO(new TodoItem { Id = dtoID, TodoName = dtoName }));
                DataTable newerTable = MyExtensions.ToDataTable(dtoList);
                return new JsonResult(newerTable);
            } catch (Exception)
            {
                return new JsonResult("Bad Request");
            }
        }

        //POST api/TodoItems
        [HttpPost]
        public JsonResult Post(TodoItem todo)
        {
            string query = @"insert into dbo.TodoItems values ('" + todo.TodoName + @"', 'false', '" + todo.TodoSecret + @"')";
            DataTable table = new DataTable();
            string sqlDataSource = Configuration.GetConnectionString("TodoAppConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        //PUT api/TodoItems/{TodoName}
        [HttpPut("{name}")]
        public JsonResult Put(TodoItem todo, string name)
        {
            string query = "";
            if (todo == null)
            {
                return new JsonResult("Bad Request");
            } else
            {
                query = @"update dbo.TodoItems 
                set TodoName = '" + todo.TodoName + @"', 
                TodoSecret = '" + todo.TodoSecret + @"'
                where TodoName = '" + name + @"' ";
            }

            DataTable table = new DataTable();
            string sqlDataSource = Configuration.GetConnectionString("TodoAppConnection");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        //DELETE api/TodoItems/{TodoName}
        [HttpDelete("{name}")]
        public JsonResult Delete(string name)
        {
            if(name.Contains("%20")) {
                name.Replace("%20", " ");
            }
            string query = @"delete from dbo.TodoItems where TodoName = '" + name + @"'";
            DataTable table = new DataTable();
            string sqlDataSource = Configuration.GetConnectionString("TodoAppConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

        //Returns TodoItemDTO Object 
        private static TodoItemDTO ItemToDTO(TodoItem todoItem) =>
        new TodoItemDTO
        {
            Id = todoItem.Id,
            TodoName = todoItem.TodoName,
        };

    }
}



