import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
//
import { getSubjectList } from '../api';
//
import logo from '../assets/images/logo.svg';
import styles from './SubjectList.page.module.css';
import { ReactComponent as IconArrowRight } from '../assets/images/icon-arrow-right.svg';
import { ReactComponent as IconMessage } from '../assets/images/ic_message.svg';

/**
 * 서브젝트 리스트 페이지 상단 컴포넌트
 * @return {React.JSX}
 */
function Header() {
  const id = window.localStorage.getItem('id');

  return (
    <div className="flex flex-col items-center justify-between py-10 sm:flex-row">
      <h2>
        <Link to="/">
          <img src={logo} alt="Open Mind" width="146" height="57" />
        </Link>
      </h2>

      <Link to={id ? `/post/${id}/answer` : '/'} className="btn btn-outline">
        답변하러 가기
        <IconArrowRight />
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

      <a href={`/post/${id}`} className="stretched-link body1 mt-3 block truncate">
        {name}
      </a>

      <div className={styles.meta}>
        <div className="flex items-center gap-1">
          <IconMessage width="18" height="18" />
          <span>받은 질문</span>
        </div>
        <span>{questionCount}개</span>
      </div>
    </li>
  );
}

// 서브젝트 리스트 갯수 제한
const LIMIT = 8;
// 서브젝트 리스트 총 갯수
let total = 0;
// 정렬 함수 객체
const sorting = {
  name: (arr) => arr.sort((a, b) => (a['name'] > b['name'] ? 1 : -1)),
  createdAt: (arr) => arr.sort((a, b) => new Date(b['createdAt']) - new Date(a['createdAt'])),
};

/**
 * 서브젝트 리스트 페이지
 * @return {React.JSX}
 */
function SubjectListPage() {
  const [subjects, setSubjects] = useState([]);
  const [page, setPage] = useState(1);

  /**
   * 정렬 셀렉트 핸들러 함수
   * 셀렉트한 값에 따라 서브젝트를 정렬
   * @param {object} event : 셀렉트 이벤트 객체
   */
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSubjects([...sorting[value](subjects)]);
  };

  useEffect(() => {
    /**
     * 서브젝트 리스트를 요청해서 받아오는 함수
     * @returns {object} 서브젝트 리스트 객체
     */
    const handleLoadSubjectList = async () => {
      const offset = (page - 1) * LIMIT;
      const result = await getSubjectList(LIMIT, offset);
      if (!result) return;

      setSubjects(result.results);
      total = result.count;
    };

    handleLoadSubjectList();
  }, [page]);

  return (
    <div className="container mx-auto">
      <Header />

      <div className={styles.wrapTitle}>
        <h1 className={styles.title}>누구에게 질문할까요?</h1>

        <select className={styles.select} defaultValue="createdAt" onChange={handleSelectChange}>
          <option value="name">이름순</option>
          <option value="createdAt">최신순</option>
        </select>
      </div>

      <ul className={styles.cards}>
        {subjects?.length > 0 ? (
          subjects.map(({ id, name, imageSource, questionCount }) => (
            <Subject
              key={id}
              id={id}
              name={name}
              imageSource={imageSource}
              questionCount={questionCount}
            />
          ))
        ) : (
          <li className="w-full py-6 text-center text-xl font-bold">서브젝트가 없습니다.</li>
        )}
      </ul>

      <Pagination
        activePage={page}
        totalItemsCount={total}
        itemsCountPerPage={LIMIT}
        onChange={setPage}
        hideFirstLastPages={true}
        prevPageText="&lt;"
        nextPageText="&gt;"
      />
    </div>
  );
}

export default SubjectListPage;
