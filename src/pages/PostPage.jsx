import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getQuestionList, getSubject } from '../api';
import useAsync from '../hooks/useAsync';

import styles from './PostPage.module.css';
import '../global.css';

import logo from '../assets/images/logo.svg';
import banner from '../assets/images/banner.png';
import urlShare from '../assets/images/urlShare.png';
import kakaoShare from '../assets/images/kakaoShare.png';
import facebookShare from '../assets/images/facebookShare.png';
import { ReactComponent as IconMessage } from '../assets/images/icon-message.svg';
import empty from '../assets/images/empty.png';

// 로컬 id랑 현재 접속한 질문 id랑 같은지 검사
const isMysubject = (id) => {
  const myId = localStorage.getItem('SubjectId');
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
  const [result, setResult] = useState({ count: 0 });
  const [profile, setProfile] = useState({ name: '', imageSource: '' });
  const [isToastVisible, setIsToastVisible] = useState(false);
  const navigate = useNavigate();

  const { error: questionError, wrappedFunction: fetchQuestion } = useAsync(getQuestionList);
  const { error: subjectError, wrappedFunction: fetchSubject } = useAsync(getSubject);

  useEffect(() => {
    const loadContent = async () => {
      try {
        await loadKakaoSDK('1152271'); // 앱 키를 인자로 전달
        const question = await fetchQuestion(id);
        const subject = await fetchSubject(id);
        setResult(question);
        setProfile(subject);
      } catch (err) {
        alert('결과를 불러올 수 없습니다.');
        console.log(err);
        navigate('/list');

        // 오류가 존재할 경우 콘솔에 출력
        if (questionError) {
          console.log('질문 오류:', questionError);
        }
        if (subjectError) {
          console.log('서브젝트 오류:', subjectError);
        }
      }
    };

    loadContent();
  }, [id, fetchQuestion, fetchSubject, questionError, subjectError, navigate]);

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

    const urlToShare = window.location.href; // 현재 페이지 URL

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
    const urlToShare = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
    window.open(facebookShareUrl, '_blank'); // 새 창으로 페북 열어요, 오픈그래프는 index.html 확인해주세요.
  };

  /* div랑 button은 global.css에 있는 유틸 공용 컴포넌트 및 테일윈드 사용 */
  const buttonClassName = 'btn btn-rounded body1 shadow-1 flex w-[208px] justify-center';

  return (
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
        <div className="bg-brown-10 border-brown-30 text-brown-40 font-actor body1 mt-12 w-full rounded-[16px] border p-4 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-2">
              <IconMessage alt="total" className={`${styles.message} text-brown-40`} />
              <p className="body1">
                {result.count ? `${result.count}개의 질문이 있습니다.` : '아직 질문이 없습니다.'}
              </p>
            </div>
            {!result.count && <img src={empty} alt="empty" className={styles.empty} />}
          </div>
        </div>
        <div className="fixed bottom-6 right-6">
          <Link to="/list">
            <button className={`${buttonClassName} btn-outline mb-3 font-semibold`}>
              목록으로 이동
            </button>
          </Link>
          {isMysubject(id) ? (
            <Link to={`/post/${id}/answer`}>
              <button className={buttonClassName}>답변 작성하기</button>
            </Link>
          ) : (
            <Link to={`/modal`}>
              <button className={buttonClassName}>질문 작성하기</button>
            </Link>
          )}
        </div>
        {isToastVisible && (
          <span className={`${styles.toast} caption-medium`}>url이 복사되었습니다.</span>
        )}
      </div>
    </div>
  );
}

export default PostPage;
