import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
//
import { getSubjectList } from '../api';
//
import logo from '../assets/images/logo.svg';
import styles from './SubjectList.page.module.css';

/**
 * 서브젝트 리스트 페이지 상단 컴포넌트
 * @return {React.JSX}
 */
function Header() {
  const id = window.localStorage.getItem('id');

  return (
    <div className="flex items-center justify-between py-10">
      <h2>
        <Link to="/">
          <img src={logo} alt="Open Mind" width="146" height="57" />
        </Link>
      </h2>

      <Link to={id ? `/post/${id}/answer` : '/'} className="rounded-lg border px-4 py-2">
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
      {/* a 태그를 Link로 변경 */}
      <Link to={`/post/${id}`} className="stretched-link">
        {name}
      </Link>
      <div className="flex justify-between">
        <span>받은 질문</span>
        <span>{questionCount}개</span>
      </div>
    </li>
  );
}

// 서브젝트 리스트 갯수 제한
const LIMIT = 8;
// 서브젝트 리스트 총 갯수
let total = 0;

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
          <li className="w-full py-6 text-center text-2xl font-bold">서브젝트가 없습니다.</li>
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
