import { useCallback, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import styles from './SubjectList.module.css';
import { deleteSubject, getQuestionList, getSubjectList } from '../../api';
import useAsync from '../../hooks/useAsync';
import ic_user from '../../assets/images/ic_user.svg';
import ic_trash from '../../assets/images/ic_trash.svg';
import ic_message from '../../assets/images/ic_message.svg';

const PAGE_SIZE = 16;
let total = 0;

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const [qusetions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const {
    loading: loadingRead,
    error: errorRead,
    wrappedFunction: getSubjectListAsync,
  } = useAsync(getSubjectList);
  const {
    loading: loadingDelete,
    error: errorDelete,
    wrappedFunction: deleteSubjectAsync,
  } = useAsync(deleteSubject);

  const fetchData = useCallback(async () => {
    const offset = PAGE_SIZE * (page - 1);
    const response = await getSubjectListAsync(PAGE_SIZE, offset);
    total = response.count;
    setSubjects(response.results);
  }, [page, getSubjectListAsync]);

  const handleDeleteSubject = async (subjectId) => {
    const result = await deleteSubjectAsync(subjectId);
    if (result === '') alert(result);
    fetchData();
  };

  const handleClickSubject = async (e) => {
    if (e.target.closest(`.${styles.item}`) == null) return;

    const subjectId = e.target.closest(`.${styles.item}`).dataset.id;

    if (subjectId === String(selected)) {
      setSelected(null);
      return;
    }

    const response = await getQuestionList(subjectId);
    setSelected(Number(subjectId));
    setQuestions(response.results);
  };

  useEffect(() => {
    fetchData();
  }, [page, fetchData]);

  return (
    <>
      <ul className={styles.list} onClick={handleClickSubject}>
        {subjects.map((subject) => {
          return (
            <SubjectListItem
              key={subject.id}
              selected={selected === subject.id}
              subject={subject}
              questions={qusetions}
              onDelete={handleDeleteSubject}
            />
          );
        })}
      </ul>
      <Pagination
        activePage={page}
        totalItemsCount={total}
        itemsCountPerPage={PAGE_SIZE}
        onChange={setPage}
        hideFirstLastPages={true}
        prevPageText="&lt;"
        nextPageText="&gt;"
      />
    </>
  );
}

function SubjectListItem({ selected, subject, onDelete, questions }) {
  const { id, name, createdAt, questionCount } = subject;

  const handleClickLoginButton = () => {
    localStorage.setItem('SubjectId', id);
  };

  const handleClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <li className={selected ? styles.selected : ''}>
      <div className={styles.item} data-id={id}>
        <p>{id}</p>
        <h4>{name}</h4>
        <p className={styles.date}>{createdAt}</p>
        <div className={styles.questionCount}>
          <img src={ic_message} alt="질문" />
          {questionCount}
        </div>
        <button onClick={handleClickLoginButton}>
          <img src={ic_user} alt="로그인" />
        </button>
        <button onClick={handleClickDeleteButton}>
          <img src={ic_trash} alt="삭제" />
        </button>
      </div>
      {selected && <QuestionList questions={questions} />}
    </li>
  );
}

function QuestionList({ questions }) {
  return (
    <ul>
      {questions.map((question) => {
        const { id, content, createdAt, answer } = question;
        return (
          <li key={question.id} className={styles.question}>
            <p>Q. {id}</p>
            <p>{content}</p>
            <p className={styles.date}>{createdAt}</p>
            <div className={styles.answer}>
              <p>A. {answer.id}</p>
              <p>{answer.content}</p>
              <p className={styles.date}>{answer.createdAt}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default SubjectList;
