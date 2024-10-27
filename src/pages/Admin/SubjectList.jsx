import { useEffect, useState } from 'react';
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

  const fetchData = async () => {
    const offset = PAGE_SIZE * (page - 1);
    const response = await getSubjectListAsync(PAGE_SIZE, offset);
    total = response.count;
    setSubjects(response.results);
  };

  const handleDeleteSubject = async (subjectId) => {
    const result = await deleteSubjectAsync(subjectId);
    if (result === '') alert(result);
    fetchData();
  };

  const handleClickSubject = async (e) => {
    const subjectId = e.target.closest('li').dataset.id;
    const response = await getQuestionList(subjectId);
    setQuestions(response.results);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <ul className={styles.list} onClick={handleClickSubject}>
        {subjects.map((subject) => (
          <SubjectListItem key={subject.id} subject={subject} onDelete={handleDeleteSubject} />
        ))}
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

function SubjectListItem({ subject, onDelete }) {
  const { id, name, createdAt, questionCount } = subject;

  const handleClickLoginButton = () => {
    localStorage.setItem('SubjectId', id);
  };

  const handleClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <li className={styles.item} data-id={id}>
      <p>{id}</p>
      <h4>{name}</h4>
      <p className={styles.date}>{createdAt}</p>
      <div className={styles.question}>
        <img src={ic_message} alt="질문" />
        {questionCount}
      </div>
      <button className={styles.green} onClick={handleClickLoginButton}>
        <img src={ic_user} alt="로그인" />
      </button>
      <button className={styles.red} onClick={handleClickDeleteButton}>
        <img src={ic_trash} alt="삭제" />
      </button>
    </li>
  );
}

export default SubjectList;
