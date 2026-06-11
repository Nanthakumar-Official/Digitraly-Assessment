import { useForm } from "react-hook-form";

const TaskForm = ({ defaultValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        placeholder="Title"
        {...register("title", {
          required: "Required",
        })}
      />

      <textarea
        placeholder="Description"
        {...register("description", {
          required: "Required",
        })}
      />

      <input
        type="date"
        {...register("dueDate", {
          required: "Required",
        })}
      />

      <select {...register("status")}>
        <option>Pending</option>
        <option>Completed</option>
      </select>

      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
