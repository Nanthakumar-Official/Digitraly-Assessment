import { useState, useEffect } from "react";
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
 *  - onDragEnd: (result) => void — receives @hello-pangea/dnd result
 *
 * Layout:
 *  - Mobile  (<768px): draggable card stack
 *  - Desktop (≥768px): drag-and-drop table
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
  // ── Detect mobile (JS-driven, no CSS hide/show conflicts with DnD) ──────────
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
        <span className="text-4xl">📋</span>
        <p className="text-sm">No tasks found.</p>
      </div>
    );
  }

  // ── Mobile: Draggable Cards ─────────────────────────────────────────────────
  if (isMobile) {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="mobile-cards">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-3"
            >
              {tasks.map((task, index) => (
                <Draggable
                  key={String(task.id)}
                  draggableId={String(task.id)}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`bg-white border rounded-xl shadow-sm transition-all ${
                        snapshot.isDragging
                          ? "shadow-lg border-blue-300 rotate-1 scale-[1.02]"
                          : "border-gray-200"
                      }`}
                    >
                      {/* Card top: drag handle + title + status */}
                      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
                        {/* Drag handle */}
                        <span
                          {...provided.dragHandleProps}
                          className="text-gray-300 text-xl cursor-grab active:cursor-grabbing select-none flex-shrink-0"
                          title="Drag to reorder"
                        >
                          ⠿
                        </span>

                        <h3 className="flex-1 text-sm font-semibold text-gray-800 leading-snug">
                          {task.title}
                        </h3>

                        <StatusBadge status={task.status} />
                      </div>

                      {/* Description */}
                      <p className="px-4 py-1 text-xs text-gray-500 leading-relaxed">
                        {task.description}
                      </p>

                      {/* Footer: due date + actions */}
                      <div className="flex items-center justify-between px-4 pb-4 pt-2 border-t border-gray-100 mt-2">
                        <span className="text-xs text-gray-400">
                          📅{" "}
                          <span className="text-gray-600 font-medium">
                            {task.dueDate}
                          </span>
                        </span>

                        <div className="flex gap-2">
                          <button
                            onClick={() => onEdit && onEdit(task.id)}
                            className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-indigo-600 active:scale-95 transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete && onDelete(task.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-600 active:scale-95 transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  // ── Desktop: Drag-and-drop Table ────────────────────────────────────────────
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 border border-gray-200 w-10 text-gray-400 text-sm select-none">
                ⠿
              </th>
              {headers.map((h) => (
                <th
                  key={h.key}
                  className="p-3 border border-gray-200 text-left text-sm font-semibold text-gray-700"
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>

          <Droppable droppableId="desktop-table">
            {(provided) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, index) => (
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
                        {/* Drag handle */}
                        <td
                          {...provided.dragHandleProps}
                          className="p-3 border border-gray-200 text-center text-gray-400 cursor-grab active:cursor-grabbing select-none text-lg"
                          title="Drag to reorder"
                        >
                          ⠿
                        </td>

                        {headers.map((h) => (
                          <td
                            key={h.key}
                            className="p-3 border border-gray-200 text-sm text-gray-700"
                          >
                            {h.key === "status" ? (
                              <StatusBadge status={task.status} />
                            ) : h.key === "actions" ? (
                              <div className="flex gap-2 justify-center">
                                <button
                                  onClick={() => onEdit && onEdit(task.id)}
                                  className="bg-indigo-500 text-white px-3 py-1 rounded text-sm hover:bg-indigo-600 transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    onDelete && onDelete(task.id)
                                  }
                                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            ) : (
                              task[h.key] ?? "—"
                            )}
                          </td>
                        ))}
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </div>
    </DragDropContext>
  );
};

export default TaskTable;
