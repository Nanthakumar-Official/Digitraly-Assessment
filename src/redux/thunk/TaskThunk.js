import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";
import dummyTasks from "../../data/tasks.json";

const loadTasks = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const data = localStorage.getItem("tasks");
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        // Fallback
      }
    }
  }
  return dummyTasks;
};

const saveTasks = (tasks) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

// ─── GET /tasks ───────────────────────────────────────────────────────────────
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await axios.get("/tasks");
      //== return response.data;
    } catch (error) {
      // API not available — returning dummy data
    }
    return loadTasks();
  },
);

// ─── POST /tasks ──────────────────────────────────────────────────────────────
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      // const response = await axios.post("/tasks", taskData);
      // return response.data;
    } catch (error) {
      // API not available — returning submitted data
    }
    const tasks = loadTasks();
    const newTask = { ...taskData, id: taskData.id || Date.now() };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
  },
);

// ─── PUT /tasks/:id ───────────────────────────────────────────────────────────
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      // const response = await axios.put(`/tasks/${id}`, taskData);
      // return response.data;
    } catch (error) {
      // API not available — returning updated data
    }
    const tasks = loadTasks();
    const updated = { ...taskData, id };
    const newTasks = tasks.map((task) => (task.id === id ? updated : task));
    saveTasks(newTasks);
    return updated;
  },
);

// ─── DELETE /tasks/:id ────────────────────────────────────────────────────────
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      // const response = await axios.delete(`/tasks/${id}`);
      // return response.data;
    } catch (error) {
      // API not available — returning id
    }
    const tasks = loadTasks();
    const newTasks = tasks.filter((task) => task.id !== id);
    saveTasks(newTasks);
    return id;
  },
);
