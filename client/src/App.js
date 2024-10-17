import DashboardLayout from "module/dashboard/DashboardLayout";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Auth from "./views/Auth";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import DashboardPage from "pages/DashboardPage";
import PostManage from "module/post/PostManage";
import PostAddNew from "module/post/PostAddNew";
import UserProfile from "module/user/UserProfile";
import DetailPage from "pages/DetailPage";
import UserInfo from "module/user/UserInfo";
import BlogPage from "pages/BlogPage";
import AdminPage from "pages/AdminPage";
import AdminUserManage from "pages/AdminUserManage";
import PostUpdate from "module/post/PostUpdate";
import ContactPage from "pages/ContactPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/sign-in" element={<Auth authRoute="sign-in" />} />
        <Route path="/sign-up" element={<Auth authRoute="sign-up" />} />
        <Route path="/post/:slug" element={<DetailPage></DetailPage>}></Route>
        <Route path="/admin" element={<AdminPage></AdminPage>}></Route>
        <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
        <Route
          path="/admin/user-manage"
          element={<AdminUserManage></AdminUserManage>}
        ></Route>
        <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
        <Route path="/user/:slug" element={<UserInfo></UserInfo>}></Route>
        <Route element={<ProtectedRoute Component={DashboardLayout} />}>
          <Route
            path="/dashboard"
            element={<DashboardPage></DashboardPage>}
          ></Route>
          <Route
            path="/manage/posts"
            element={<PostManage></PostManage>}
          ></Route>
          <Route
            path="/manage/update-post/:slug"
            element={<PostUpdate></PostUpdate>}
          ></Route>
          <Route
            path="/manage/add-post"
            element={<PostAddNew></PostAddNew>}
          ></Route>
          <Route
            path="/manage/update-user"
            element={<UserProfile></UserProfile>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
