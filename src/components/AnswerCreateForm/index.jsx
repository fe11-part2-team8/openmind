import { useState } from 'react';
import { postAnswer, patchAnswer } from '../../api';
// import styles from './AnswerCreateForm.module.css';

function verifyContent(content, originAnswer) {
  if (content === '') {
    return false;
  }

  if (content === originAnswer) {
    return false;
  }

  return true;
}

/**
 * AnswerForm 컴포넌트
 * 사용자가 답변을 작성하거나 수정할 수 있도록 하는 답변 폼 컴포넌트입니다.
 * @param {object} props - 컴포넌트에 전달된 속성
 * @param {string} props.type - create 또는 edit로 답변 폼의 작동 방식을 결정합니다
 * @param {string} props.questionId - 질문의 ID
 * @param {string} props.subjectName - 피드의 사용자 이름
 * @param {string} props.subjectProfile - 피드 프로필 이미지의 URL
 * @returns {React.JSX} - AnswerForm 컴포넌트
 */
function AnswerCreateForm({
  subjectName,
  subjectProfile,
  questionId,
  answerId,
  type = 'create',
  originAnswer = '',
}) {
  //타입에 따라 초기값을 빈 값 또는 originAnswer로 설정한다. - 유효성검사
  const [answerContent, setAnswerContent] = useState(originAnswer);

  //사용자가 입력한 값을 상태값으로 저장한다.(여백없이)
  const handleChangeContent = (e) => {
    setAnswerContent(e.target.value.trim());
  };

  const handleSubmitContent = async (e) => {
    e.preventDefault();
    let response;

    if (type === 'create') {
      response = await postAnswer(answerContent, questionId);
    } else if (type === 'edit') {
      response = await patchAnswer(answerContent, answerId);
    }
    console.log(response);
  };

  return (
    <div>
      <div>
        <h1>{subjectName}</h1>
        <img src={subjectProfile} alt={`${subjectName} 프로필 이미지`} />
      </div>
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
          disabled={!verifyContent(answerContent, originAnswer)}
        >
          {type === 'create' ? '답변 완료' : '수정 완료'}
        </button>
      </form>
    </div>
  );
}

export default AnswerCreateForm;
