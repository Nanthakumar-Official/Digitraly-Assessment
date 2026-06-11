import StatusBadge from "./StatusBadge";

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>

            <td>{task.description}</td>

            <td>
              <StatusBadge status={task.status} />
            </td>

            <td>{task.dueDate}</td>

            <td>
              <button onClick={() => onEdit(task.id)}>Edit</button>

              <button onClick={() => onDelete(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
