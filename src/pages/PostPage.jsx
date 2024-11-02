import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getQuestionList, getSubject, deleteSubject } from '../api';
import useAsync from '../hooks/useAsync';

import styles from './PostPage.module.css';
import '../global.css';

import logo from '../assets/images/logo.svg';
import banner from '../assets/images/banner.png';
import urlShare from '../assets/images/urlShare.svg';
import kakaoShare from '../assets/images/kakaoShare.svg';
import facebookShare from '../assets/images/facebookShare.svg';
import { ReactComponent as IconMessage } from '../assets/images/icon-message.svg';
import empty from '../assets/images/empty.png';
import QuestionCreateModal from '../components/QuestionCreateModal';

import QuestionListItem from '../components/QuestionListItem';

// 로컬 id랑 현재 접속한 질문 id랑 같은지 검사
const isMysubject = (id) => {
  const myId = localStorage.getItem('subjectId');
  return myId === id;
};

// 카카오 sdk 로드 및 초기화
const loadKakaoSDK = (appKey) => {
  return new Promise((resolve) => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      resolve();
    } else {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.onload = () => {
        window.Kakao.init(appKey);
        resolve();
      };
      document.body.appendChild(script);
    }
  });
};

function PostPage() {
  const { id } = useParams();
  const [result, setResult] = useState('');
  const [profile, setProfile] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [isCreateQuestion, setIsCreateQuestion] = useState(false);
  const [questionButton, setQuestionButton] = useState('');
  const [listButton, setListButton] = useState('');
  const navigate = useNavigate();

  const { error: getQuestionError, wrappedFunction: fetchGetQuestion } = useAsync(getQuestionList);
  const { error: getSubjectError, wrappedFunction: fetchGetSubject } = useAsync(getSubject);
  const { error: deleteSubjectError, wrappedFunction: fetchDeleteSubject } =
    useAsync(deleteSubject);

  const urlToShare = window.location.href;

  // 카카오 sdk 로드, 초기화
  useEffect(() => {
    const loadContent = async () => {
      try {
        await loadKakaoSDK(process.env.REACT_APP_KAKAO_SHARE_API_KEY);
        const question = await fetchGetQuestion(id);
        const subject = await fetchGetSubject(id);
        setResult(question);
        setProfile(subject);
      } catch (err) {
        alert('결과를 불러올 수 없습니다.');
        console.log(err);
        navigate('/list');

        // 오류가 존재할 경우 콘솔에 출력
        if (getQuestionError) {
          console.log('질문 오류:', getQuestionError);
        }
        if (getSubjectError) {
          console.log('서브젝트 오류:', getSubjectError);
        }
      }
    };
    loadContent();
  }, [id, fetchGetQuestion, fetchGetSubject, getQuestionError, getSubjectError, navigate]);

  useEffect(() => {
    updateButtonText(); // 초기값 설정
    window.addEventListener('resize', updateButtonText);

    return () => {
      window.removeEventListener('resize', updateButtonText); // 클린업
    };
  }, []);

  // url 복사
  const handleCopyUrl = async () => {
    const urlToCopy = window.location.href; // 현재 페이지 URL
    try {
      await navigator.clipboard.writeText(urlToCopy); // 클립보드에 복사
      setIsToastVisible(true); // 복사 완료 메시지
      setTimeout(() => setIsToastVisible(false), 3000);
    } catch (err) {
      console.error('URL을 복사할 수 없습니다 : ', err);
    }
  };

  // 카톡 공유
  const handleKakaoShare = () => {
    if (!window.Kakao || !window.Kakao.Link) {
      console.error('Kakao Link is not initialized');
      return;
    }

    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: document.querySelector('meta[property="og:title"]').content,
        description: document.querySelector('meta[property="og:description"]').content,
        imageUrl: document.querySelector('meta[property="og:image"]').content,
        link: {
          mobileWebUrl: urlToShare,
          webUrl: urlToShare,
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: urlToShare,
            webUrl: urlToShare,
          },
        },
      ],
    });
  };

  // 페북 공유
  const handleFacebookShare = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
    window.open(facebookShareUrl, '_blank'); // 새 창으로 페북 열어요, 오픈그래프는 index.html 확인해주세요.
  };

  // porp으로 전달되며 함수가 바로 적용되지 않는 문제 때문에 수정
  const handleQuestionUpdate = async () => {
    const response = await fetchGetQuestion(id);
    setResult(response);
  };

  const handleDeleteSubject = async () => {
    const confirmDelete = window.confirm('삭제하시겠습니까?'); // 확인 창 표시
    if (confirmDelete) {
      try {
        await fetchDeleteSubject(id);
        alert('삭제되었습니다.');
      } catch (err) {
        alert('삭제하는데 실패했습니다.');
        console.log('서브젝트 오류:', deleteSubjectError);
      } finally {
        navigate('/list');
      }
    }
  };

  const updateButtonText = () => {
    if (window.innerWidth < 768) {
      setQuestionButton('질문 작성');
      setListButton('목록으로');
    } else {
      setQuestionButton('질문 작성하기');
      setListButton('목록으로 이동');
    }
  };

  /* div랑 button은 global.css에 있는 유틸 공용 컴포넌트 및 테일윈드 사용 */

  return (
    <div>
      <Helmet>
        <meta property="og:url" content={urlToShare} />
        <meta property="og:title" content={`Open Mind - ${profile.name}`} />
        <meta property="og:description" content={`${profile.name}님의 피드입니다.`} />
        <meta property="og:image" content={profile.imageSource} />
      </Helmet>

      <div className="container mx-auto">
        <img src={banner} alt="Background_Banner" className={styles.banner} />
        <div className="relative z-10 mt-12 flex flex-col items-center gap-3">
          <Link to="/">
            <img src={logo} alt="OpenMind" className={styles.logo} />
          </Link>
          <img src={profile.imageSource} alt="ProfileImage" className={styles.profile} />
          <h2 className="h2">{profile.name}</h2>
          <div className="flex gap-3">
            <img src={urlShare} alt="url" onClick={handleCopyUrl} className={styles.share} />
            <img
              src={kakaoShare}
              alt="kakaotalk"
              onClick={handleKakaoShare}
              className={styles.share}
            />
            <img
              src={facebookShare}
              alt="facebook"
              onClick={handleFacebookShare}
              className={styles.share}
            />
          </div>
          <div className="flex w-full justify-end">
            {isMysubject(id) && (
              <button className={`${styles.button} absolute`} onClick={handleDeleteSubject}>
                삭제하기
              </button>
            )}
          </div>
          <div className="bg-brown-10 border-brown-30 text-brown-40 font-actor body1 mt-12 w-full rounded-[16px] border p-4 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-2">
                <IconMessage alt="total" className={`${styles.message} text-brown-40`} />
                <p className="body1">
                  {result.count ? `${result.count}개의 질문이 있습니다.` : '아직 질문이 없습니다.'}
                </p>
              </div>
              {!result.count && <img src={empty} alt="empty" className={styles.empty} />}
              <QuestionListItem
                isSubjectOwner={isMysubject(id)}
                subject={profile}
                questions={result}
                onUpdate={handleQuestionUpdate}
              />
            </div>
          </div>
          <div className="fixed bottom-6 right-6 flex flex-col gap-2">
            <Link to="/list">
              <button className={styles.button}>{listButton}</button>
            </Link>
            {!isMysubject(id) && (
              <button onClick={() => setIsCreateQuestion(true)} className={styles.button}>
                {questionButton}
              </button>
            )}
          </div>
          {isToastVisible && (
            <span className={`${styles.toast} caption-medium`}>url이 복사되었습니다.</span>
          )}
        </div>
        {isCreateQuestion && (
          <QuestionCreateModal
            profile={profile}
            onClick={setIsCreateQuestion}
            onUpdate={handleQuestionUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default PostPage;
