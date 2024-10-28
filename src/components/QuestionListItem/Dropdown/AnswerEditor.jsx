import { useState } from 'react';

function AnswerEditor({ answerId, questionId, initialContent, onSave, postAnswer }) {
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

      <button onClick={handleSaveClick}>완료</button>
    </div>
  );
}

export default AnswerEditor;
