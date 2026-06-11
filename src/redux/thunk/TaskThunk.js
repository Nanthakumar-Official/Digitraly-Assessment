import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";
import dummyTasks from "../../data/tasks.json";

// ─── GET /tasks ───────────────────────────────────────────────────────────────
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/tasks");
      //== return response.data;
    } catch (error) {
      // API not available — returning dummy data
    }
    return dummyTasks;
  },
);

// ─── POST /tasks ──────────────────────────────────────────────────────────────
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/tasks", taskData);
      // return response.data;
    } catch (error) {
      // API not available — returning submitted data
    }
    return { ...taskData, id: Date.now() };
  },
);

// ─── PUT /tasks/:id ───────────────────────────────────────────────────────────
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/tasks/${id}`, taskData);
      // return response.data;
    } catch (error) {
      // API not available — returning updated data
    }
    return { id, ...taskData };
  },
);

// ─── DELETE /tasks/:id ────────────────────────────────────────────────────────
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/tasks/${id}`);
      // return response.data;
    } catch (error) {
      // API not available — returning id
    }
    return id;
  },
);
