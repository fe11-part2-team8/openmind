import { useState } from 'react';
import { date } from '../../utils/day';
import { deleteQuestion, patchAnswer, postAnswer } from '../../api';
import AnswerCreateAndEdit from '../AnswerCreateAndEdit/index';
import ReactionButtons from './ReactionButton';
import styles from './QuestionList.module.css';
import useAsync from '../../hooks/useAsync';
import Dropdown from './Dropdown';

const IS_REJECTED = true;
const REJECTED_CONTENT = '거절된 답변입니다.';

/**
 *
 * @param {object} props
 * @param {{id : number, content : string, createdAt : string, like : number, dislike : number, answer : {id : number, content : string, createdAt : string, isRejected : boolean} | null}} props.question question 객체
 * @param {string} name subejct 이름
 * @param {string} imageSource subject 프로필 이미지 경로
 * @param {function} onUpdate question 리스트 업데이트 핸들러
 * @returns
 */
function QuestionItem({ question, name, isSubjectOwner, imageSource, onUpdate }) {
  const { like, dislike, answer } = question;
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 상태
  const { error: errorPost, wrappedFunction: postAnswerAsync } = useAsync(postAnswer);
  const { error: errorPatch, wrappedFunction: patchAnswerAsync } = useAsync(patchAnswer);

  console.log(isSubjectOwner);

  // 수정하기 핸들러
  const handleEdit = () => {
    setIsEditMode(true); // 수정 모드로 전환
  };

  // 삭제하기 핸들러
  const handleDelete = async () => {
    await deleteQuestion(question.id);
    onUpdate();
  };

  // 답변 거절 핸들러
  const handleRefuse = async () => {
    if (answer) {
      console.log(answer);
      await patchAnswerAsync(REJECTED_CONTENT, answer.id, IS_REJECTED);
      if (errorPatch) alert(errorPatch);
    } else {
      await postAnswerAsync(REJECTED_CONTENT, question.id, IS_REJECTED);
      if (errorPost) alert(errorPost);
    }
    onUpdate();
  };

  // 새 답변 추가 핸들러

  return (
    <div className={styles.select}>
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
          <Dropdown onEdit={handleEdit} onDelete={handleDelete} onRefuse={handleRefuse} />
        )}
      </div>

      <div className={styles.container}>
        <p className={styles.question}>질문 · {date(question.createAt)}</p>
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

function AnswerItem({ answer, name, imageSource }) {
  if (!answer) return <></>;

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
            <p className={styles.day}>{date(answer.createAt)}</p>
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
