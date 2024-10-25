import './global.css';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import {
  postSubject,
  getSubjectList,
  getSubject,
  deleteSubject,
  postQuestion,
  getQuestionList,
  getQuestion,
  deleteQuestion,
  postReaction,
  postAnswer,
  getAnswer,
  deleteAnswer,
  putAnswer,
  patchAnswer,
} from './api';

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

  const handleGetSubjectList = async () => {
    console.log(await getSubjectList());
  };

  const handleGetSubject = async () => {
    console.log(await getSubject(subjectId));
  };

  const handleDeleteSubject = async () => {
    console.log(await deleteSubject(subjectId));
  };

  const handlePostQuestion = async () => {
    const result = await postQuestion('테스트 질문입니다.', subjectId);
    console.log(`질문한 ID : ${result}`);
    setQuestionId(result);
  };

  const handleGetQuestionList = async () => {
    console.log(await getQuestionList(subjectId));
  };

  const handleGetQuestion = async () => {
    console.log(await getQuestion(questionId));
  };

  const handleDeleteQuestion = async () => {
    deleteQuestion(questionId);
  };

  const handlePostReaction = async () => {
    postReaction(questionId, 'like');
  };

  const handlePostAnswer = async () => {
    const result = await postAnswer('테스트 답변입니다.', questionId);
    console.log(`답변한 ID : ${result}`);
    setAnswerId(result);
  };

  const handleGetAnswer = async () => {
    console.log(await getAnswer(answerId));
  };

  const handlePutAnswer = async () => {
    putAnswer('수정한 테스트 답변입니다.(put)', answerId);
  };

  const handlePatchAnswer = async () => {
    patchAnswer('수정한 테스트 답변입니다.(patch)', answerId);
  };

  const handleDeleteAnswer = async () => {
    deleteAnswer(answerId);
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
        <button onClick={handleGetSubjectList}>ALL SUBJECT GET</button>
        <br />
        <button onClick={handleGetSubject}>SUBJECT GET</button>
        <br />
        <button onClick={handleDeleteSubject}>SUBJECT DELETE</button>
        <hr style={{ margin: '30px 0' }} />
        <h2 className="text-2xl font-bold">QUESTIONS</h2>
        <button onClick={handlePostQuestion}>QUESTION POST</button>
        <br />
        <button onClick={handleGetQuestionList}>ALL QUESTION GET</button>
        <br />
        <button onClick={handleGetQuestion}>QUESTION GET</button>
        <br />
        <button onClick={handleDeleteQuestion}>QUESTION DELETE</button>
        <hr style={{ margin: '30px 0' }} />
        <h2 className="text-2xl font-bold">REACTION</h2>
        <button onClick={handlePostReaction}>REACTION POST</button>
        <hr style={{ margin: '30px 0' }} />
        <h2 className="text-2xl font-bold">ANSWERS</h2>
        <button onClick={handlePostAnswer}>ANSWER POST</button>
        <br />
        <button onClick={handleGetAnswer}>ANSWER GET</button>
        <br />
        <button onClick={handlePutAnswer}>ANSWER PUT</button>
        <br />
        <button onClick={handlePatchAnswer}>ANSWER PATCH</button>
        <br />
        <button onClick={handleDeleteAnswer}>ANSWER DELETE</button>
      </div>
    </main>
  );
}
