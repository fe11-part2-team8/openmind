import { useState } from 'react';
import { formatRelativeTime } from '../../utils/day'; // 수정된 함수 이름으로 import
import { deleteQuestion, patchAnswer, postAnswer } from '../../api';
import AnswerCreateAndEdit from '../AnswerCreateAndEdit/index';
import ReactionButtons from './ReactionButton';
import styles from './QuestionList.module.css';
import useAsync from '../../hooks/useAsync';
import Dropdown from './Dropdown';
import Loading from '../Loading';

const IS_REJECTED = true;
const REJECTED_CONTENT = '거절된 답변입니다. (63214597839)';

/**
 * 질문 아이템 컴포넌트. 내부에는 답변과 관련된 컴포넌트도 포함된다.
 * @param {object} props
 * @param {{id : number, content : string, createdAt : string, like : number, dislike : number, answer : {id : number, content : string, createdAt : string, isRejected : boolean} | null}} props.question question 객체
 * @param {string} props.name subejct 이름
 * @param {string} props.imageSource subject 프로필 이미지 경로
 * @param {function} props.onUpdate question 리스트 업데이트 핸들러
 * @returns {React.JSX} 질문 아이템 컴포넌트
 */
function QuestionItem({ question, name, isSubjectOwner, imageSource, onUpdate }) {
  const { like, dislike, answer } = question;
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 상태
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

  // 수정하기 핸들러
  const handleEdit = () => {
    setIsEditMode(true); // 수정 모드로 전환
    onUpdate();
  };

  // 삭제하기 핸들러
  const handleDelete = async () => {
    await deleteQuestion(question.id);
    onUpdate();
  };

  // 답변 거절 핸들러
  const handleReject = async () => {
    if (answer) {
      await patchAnswerAsync(REJECTED_CONTENT, answer.id, IS_REJECTED);
      if (errorPatch) alert(errorPatch);
    } else {
      await postAnswerAsync(REJECTED_CONTENT, question.id, IS_REJECTED);
      if (errorPost) alert(errorPost);
    }
    setIsEditMode(false); // 수정 모드 해제
    onUpdate();
  };

  return (
    <div className={styles.select}>
      <Loading isVisible={loadingPost || loadingPatch} />
      <div className={styles.header}>
        <span
          className={styles.badge}
          style={{
            borderColor: answer ? '#542f1a' : '#818181',
            color: answer ? '#542f1a' : '#818181',
          }}
        >
          {answer ? '답변 완료' : '미답변'}
        </span>
        {isSubjectOwner && (
          <Dropdown
            onEdit={handleEdit}
            onDelete={handleDelete}
            onReject={handleReject}
            hasAnswer={!!answer}
          />
        )}
      </div>

      <div className={styles.container}>
        <p className={styles.question}>질문 · {formatRelativeTime(question.createdAt)}</p>
        <p>{question.content}</p>
      </div>

      {isEditMode || (!answer && isSubjectOwner) ? (
        <AnswerCreateAndEdit
          questionId={question.id}
          answer={answer}
          name={name}
          imageSource={imageSource}
          onUpdate={onUpdate}
          setIsEditMode={setIsEditMode}
        />
      ) : (
        <AnswerItem answer={answer} name={name} imageSource={imageSource} />
      )}

      <ReactionButtons questionId={question.id} initialLikes={like} initialDislikes={dislike} />
    </div>
  );
}

/**
 * 답변을 보여주기 위한 컴포넌트
 * @param {object} props
 * @param {{id : number, content : string, createdAt : string, isRejected : boolean}} props.answer answer 객체
 * @param {string} props.name subject 이름
 * @param {string} props.imageSource subject 프로필 이미지 경로
 * @returns {React.JSX} 답변 컴포넌트
 */
function AnswerItem({ answer, name, imageSource }) {
  if (!answer) return;

  return (
    <div className={`${styles.answerContainer} text-left`}>
      <div className={styles.profile}>
        <img
          src={imageSource}
          alt={`${name}의 프로필 이미지`}
          style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '8px' }}
        />
        <div className={styles.answer}>
          <div className={styles.nameday}>
            <p>{name}</p>
            <p className={styles.day}>{formatRelativeTime(answer.createdAt)}</p>
          </div>

          {answer.isRejected ? (
            <p className="text-base text-[#B93333]">답변 거절</p>
          ) : (
            <p className={styles.answerValue}>{answer.content}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionItem;
