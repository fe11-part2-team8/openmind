import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//
import { getAllSubject } from '../api';
//
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import styles from './SubjectList.page.module.css';

/**
 * 서브젝트 리스트 페이지 상단 컴포넌트
 * @return {JSX}
 */
function Header() {
  const id = window.localStorage.getItem('id');

  return (
    <div className="flex items-center justify-between py-10">
      <h2>
        <Link to="/">
          <Logo />
        </Link>
      </h2>

      <Link to={id ? `/post/${id}/answer` : '/'} className="border px-4 py-2">
        답변하러 가기
      </Link>
    </div>
  );
}

/**
 * 서브젝트 리스트 페이지 > 서브젝트 리스트의 아이템
 * @param {object} props
 * @param {number} props.id : 서브젝트 아이디
 * @param {string} props.name : 서브젝트 생성자 이름
 * @param {string} props.imageSource : 서브젝트 생성자 썸네일
 * @param {number} props.questionCount : 서브젝트의 질문 갯수
 * @return {React.JSX} 서브젝트 리스트의 아이템
 */
function Subject({ id, name, imageSource, questionCount }) {
  return (
    <li className={styles.card}>
      <figure className={styles.thumbnail}>
        <img src={imageSource} alt={`${name} 썸네일`} />
      </figure>
      <a href={`/post/${id}`} className="stretched-link">
        {name}
      </a>
      <div className="flex justify-between">
        <span>받은 질문</span>
        <span>{questionCount}개</span>
      </div>
    </li>
  );
}

/**
 * 서브젝트 목록 페이지
 * @return {JSX}
 */
function SubjectListPage() {
  const [subjects, setSubjects] = useState([]);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    let sorted;
    if (value === 'name') {
      // 문자열 정렬
      sorted = subjects.sort((a, b) => (a[value] > b[value] ? 1 : -1));
    } else {
      // 날짜 정렬
      sorted = subjects.sort((a, b) => new Date(b[value]) - new Date(a[value]));
    }
    setSubjects([...sorted]);
  };

  useEffect(() => {
    const getSubjectList = async () => {
      const result = await getAllSubject();
      if (!result) return;

      setSubjects(result.results);
    };

    getSubjectList();
  }, []);

  return (
    <div className="container mx-auto">
      <Header />

      <div className="my-4 text-center">
        <h1 className="h1">누구에게 질문할까요?</h1>

        <select
          className="rounded border px-4 py-2"
          defaultValue="createdAt"
          onChange={handleSelectChange}
        >
          <option value="name">이름순</option>
          <option value="createdAt">최신순</option>
        </select>
      </div>

      <ul className={styles.cards}>
        {subjects.map(({ id, name, imageSource, questionCount }) => (
          <Subject
            key={id}
            id={id}
            name={name}
            imageSource={imageSource}
            questionCount={questionCount}
          />
        ))}
      </ul>
    </div>
  );
}

export default SubjectListPage;
