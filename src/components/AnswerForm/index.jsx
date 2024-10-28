import React, { useEffect, useState } from 'react'; //리액트와 useEffect 훅을 가져옵니다.
import PropTypes from 'prop-types'; //PropTypes를 통해 컴포넌트 props의 타입 검사를 지원합니다.
import styles from './AnswerForm.module.css'; //모듈css로 스타일을 가져옵니다.

/**
 * AnswerForm 컴포넌트
 * 사용자가 답변을 작성하거나 수정할 수 있도록 하는 답변 폼 컴포넌트입니다.
 *
 * @param {Object} props - 컴포넌트에 전달된 속성
 * @param {string} props.type - create 또는 edit로 답변 폼의 작동 방식을 결정합니다
 * @param {number} props.questionId - 질문의 ID
 * @param {string} props.feedName - 피드의 사용자 이름
 * @param {string} props.feedProfile - 피드 프로필 이미지의 URL
 * @param {function} props.onSubmit - 폼 제출 시 호출되는 콜백 함수
 * @returns {React.JSX} - AnswerForm 컴포넌트
 */
function AnswerForm({ type, questionId, feedName, feedProfile, onSubmit }) {
  const [answer, setAnswer] = useState(''); // 답변 상태
  const [originalAnswer, setOriginalAnswer] = useState(''); // 기존 답변 상태 (수정 시)
  const [error, setError] = useState(''); // 유효성 검사 에러 메시지
  const [isValid, setIsValid] = useState(false); // 버튼 활성화 상태

  //(2)상위 컴포넌트에서 edit타입일 때 원래 답변을 불러온다
  useEffect(() => {
    if (type === 'edit') {
      fetch(`/api/answers_read/${questionId}`)
        .then((response) => response.json())
        .then((data) => {
          setAnswer(data.answer);
          setOriginalAnswer(data.answer);
        })
        .catch((error) => console.error('데이터 불러오기 오류:', error));
    }
  }, [type, questionId]);

  // 유효성 검사
  const validateAnswer = () => {
    // 필수 입력, 최소 글 길이, 수정 변경점 확인
    if (answer.trim().length === 0) {
      setError('답변을 입력해주세요.'); // 비어 있을 때 에러 메시지 설정
      return false;
    } else if (answer.trim().length < 2) {
      setError('답변은 최소 2자 이상이어야 합니다.'); // 최소 길이 미달 시 에러 메시지 설정
      return false;
    } else if (type === 'edit' && answer === originalAnswer) {
      setError('수정된 내용이 없습니다.'); // 수정 시 기존 답변과 같으면 에러 메시지 설정
      return false;
    }
    setError(''); // 모든 조건 통과 시 에러 메시지 초기화
    return true;
  };

  //입력값의 변경에 따라 유효성 검사 및 버튼 활성화 여부
  useEffect(() => {
    setIsValid(validateAnswer());
  }, [answer, originalAnswer, type]);

  //폼 제출 핸들러 작성
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!validateAnswer()) return; // 유효성 검사 호출 후 유효성 검사가 실패하면 폼 제출을 중단

    console.log(event);
    const url =
      type === 'create'
        ? `/api/questions/${questionId}/question_answers_create`
        : `/api/answers_partial_update/${questionId}`;
    const method = type === 'create' ? 'POST' : 'PATCH';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, answer }),
    })
      .then(() => onSubmit()) //제출 성공 시 상위 컴포넌트의 콜백 함수 실행
      .catch((error) => console.error('제출 오류:', error)); //제출 실패 시 에러 메시지 출력
  };

  return (
    <div className={styles.answerForm}>
      {/* (1)프로필 보여준다 */}
      <div className={styles.header}>
        <img src={feedProfile} alt={`${feedName}의 프로필`} className={styles.profileImage} />
        {/* (3)이미지를 보여준다 */}
        <span>{feedName}</span> {/* (4)주제명? feedName을 보여준다 */}
      </div>

      {/* (5)답변폼을 만든다 */}
      <form onSubmit={handleFormSubmit}>
        {/* (6)답변 입력을 만든다 */}
        <textarea
          className={styles.textarea}
          placeholder="답변 입력"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        {/* 유효성 검사 오류 발생 시 메시지 표시 */}
        {error && <div className={styles.error}>{error}</div>}

        {/* (7),(8)답변 완료 버튼 및 수정 버튼을 삼항연산자로 만든다 */}
        <button type="submit" className={styles.submitButton} disabled={!isValid}>
          {type === 'create' ? '답변 완료' : '수정 완료'}
        </button>
      </form>
    </div>
  );
}

// PropTypes를 통해 props 데이터 타입 검사
AnswerForm.propTypes = {
  type: PropTypes.oneOf(['create', 'edit']).isRequired,
  questionId: PropTypes.number.isRequired,
  feedName: PropTypes.string.isRequired,
  feedProfile: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AnswerForm;
