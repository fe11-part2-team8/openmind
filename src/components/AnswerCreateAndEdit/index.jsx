import { useState } from 'react';

import styles from './AnswerCreateAndEdit.module.css';
import useAsync from '../../hooks/useAsync';
import { patchAnswer, postAnswer } from '../../api';
import Loading from '../Loading';

function verifyContent(content, originAnswer) {
  if (content === '') return false;
  if (content === originAnswer) return false;
  return true;
}

/**
 * AnswerForm 컴포넌트
 * 사용자가 답변을 작성하거나 수정할 수 있도록 하는 답변 폼 컴포넌트입니다.
 * @param {object} props
 * @param {number} props.questionId question id
 * @param {{id : number, content : string, createdAt : string, isRejected : boolean} | null} props.answer answer 객체
 * @param {string} props.name subject 이름
 * @param {string} props.imageSource subject 프로필 이미지 경로
 * @param {function} props.onUpdate question 리스트 업데이트 핸들러
 * @param {function} props.setIsEditMode isEditMode의 setter 함수
 * @returns {React.JSX} - AnswerForm 컴포넌트
 * @todo 에러 발생 시 UI 디자인 추가
 */
function AnswerCreateAndEdit({ questionId, answer, imageSource, name, onUpdate, setIsEditMode }) {
  //답변이 "거절된 답변입니다. (63214597839)"일 경우 빈 문자열로 초기화
  const [answerContent, setAnswerContent] = useState(
    answer && answer.content === '거절된 답변입니다. (63214597839)'
      ? ''
      : answer
        ? answer.content
        : '',
  );

  // const [answerContent, setAnswerContent] = useState(answer ? answer.content : '');
  const {
    loading: loadingPost,
    error: errorPost,
    wrappedFunction: postAnswerAsync,
  } = useAsync(postAnswer);
  const {
    loading: loadingPatch,
    error: errorPatch,
    wrappedFunction: patchAnswerAsync,
  } = useAsync(patchAnswer);

  const handleChangeContent = (e) => {
    setAnswerContent(e.target.value.trim());
  };

  const handleSubmitContent = async (e) => {
    e.preventDefault();
    if (answer) {
      await patchAnswerAsync(answerContent, answer.id);
      if (errorPatch) alert(errorPatch);
      setIsEditMode(false);
    } else {
      await postAnswerAsync(answerContent, questionId);
      if (errorPost) alert(errorPost);
    }
    onUpdate();
  };

  return (
    <div className={styles.body}>
      <Loading isVisible={loadingPatch || loadingPost} />
      <img
        src={imageSource}
        alt={`${name}의 프로필 이미지`}
        className="mr-2 h-10 w-10 rounded-full"
      />
      <div className={styles.container}>
        <p className="text-left text-lg font-semibold">{name}</p>

        <form onSubmit={handleSubmitContent}>
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
