import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSubject, getAllSubject } from '../../api';

import PROFILES from '../../assets/datas/profile/index'; // PROFILES 배열

function SubjectCreateForm() {
  const [inputValue, setInputValue] = useState(''); // 입력된 이름 저장
  const navigate = useNavigate();

  // 랜덤 프로필 함수
  const getRandomProfileImage = () => {
    const randomIndex = Math.floor(Math.random() * PROFILES.length);
    return PROFILES[randomIndex];
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
      throw error;
    }
  };

  // 피드 생성, 페이지 이동
  const handleCreateSubject = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    try {
      // 이름으로 피드가 존재하는지 확인
      let subjectId = await findSubjectByName(inputValue);

      if (subjectId) {
        // 피드가 이미 존재하면 로직 추가 가능
      } else {
        // 피드가 없으면 랜덤 프로필 이미지와 함께 새 피드 생성
        const randomProfileImage = getRandomProfileImage();
        subjectId = await postSubject(inputValue, randomProfileImage);
      }

      // 피드 ID를 localStorage에 저장하고 경로 변경
      localStorage.setItem('SubjectId', subjectId);
      navigate(`/post/${subjectId}/answer`);
    } catch (error) {
      console.error('피드 생성 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <form onSubmit={handleCreateSubject}>
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

export default SubjectCreateForm;
