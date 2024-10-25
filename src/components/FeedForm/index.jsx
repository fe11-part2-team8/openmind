import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSubject, getAllSubject } from '../../api';

// 프로필 이미지 리스트
import profile_bear_smile from '../../assets/images/profile/bear-smile.png';
import profile_cat_bee from '../../assets/images/profile/cat-bee.png';
import profile_cat_smile from '../../assets/images/profile/cat-smile.png';
import profile_dog_hone from '../../assets/images/profile/dog-hone.png';
import profile_dog_smile from '../../assets/images/profile/dog-smile.png';
import profile_hamster from '../../assets/images/profile/hamster.png';
import profile_music_band_bass from '../../assets/images/profile/music-band-bass.png';
import profile_music_band_guitar from '../../assets/images/profile/music-band-guitar.png';
import profile_pig from '../../assets/images/profile/pig.png';
import profile_rabbit_smile from '../../assets/images/profile/rabbit-smile.png';

// 프로필 이미지 리스트
const profileImages = [
  profile_bear_smile,
  profile_cat_bee,
  profile_cat_smile,
  profile_dog_hone,
  profile_dog_smile,
  profile_hamster,
  profile_music_band_bass,
  profile_music_band_guitar,
  profile_pig,
  profile_rabbit_smile,
];

function FeedForm() {
  const [inputValue, setInputValue] = useState(''); // 입력된 이름 저장
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 랜덤 프로필 함수
  const getRandomProfileImage = () => {
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    return profileImages[randomIndex];
  };

  // input 값 유효성 검사
  const handleInputChange = (e) => {
    setInputValue(e.target.value.trim());
  };

  // 이름으로 기존 피드 조회
  const findSubjectByName = async (name) => {
    try {
      const subjects = await getAllSubject(); // 모든 피드를 가져옴

      // subjects.results 배열에 접근
      const existingSubject = subjects.results.find((subject) => subject.name === name);
      return existingSubject ? existingSubject.id : null; // 이미 존재하면 해당 ID 반환
    } catch (error) {
      console.error('피드를 조회하는 중 오류가 발생했습니다:', error);
      throw error;
    }
  };

  // 피드 생성, 페이지 이동
  const handleCreateFeed = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    try {
      setError(null);

      // 이름으로 피드가 존재하는지 확인
      let subjectId = await findSubjectByName(inputValue);

      if (subjectId) {
        console.log(`이미 존재하는 피드 ID: ${subjectId}`);
      } else {
        // 피드가 없으면 랜덤 프로필 이미지와 함께 새 피드 생성
        const randomProfileImage = getRandomProfileImage();
        subjectId = await postSubject(inputValue, randomProfileImage);

        // 확인용
        console.log(`새로 생성된 피드 ID: ${subjectId}`);
        console.log(`지정된 프로필 이미지:`, randomProfileImage);
      }

      // 피드 ID를 localStorage에 저장하고 경로 변경
      localStorage.setItem('feedId', subjectId);
      navigate(`/post/${subjectId}/answer`);
    } catch (error) {
      setError('피드를 생성하는 데 실패했습니다.');
      console.error('피드 생성 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <form onSubmit={handleCreateFeed}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="이름을 입력하세요"
      />
      <button type="submit" disabled={!inputValue}>
        질문 받기
      </button>
    </form>
  );
}

export default FeedForm;
