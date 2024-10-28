import { useState } from 'react';

function AnswerEditor({
  answerId,
  questionId,
  initialContent,
  initialIsRejected,
  onSave,
  postAnswer,
}) {
  const [newContent, setNewContent] = useState(initialContent);
  const [isRejected, setIsRejected] = useState(initialIsRejected);

  const handleSaveClick = async () => {
    try {
      console.log('newContent:', newContent);
      console.log('answerId:', answerId);
      console.log('isRejected:', isRejected);

      if (answerId) {
        // 답변이 존재하면 수정
        await onSave(newContent, answerId, isRejected);
      } else {
        // 답변이 없으면 새 답변 추가
        await postAnswer(newContent, questionId, isRejected);
      }

      alert('처리가 완료되었습니다.');
    } catch (error) {
      console.error('처리 실패:', error);
      alert('처리 실패');
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
      <div>
        <label>
          <input type="checkbox" checked={isRejected} onChange={() => setIsRejected(!isRejected)} />
          답변 거절 여부
        </label>
      </div>
      <button onClick={handleSaveClick}>완료</button>
    </div>
  );
}

export default AnswerEditor;
