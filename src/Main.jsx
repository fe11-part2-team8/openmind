import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import PostPage from './pages/PostPage';
import AnswerPage from './pages/AnswerPage';
import QuestionCreateForm from './components/QuestionCreateFrom';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="list" element={<ListPage />} />
          <Route path="modal" element={<QuestionCreateForm />} />
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
