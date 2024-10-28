import { useState } from 'react';

function AnswerEditor({ answerId, initialContent, onSave }) {
  const [newContent, setNewContent] = useState(initialContent);

  const handleSaveClick = async () => {
    try {
      console.log('newContent:', newContent);
      console.log('answerId:', answerId);

      // 수정된 답변 내용 전달
      await onSave(newContent, answerId);
      alert('답변이 수정되었습니다.');
    } catch (error) {
      console.error('답변 수정 실패:', error);
      alert('답변 수정에 실패했습니다.');
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
      <button onClick={handleSaveClick}>수정 완료</button>
    </div>
  );
}

export default AnswerEditor;
