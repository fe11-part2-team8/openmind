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
import message from '../assets/images/messages.png';

function PostPage() {
  const { id } = useParams();
  const [total, setTotal] = useState(0);
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const navigate = useNavigate();

  const { error: questionError, wrappedFunction: fetchQuestion } = useAsync(getQuestionList);
  const { error: subjectError, wrappedFunction: fetchSubject } = useAsync(getSubject);

  // 카카오 sdk 로드, 초기화
  useEffect(() => {
    const loadKakaoSDK = () => {
      return new Promise((resolve) => {
        if (window.Kakao && window.Kakao.isInitialized()) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
          script.onload = () => {
            window.Kakao.init('1152271'); // 여기에 실제 Kakao App Key 입력
            resolve();
          };
          document.body.appendChild(script);
        }
      });
    };

    // 질문 및 서브젝트 불러옴
    loadKakaoSDK().then(() => {
      const loadContent = async () => {
        const result = await fetchQuestion(id);
        const profile = await fetchSubject(id);

        if (!result || !profile) {
          alert('결과를 불러올 수 없습니다.');
          console.log(questionError || subjectError);
          navigate('/list');
          return;
        }

        setTotal(result.count);
        setProfileImage(profile.imageSource);
        setUsername(profile.name);
      };

      loadContent();
    });
  }, [id, questionError, subjectError, fetchQuestion, fetchSubject, navigate]);

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

  // 로컬 id랑 현재 접속한 질문 id랑 같은지 검사
  const isMysubject = () => {
    const myId = localStorage.getItem('SubjectId');
    return myId === id;
  };

  /* div랑 button은 global.css에 있는 유틸 공용 컴포넌트 및 테일윈드 사용 */
  const buttonClassName = 'btn btn-rounded body1 shadow-1 flex w-[208px] justify-center';

  return (
    <div className="container mx-auto">
      <img src={banner} alt="Background_Banner" className={styles.banner} />
      <div className="relative z-10 mt-[50px] flex flex-col items-center gap-3">
        <Link to="/">
          <img src={logo} alt="OpenMind" />
        </Link>
        <img src={profileImage} alt="ProfileImage" className={styles.profile} />
        <h2 className="h2">{username}</h2>
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
        <div className="bg-brown-10 border-brown-30 text-brown-40 font-actor body1 mt-[50px] w-full rounded-[16px] border p-4 text-center">
          <div className="flex justify-center gap-2">
            <img src={message} alt="total" />
            <p className="body1">{total}개의 질문이 있습니다</p>
          </div>
        </div>
        <div className="fixed bottom-[24px] right-[24px]">
          <Link to="/list">
            <button className={`${buttonClassName} btn-secondary mb-3`}>목록으로 이동</button>
          </Link>
          {isMysubject() ? (
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
