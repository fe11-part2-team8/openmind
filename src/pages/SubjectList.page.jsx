import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Pagination from 'react-js-pagination';
//
import { getSubjectList } from '../api';
import useAsync from '../hooks/useAsync';
import Loading from '../components/Loading';
//
import styles from './SubjectList.page.module.css';
import snsLink from '../assets/images/snsLink.png';
import logo from '../assets/images/logo.svg';
import { ReactComponent as IconArrowRight } from '../assets/images/icon-arrow-right.svg';
import { ReactComponent as IconMessage } from '../assets/images/icon-message.svg';

/**
 * 서브젝트 리스트 페이지 상단 컴포넌트
 * @return {React.JSX}
 */
function Header() {
  const subjectId = window.localStorage.getItem('subjectId');

  return (
    <div className="flex flex-col items-center justify-between gap-5 py-10 sm:flex-row">
      <h2>
        <Link to="/">
          <img src={logo} alt="Open Mind" width="146" height="57" />
        </Link>
      </h2>

      <Link to={subjectId ? `/post/${subjectId}` : '/'} className="btn btn-outline">
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

      <Link to={`/post/${id}`} className={styles.name}>
        {name}
      </Link>

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
  const { pageNum } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [page, setPage] = useState(Number(pageNum) || 1);
  const { loading, error, wrappedFunction: getSubjectListAsync } = useAsync(getSubjectList);
  const navigate = useNavigate();
  const urlToShare = window.location.href;
  // console.log('fn:SubjectListPage', pageNum, page);

  /**
   * 정렬 셀렉트 핸들러 함수
   * 셀렉트한 값에 따라 서브젝트를 정렬
   * @param {object} event : 셀렉트 이벤트 객체
   */
  const handleSelectChange = (e) => {
    // console.log('fn:handleSelectChange');
    const value = e.target.value;
    setSubjects([...sorting[value](subjects)]);
  };

  /**
   * 페이지네이션 onChange 콜백함수
   * @param {number} num 페이지네이션 클릭한 숫자 받음
   */
  const handlePagination = (num) => {
    // console.log('fn:handlePagination');
    // TODO 이동하면 다시 그릴줄 알았더니 안그려서 페이지 값을 바꿔줌
    navigate('/list/' + num);
    setPage(num);
  };

  useEffect(() => {
    // console.log('fn:useEffect');
    /**
     * 서브젝트 리스트를 요청해서 받아오는 함수
     * @returns {object} 서브젝트 리스트 객체
     */
    const handleLoadSubjectList = async () => {
      // console.log('fn:handleLoadSubjectList', page);
      const offset = (page - 1) * LIMIT;

      const result = await getSubjectListAsync(LIMIT, offset);
      if (!result) return;

      setSubjects(result.results);
      total = result.count;

      // 총 페이지 숫자
      const totalPageCount = Math.ceil(total / LIMIT);
      // console.log('v:totalPageCount', total, totalPageCount);
      // 총 페이지 숫자보다 큰 숫자를 파라미터로 받았을 경우
      if (page > totalPageCount) {
        navigate('/list/' + totalPageCount);
        setPage(totalPageCount);
      }
    };

    handleLoadSubjectList();
  }, [page, navigate, getSubjectListAsync]);

  return (
    <div className="container mx-auto">
      <Helmet>
        <meta property="og:url" content={urlToShare} />
        <meta property="og:title" content={`Open Mind - 피드 리스트`} />
        <meta
          property="og:description"
          content="다른 사용자들과 고민을 공유하고 함께 소통해보세요!"
        />
        <meta property="og:image" content={snsLink} />
      </Helmet>

      <Loading isVisible={loading} />

      <Header />

      <div className={styles.wrapTitle}>
        <h1 className={styles.title}>누구에게 질문할까요?</h1>

        <select className={styles.select} defaultValue="createdAt" onChange={handleSelectChange}>
          <option value="name">이름순</option>
          <option value="createdAt">최신순</option>
        </select>
      </div>

      <ul className={styles.cards + (subjects?.length === 0 ? ' grid-cols-1' : '')}>
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

        {error?.message && (
          <p className="w-full py-6 text-center text-xl font-bold">{error.message}</p>
        )}
      </ul>

      <Pagination
        activePage={page}
        totalItemsCount={total}
        itemsCountPerPage={LIMIT}
        onChange={handlePagination}
        hideFirstLastPages={true}
        prevPageText="&lt;"
        nextPageText="&gt;"
      />
    </div>
  );
}

export default SubjectListPage;
