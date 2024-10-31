import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import SubjectListPage from './pages/SubjectList.page';
import PostPage from './pages/PostPage';
import AnswerPage from './pages/AnswerPage';
import AdminPage from './pages/Admin/Admin.page';
import NotFound from './pages/NotFound';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="list" element={<SubjectListPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="post">
            <Route path=":id">
              <Route index element={<PostPage />} />
              <Route path="answer" element={<AnswerPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
