import { useState } from 'react';

/**
 *  답변을 작성하거나 수정하는 컴포넌트
 * @param {object} props - 컴포넌트의 props
 * @param {number} props.answerId - 답변 ID (있을 경우 수정, 없을 경우 새 답변 추가)
 * @param {number} props.questionId - 질문 ID
 * @param {string} props.initialContent - 초기 답변 내용
 * @param {function} props.onSave - 답변을 저장하는 함수
 * @param {function} props.postAnswer - 새 답변을 추가하는 함수
 * @returns {React.JSX} 답변 작성/수정 폼 컴포넌트
 */

function AnswerCreateAndEdit({ answerId, questionId, initialContent, onSave, postAnswer }) {
  const [newContent, setNewContent] = useState(initialContent);

  const handleSaveClick = async () => {
    try {
      console.log('newContent:', newContent);
      console.log('answerId:', answerId);

      if (answerId) {
        // 답변이 존재하면 수정
        await onSave(newContent, answerId);
      } else {
        // 답변이 없으면 새 답변 추가
        await postAnswer(newContent, questionId);
      }
    } catch (error) {
      alert('답변을 보내는데 실패했습니다.');
    }
  };

  return (
    <div>
      <textarea
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        rows="4"
        cols="50"
      />

      <button type="submit" onClick={handleSaveClick} disabled={!newContent.trim()}>
        완료
      </button>
    </div>
  );
}

export default AnswerCreateAndEdit;
