import { Routes, Route } from "react-router-dom";
import { Forum } from "./pages/Forum";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Menu } from "./pages/Menu";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Menu />} />
        <Route path="/forum/:subjectId" element={<Forum />} />
      </Route>

      {/* Para definir layou comum a todas as páginas que iniciam em /admin */}
      {/* <Route path="/admin" element={<AdminLayout />}>
        <Route path="/" element={<AdminHome />} />
        <Route path="/users" element={<AdminUsers />} />
      </Route> */}
    </Routes>
  );
}
