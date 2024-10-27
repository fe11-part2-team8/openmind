import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import styles from './SubjectList.module.css';
import { deleteSubject, getSubjectList } from '../../api';
import useAsync from '../../hooks/useAsync';
import ic_user from '../../assets/images/ic_user.svg';
import ic_trash from '../../assets/images/ic_trash.svg';

const PAGE_SIZE = 16;
let total = 0;

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
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

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <ul className={styles.list}>
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
  const { id, name, createdAt } = subject;

  const handleClickLoginButton = () => {
    localStorage.setItem('SubjectId', id);
  };

  const handleClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <li className={styles.item}>
      <p>{id}</p>
      <h4>{name}</h4>
      <p className={styles.date}>{createdAt}</p>
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
