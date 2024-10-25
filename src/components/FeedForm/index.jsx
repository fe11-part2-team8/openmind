import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSubject } from '../../api';

function FeedForm() {
  const [inputValue, setInputValue] = useState(''); // 입력된 이름 저장
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // input값 유효성 검사
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 피드 생성, 페이지 이동
  const handleCreateFeed = async () => {
    try {
      // postSubject API 호출로 피드 생성 요청
      const subjectId = await postSubject(inputValue);

      // 피드 생성에 성공하면 localStorage에 피드 ID 저장
      localStorage.setItem('feedId', subjectId);

      // 피드 생성에 성공하면 /post/{subjectId}/answer 페이지로 이동
      navigate(`/post/${subjectId}/answer`);

      console.log(`생성된 피드 ID: ${subjectId}`);
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
