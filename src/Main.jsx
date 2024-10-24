import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import PostPage from './pages/PostPage';
import AnswerPage from './pages/AnswerPage';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/answer" element={<AnswerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
