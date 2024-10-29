import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSubject } from '../../api';

function SubjectCreateForm() {
  const [inputValue, setInputValue] = useState(''); // 입력된 이름 저장
  const navigate = useNavigate();

  // input 값 유효성 검사
  const handleInputChange = (e) => {
    setInputValue(e.target.value.trim());
  };

  // 이름으로 기존 서브젝트 조회
  /*
const findSubjectByName = async (name) => {
  try {
    // 모든 서브젝트 리스트를 가져옴
    const subjects = await getSubjectList(); 

    // subjects.results 배열에서 해당 이름을 가진 서브젝트를 찾음
    const existingSubject = subjects.results.find((subject) => subject.name === name);

    // 이미 존재하는 서브젝트가 있으면 해당 서브젝트의 ID를 반환하고, 없으면 null을 반환
    return existingSubject ? existingSubject.id : null; 
  } catch (error) {
    // 오류가 발생하면 예외를 던짐
    throw error;
  }
};
*/

  // 서브젝트 생성, 페이지 이동
  const handleCreateSubject = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    try {
      // 서브젝트가 함께 새 서브젝트 생성

      const result = await postSubject(inputValue);
      const subjectId = result.id;

      // 서브젝트 ID를 localStorage에 저장
      if (subjectId) {
        localStorage.setItem('SubjectId', subjectId); // 로컬 스토리지에 저장

        navigate(`/post/${subjectId}/answer`); // 서브젝트 ID로 경로 변경
      } else {
        console.error('서브젝트 생성 중 오류가 발생했습니다: subjectId가 유효하지 않습니다.');
      }
    } catch (error) {
      console.error('서브젝트 생성 중 오류가 발생했습니다:', error);
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
