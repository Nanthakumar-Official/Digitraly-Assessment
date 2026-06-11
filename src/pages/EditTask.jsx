import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { updateTask } from "../redux/thunk/TaskThunk";

const EditTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => state.tasks);

  const task = tasks.find((item) => item.id === Number(id));

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (task) {
      reset(task);
    }
  }, [task, reset]);

  const onSubmit = (data) => {
    dispatch(
      updateTask({
        id: Number(id),
        taskData: data,
      }),
    );

    navigate("/tasks");
  };

  const handleToggleStatus = () => {
    const currentStatus = watch("status");

    reset({
      ...task,
      status: currentStatus === "Pending" ? "Completed" : "Pending",
    });
  };

  if (!task) {
    return <div className="text-center mt-10">Task Not Found</div>;
  }

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
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold">Edit Task</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Task Title</label>

          <input
            type="text"
            {...register("title", {
              required: "Title is required",
            })}
            className="w-full border rounded-lg p-2"
          />

          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>

          <textarea
            rows="4"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full border rounded-lg p-2"
          />

          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
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
            <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
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

        {/* Toggle Status */}
        <button
          type="button"
          onClick={handleToggleStatus}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Toggle Status
        </button>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Update Task
          </button>

          <button
            type="button"
            onClick={() => navigate("/tasks")}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
