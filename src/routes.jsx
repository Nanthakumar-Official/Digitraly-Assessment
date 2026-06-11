import { BrowserRouter, Routes, Route } from "react-router-dom";

import TaskList from "./pages/TaskList";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />

        <Route path="/tasks/new" element={<CreateTask />} />

        <Route path="/tasks/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
