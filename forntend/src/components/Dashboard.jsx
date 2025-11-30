import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import React from "react";
import withAuth from "./Auth";

const Dashboard = () => {
  const {
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleGetAllTask,
    handleGetCompletedTask,
    handleCompleteTask
  } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null); // null = add mode
  const [error, setError] = useState("");

  const loadAllTasks = async () => {
    try {
      const result = await handleGetAllTask();
      //console.log(result);
      
      setTasks(result || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load tasks");
    }
  };

  const loadCompletedTasks = async () => {
    try {
      const result = await handleGetCompletedTask();
      console.log(result);
      console.log(completed);
      
      setCompleted(result.taskDetails || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load completed tasks");
    }
  };

  useEffect(() => {
    loadAllTasks();
    loadCompletedTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingTaskId) {
        // UPDATE MODE
        await handleUpdateTask(editingTaskId, title, desc);
        alert("Task updated");
      } else {
        // ADD MODE
        await handleAddTask(title, desc);
        alert("Task added");
      }

      setTitle("");
      setDesc("");
      setEditingTaskId(null);
      loadAllTasks();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setTitle(task.title);
    setDesc(task.description);
  };

  const handleDeleteClick = async (id) => {
    try {
      await handleDeleteTask(id);
      alert("Task deleted");
      loadAllTasks();
      loadCompletedTasks()
    } catch (err) {
      console.log(err);
      setError("Failed to delete task");
    }
  };

  // You can add a markCompleted handler if you have that API:
  const handleMarkCompleted = async (id) => {
      try {
         await handleCompleteTask(id)
        
        alert("task completed")
        loadCompletedTasks()
         loadAllTasks()
      } catch (error) {
        console.log(error);
        setError("failed to complete task")
        
      }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Add / Update Form */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editingTaskId ? "Update Task" : "Add Task"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            placeholder="Task description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border p-2 rounded"
            rows={3}
            required
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingTaskId ? "Update Task" : "Add Task"}
          </button>

          {editingTaskId && (
            <button
              type="button"
              onClick={() => {
                setEditingTaskId(null);
                setTitle("");
                setDesc("");
              }}
              className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* All Tasks */}
      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Tasks</h2>
          <button
            onClick={loadAllTasks}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Refresh
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="border p-3 rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-gray-600 text-sm">{task.description}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                    onClick={() => handleEditClick(task)}
                  >
                    Update
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                    onClick={() => handleDeleteClick(task._id)}
                  >
                    Delete
                  </button>

                  {/* If you have mark complete API, enable this */} 
                  
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                    onClick={() => handleMarkCompleted(task._id)}
                  >
                    Completed
                  </button>
                 
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

       {/* Completed Tasks */}
      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Completed Tasks</h2>
          <button
            onClick={loadCompletedTasks}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        {completed ?  (
          <ul className="space-y-3">
            { completed.map((task) => (
              <>
                <li key={task._id} className="border p-3 rounded flex justify-between">
                  <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-gray-600 text-sm">{task.description}</p>
                  </div>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                    onClick={() => handleDeleteClick(task._id)}
                  >
                    Delete
                  </button>
                  
                  
                  
                </li>
                
              </>
              
            ))}
          </ul>
          ):
          (
            <p className="text-gray-500">No completed tasks.</p>
          )
        }
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
