import './global.css';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import {
  postSubject,
  getAllSubject,
  getSubject,
  deleteSubject,
  postQuestions,
  getAllQuestions,
  getQuestions,
  deleteQuestions,
  postReaction,
  postAnswers,
  getAnswers,
  deleteAnswers,
  putAnswers,
  patchAnswers,
} from './api';
import FeedFrom from './components/FeedForm';

function Links() {
  return (
    <ul className="inline-flex gap-3 border p-1">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/list">List</Link>
      </li>
      <li>
        <Link to="/post/1">Post</Link>
      </li>
      <li>
        <Link to="/post/1/answer">Answer</Link>
      </li>
    </ul>
  );
}

export default function App() {
  /* 나중에 작업하실 땐 아래에 있는 함수 모두 지워주세요! 테스트용임 */

  const [subjectId, setSubjectId] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [answerId, setAnswerId] = useState('');

  const handlePostSubject = async () => {
    const result = await postSubject('테스트씨');
    console.log(`피드 ID : ${result}`);
    setSubjectId(result);
  };

  const handleGetAllSubject = async () => {
    console.log(await getAllSubject());
  };

  const handleGetSubject = async () => {
    console.log(await getSubject(subjectId));
  };

  const handleDeleteSubject = async () => {
    console.log(await deleteSubject(subjectId));
  };

  const handlePostQuestions = async () => {
    const result = await postQuestions('테스트 질문입니다.', subjectId);
    console.log(`질문한 ID : ${result}`);
    setQuestionId(result);
  };

  const handleGetAllQuestions = async () => {
    console.log(await getAllQuestions(subjectId));
  };

  const handleGetQuestions = async () => {
    console.log(await getQuestions(questionId));
  };

  const handleDeleteQuestions = async () => {
    deleteQuestions(questionId);
  };

  const handlePostReaction = async () => {
    postReaction(questionId, 'like');
  };

  const handlePostAnswers = async () => {
    const result = await postAnswers('테스트 답변입니다.', questionId);
    console.log(`답변한 ID : ${result}`);
    setAnswerId(result);
  };

  const handleGetAnswers = async () => {
    console.log(await getAnswers(answerId));
  };

  const handlePutAnswers = async () => {
    putAnswers('수정한 테스트 답변입니다.(put)', answerId);
  };

  const handlePatchAnswers = async () => {
    patchAnswers('수정한 테스트 답변입니다.(patch)', answerId);
  };

  const handleDeleteAnswers = async () => {
    deleteAnswers(answerId);
  };

  return (
    <main>
      <Links />
      <Outlet />

      {/* 나중에 작업하실 땐 아래 div 삭제해주세요! 테스트용임 */}
      <div>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <hr style={{ margin: '30px 0' }} />
        <h2 className="text-2xl font-bold">SUBJECT</h2>
        <button onClick={handlePostSubject}>SUBJECT POST</button>
        <br />
        <button onClick={handleGetAllSubject}>ALL SUBJECT GET</button>
        <br />
        <button onClick={handleGetSubject}>SUBJECT GET</button>
        <br />
        <button onClick={handleDeleteSubject}>SUBJECT DELETE</button>
        <hr style={{ margin: '30px 0' }} />
        <h2 className="text-2xl font-bold">QUESTIONS</h2>
        <button onClick={handlePostQuestions}>QUESTION POST</button>
        <br />
        <button onClick={handleGetAllQuestions}>ALL QUESTION GET</button>
        <br />
        <button onClick={handleGetQuestions}>QUESTION GET</button>
        <br />
        <button onClick={handleDeleteQuestions}>QUESTION DELETE</button>
        <hr style={{ margin: '30px 0' }} />
        <h2 className="text-2xl font-bold">REACTION</h2>
        <button onClick={handlePostReaction}>REACTION POST</button>
        <hr style={{ margin: '30px 0' }} />
        <h2 className="text-2xl font-bold">ANSWERS</h2>
        <button onClick={handlePostAnswers}>ANSWER POST</button>
        <br />
        <button onClick={handleGetAnswers}>ANSWER GET</button>
        <br />
        <button onClick={handlePutAnswers}>ANSWER PUT</button>
        <br />
        <button onClick={handlePatchAnswers}>ANSWER PATCH</button>
        <br />
        <button onClick={handleDeleteAnswers}>ANSWER DELETE</button>
        <FeedFrom></FeedFrom>
      </div>
    </main>
  );
}
