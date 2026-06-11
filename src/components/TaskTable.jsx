import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import StatusBadge from "./StatusBadge";

/**
 * Reusable TaskTable component.
 *
 * Props:
 *  - tasks    : array of task objects to display
 *  - headers  : array of { key, label } — drives column order dynamically
 *  - onEdit   : (id) => void
 *  - onDelete : (id) => void
 *  - onDragEnd: (result) => void — receives react-beautiful-dnd result
 */

const DEFAULT_HEADERS = [
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
  { key: "status", label: "Status" },
  { key: "dueDate", label: "Due Date" },
  { key: "actions", label: "Actions" },
];

const TaskTable = ({
  tasks = [],
  headers = DEFAULT_HEADERS,
  onEdit,
  onDelete,
  onDragEnd,
}) => {
  const renderCell = (task, key) => {
    switch (key) {
      case "status":
        return <StatusBadge status={task.status} />;

      case "actions":
        return (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => onEdit && onEdit(task.id)}
              className="bg-indigo-500 text-white px-3 py-1 rounded text-sm hover:bg-indigo-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete && onDelete(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        );

      default:
        return task[key] ?? "—";
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {/* Drag handle header */}
            <th className="p-3 border border-gray-300 w-10 text-gray-400 text-sm select-none">
              ⠿
            </th>
            {headers.map((h) => (
              <th
                key={h.key}
                className="p-3 border border-gray-300 text-left text-sm font-semibold text-gray-700"
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>

        <Droppable droppableId="task-table">
          {(provided) => (
            <tbody ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan={headers.length + 1}
                    className="text-center p-6 text-gray-500"
                  >
                    No tasks found.
                  </td>
                </tr>
              ) : (
                tasks.map((task, index) => (
                  <Draggable
                    key={String(task.id)}
                    draggableId={String(task.id)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`transition-colors ${
                          snapshot.isDragging
                            ? "bg-blue-50 shadow-lg"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {/* Drag handle cell */}
                        <td
                          {...provided.dragHandleProps}
                          className="p-3 border border-gray-300 text-center text-gray-400 cursor-grab active:cursor-grabbing select-none text-lg"
                          title="Drag to reorder"
                        >
                          ⠿
                        </td>

                        {headers.map((h) => (
                          <td
                            key={h.key}
                            className="p-3 border border-gray-300 text-sm text-gray-700"
                          >
                            {renderCell(task, h.key)}
                          </td>
                        ))}
                      </tr>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  );
};

export default TaskTable;
