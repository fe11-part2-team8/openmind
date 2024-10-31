import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SubjectListPage from './pages/SubjectList.page';
import PostPage from './pages/PostPage';
import AdminPage from './pages/Admin/Admin.page';
import NotFound from './pages/NotFound';
import './global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="list" element={<SubjectListPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="post">
          <Route path=":id">
            <Route index element={<PostPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
