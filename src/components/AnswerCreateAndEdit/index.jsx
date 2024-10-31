import { useState } from 'react';

function verifyContent(content, originAnswer) {
  if (content === '') return false;
  if (content === originAnswer) return false;
  return true;
}

/**
 * AnswerForm 컴포넌트
 * 사용자가 답변을 작성하거나 수정할 수 있도록 하는 답변 폼 컴포넌트입니다.
 * @param {object} props - 컴포넌트에 전달된 속성
 * @param {string} props.type - create 또는 edit로 답변 폼의 작동 방식을 결정합니다
 * @param {string} props.questionId - 질문의 ID
 * @param {function} props.onSave - 수정 시 호출되는 함수
 * @param {function} props.postAnswer - 새 답변 추가 시 호출되는 함수
 * @returns {React.JSX} - AnswerForm 컴포넌트
 */
function AnswerCreateAndEdit({ questionId, answerId, initialContent = '', onSave, postAnswer }) {
  const [answerContent, setAnswerContent] = useState(initialContent);
  const [isEditMode] = useState(Boolean(answerId)); // answerId가 존재하면 수정 모드로 간주

  const handleChangeContent = (e) => {
    setAnswerContent(e.target.value);
  };

  const handleSubmitContent = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await onSave(answerContent, answerId);
      } else {
        await postAnswer(answerContent, questionId);
      }
    } catch (error) {
      console.error('답변 처리 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitContent}>
        <textarea
          type="text"
          value={answerContent}
          placeholder="답변을 입력해주세요"
          onChange={handleChangeContent}
        />
        <button
          type="submit"
          className="btn"
          disabled={!verifyContent(answerContent, initialContent)}
        >
          {isEditMode ? '수정 완료' : '답변 완료'}
        </button>
      </form>
    </div>
  );
}

export default AnswerCreateAndEdit;
