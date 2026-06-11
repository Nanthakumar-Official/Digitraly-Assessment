import { createSlice } from "@reduxjs/toolkit";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../thunk/TaskThunk";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  selectedTask: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    setSelectedTask(state, action) {
      state.selectedTask = action.payload;
    },

    reorderTasks(state, action) {
      state.tasks = action.payload;
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("tasks", JSON.stringify(action.payload));
      }
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })

      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id,
        );

        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const { setSelectedTask, reorderTasks } = taskSlice.actions;

export default taskSlice.reducer;
