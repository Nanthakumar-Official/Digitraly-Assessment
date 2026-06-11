import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { createTask } from "../redux/thunk/TaskThunk";

const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "Pending",
      dueDate: "",
    },
  });

  const onSubmit = (data) => {
    const taskData = {
      id: Date.now(),
      ...data,
    };

    dispatch(createTask(taskData));

    navigate("/tasks");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => navigate("/tasks")}
          className="text-gray-600 hover:text-gray-800 transition-colors focus:outline-none flex items-center justify-center"
          title="Back to Task List"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold">Create New Task</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Task Title</label>

          <input
            type="text"
            placeholder="Enter task title"
            {...register("title", {
              required: "Task title is required",
            })}
            className="w-full border rounded-lg p-2"
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>

          <textarea
            rows="4"
            placeholder="Enter task description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border rounded-lg p-2"
          />

          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <label className="block mb-1 font-medium">Due Date</label>

          <input
            type="date"
            {...register("dueDate", {
              required: "Due date is required",
            })}
            className="w-full border rounded-lg p-2"
          />

          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>

          <select
            {...register("status")}
            className="w-full border rounded-lg p-2"
          >
            <option value="Pending">Pending</option>

            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Task
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
