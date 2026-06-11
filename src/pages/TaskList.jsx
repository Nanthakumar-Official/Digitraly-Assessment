import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getTasks, deleteTask } from "../redux/thunk/TaskThunk";
import { reorderTasks } from "../redux/features/TaskSlice";
import TaskTable from "../components/TaskTable";

// Dynamic table headers — drives TaskTable columns
const TABLE_HEADERS = [
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
  { key: "status", label: "Status" },
  { key: "dueDate", label: "Due Date" },
  { key: "actions", label: "Actions" },
];

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks, loading } = useSelector((state) => state.tasks);

  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  /** Returns the filtered subset of tasks */
  const getFiltered = (taskList) =>
    statusFilter === "All"
      ? taskList
      : taskList.filter((task) => task.status === statusFilter);

  /**
   * Drag-end handler.
   * Reorders only the visible (filtered) tasks, then merges them
   * back into the full list at their original positions.
   */
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const displayed = getFiltered(tasks);

    // Reorder within the displayed subset
    const reordered = Array.from(displayed);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    if (statusFilter === "All") {
      // Simple: dispatch the fully reordered list
      dispatch(reorderTasks(reordered));
    } else {
      // Merge: keep non-filtered tasks in place, replace filtered tasks
      // at their original positions with the newly ordered ones
      let reorderedIdx = 0;
      const merged = tasks.map((task) => {
        if (task.status === statusFilter) {
          return reordered[reorderedIdx++];
        }
        return task;
      });
      dispatch(reorderTasks(merged));
    }
  };

  const filteredTasks = getFiltered(tasks);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>

        <button
          onClick={() => navigate("/tasks/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          + Create Task
        </button>
      </div>

      {/* Status Filter */}
      <div className="mb-4 flex items-center gap-3">
        <label className="font-medium text-gray-700">Filter by Status:</label>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All Tasks</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <span className="text-sm text-gray-500">
          {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading tasks...</div>
      ) : (
        <div className="overflow-x-auto shadow-sm rounded-lg">
          <TaskTable
            tasks={filteredTasks}
            headers={TABLE_HEADERS}
            onEdit={(id) => navigate(`/tasks/${id}`)}
            onDelete={handleDelete}
            onDragEnd={handleDragEnd}
          />
        </div>
      )}

      {/* Drag hint */}
      {!loading && filteredTasks.length > 1 && (
        <p className="text-xs text-gray-400 mt-2">
          ⠿ Drag rows to reorder tasks
        </p>
      )}
    </div>
  );
};

export default TaskList;
