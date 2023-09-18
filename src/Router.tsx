import { Routes, Route } from "react-router-dom";
import { Forum } from "./pages/Forum";
import { DefaultLayout } from "./layouts/DefaultLayout";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Forum />} />
      </Route>

      {/* Para definir layou comum a todas as páginas que iniciam em /admin */}
      {/* <Route path="/admin" element={<AdminLayout />}>
        <Route path="/" element={<AdminHome />} />
        <Route path="/users" element={<AdminUsers />} />
      </Route> */}
    </Routes>
  );
}
