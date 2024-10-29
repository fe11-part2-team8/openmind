import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import SubjectListPage from './pages/SubjectList.page';
import PostPage from './pages/PostPage';
import AnswerPage from './pages/AnswerPage';
import QuestionCreateModal from './components/QuestionCreateModal';
import AnswerCreateForm from './components/AnswerCreateForm';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="list" element={<SubjectListPage />} />
          <Route path="answercreateform" element={<AnswerCreateForm />} />
          <Route path="modal" element={<QuestionCreateModal />} />
          <Route path="post">
            <Route path=":id">
              <Route index element={<PostPage />} />
              <Route path="answer" element={<AnswerPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
