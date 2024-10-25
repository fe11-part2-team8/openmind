import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSubject } from '../../api';

function FeedForm() {
  const [inputValue, setInputValue] = useState(''); // 입력된 이름 저장
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //프로필 이미지 리스트
  const profileImages = [
    '../../assets/images/profile/bear-smile.png',
    '../../assets/images/profile/cat-bee.png',
    '../../assets/images/profile/cat-smile.png',
    '../../assets/images/profile/dog-hone.png',
    '../../assets/images/profile/dog-smile.png',
    '../../assets/images/profile/hamster.png',
    '../../assets/images/profile/music-band-bass.png',
    '../../assets/images/profile/music-band-guitar.png',
    '../../assets/images/profile/pig.png',
    '../../assets/images/profile/rabbit-smile.png',
  ];

  //랜덤 프로필 함수
  const getRandomProfileImage = () => {
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    return profileImages[randomIndex];
  };

  // input값 유효성 검사
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 피드 생성, 페이지 이동
  const handleCreateFeed = async () => {
    try {
      //랜덤 프로필 이미지
      const RandomProfileImage = getRandomProfileImage();

      // postSubject API 호출로 피드 생성 요청
      const subjectId = await postSubject(inputValue, RandomProfileImage);

      // 피드 생성에 성공하면 localStorage에 피드 ID 저장
      localStorage.setItem('feedId', subjectId);

      // 피드 생성에 성공하면 /post/{subjectId}/answer 페이지로 이동
      navigate(`/post/${subjectId}/answer`);

      //확인용
      console.log(`생성된 피드 ID: ${subjectId}`);
      console.log(`이미지 경로: `, RandomProfileImage);
    } catch (error) {
      // 오류가 발생하면 에러 메시지 출력
      setError('피드를 생성하는 데 실패했습니다.');
      console.error('피드 생성 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="이름을 입력하세요"
      />
      <button onClick={handleCreateFeed} disabled={!inputValue}>
        질문 받기
      </button>
    </div>
  );
}

export default FeedForm;
