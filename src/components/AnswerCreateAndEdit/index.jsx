import { useState } from 'react';

import styles from './AnswerCreateForm.module.css';

function verifyContent(content, originAnswer) {
  if (content === '') return false;
  if (content === originAnswer) return false;
  return true;
}

/**
 * AnswerForm 컴포넌트
 * 사용자가 답변을 작성하거나 수정할 수 있도록 하는 답변 폼 컴포넌트입니다.
 * @returns {React.JSX} - AnswerForm 컴포넌트
 */
function AnswerCreateAndEdit({ answer, imageSource, name }) {
  const [answerContent, setAnswerContent] = useState(answer ? answer.content : '');
  // const { questionId } = answer;

  const handleChangeContent = (e) => {
    setAnswerContent(e.target.value);
  };

  // const handleSubmitContent = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (isEditMode) {
  //       await onSave(answerContent, answer.id);
  //     } else {
  //       await postAnswer(answerContent, questionId);
  //     }
  //   } catch (error) {
  //     console.error('답변 처리 중 오류가 발생했습니다.', error);
  //   }
  // };

  return (
    <div className={styles.body}>
      <img
        src={imageSource}
        alt={`${name}의 프로필 이미지`}
        className="mr-2 h-10 w-10 rounded-full"
      />
      <div className={styles.container}>
        <p className="text-left text-lg font-semibold">{name}</p>

        <form>
          <textarea
            type="text"
            value={answerContent}
            placeholder="답변을 입력해주세요"
            onChange={handleChangeContent}
            className="my-2 h-[186px] w-full resize-none rounded-lg border border-gray-300 bg-[#F9F9F9] p-2"
          />
          <button
            type="submit"
            className="btn w-full"
            disabled={!verifyContent(answerContent, answer?.content)}
          >
            {answer ? '수정 완료' : '답변 완료'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AnswerCreateAndEdit;
