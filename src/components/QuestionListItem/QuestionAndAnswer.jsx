import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import 'dayjs/locale/ko'; // 한국어 가져오기

import Dropdown from './Dropdown/index';
import { deleteQuestion, patchAnswer, postAnswer } from '../../api'; // 답변 수정 및 추가 API 불러오기
import AnswerCreateAndEdit from '../AnswerCreateAndEdit/index'; // 수정 컴포넌트 가져오기
import ReactionButtons from './ReactionButton'; // 좋아요/싫어요 컴포넌트 불러오기

import styles from './QuestionListItem.module.css';

// 상대적인 시간표기를 위한 시간 계산
dayjs.extend(relativeTime);
dayjs.locale('ko', {
  relativeTime: {
    future: '%s 후',
    past: '%s 전',
    s: '몇 초',
    m: '1분',
    mm: '%d분',
    h: '1시간',
    hh: '%d시간',
    d: '1일',
    dd: '%d일',
    M: '1달',
    MM: '%d달',
    y: '1년',
    yy: '%d년',
  },
});

function QuestionAndAnswer({
  question,
  questionDate,
  answer,
  answerDate,
  name,
  like,
  dislike,
  isRejected,
  questionId,
  answerId,
  isSubjectOwner,
  imageSource,
}) {
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 상태
  const [currentAnswer, setCurrentAnswer] = useState(answer); // 현재 답변 상태 관리

  // 수정하기 핸들러
  const handleEdit = () => {
    setIsEditMode(true); // 수정 모드로 전환
  };

  // 삭제하기 핸들러
  const handleDelete = async () => {
    await deleteQuestion(questionId);
    setCurrentAnswer(null); // 삭제 후 상태 초기화
    window.location.reload();
  };

  // 수정 완료 핸들러
  const handleSave = async (newContent, answerId) => {
    try {
      const updatedAnswer = await patchAnswer(newContent, answerId);
      setCurrentAnswer(updatedAnswer); // 변경된 답변 상태 업데이트
      setIsEditMode(false); // 수정 완료 후 수정 모드 해제
    } catch (error) {
      alert('답변 수정에 실패했습니다.');
    }
  };

  // 새 답변 추가 핸들러
  const handlePostAnswer = async (newContent, questionId) => {
    try {
      const newAnswer = await postAnswer(newContent, questionId); // 새 답변 추가 API 호출
      setCurrentAnswer(newAnswer); // 새로운 답변을 상태에 설정하여 렌더링 업데이트
      setIsEditMode(false); // 답변 추가 후 수정 모드 해제
    } catch (error) {
      alert('답변 추가에 실패했습니다.');
    }
  };

  return (
    <div className={styles.select}>
      <div className={styles.header}>
        <span
          className={styles.badge}
          style={{
            borderColor: currentAnswer ? '#542f1a' : '#818181',
            color: currentAnswer ? '#542f1a' : '#818181',
          }}
        >
          {currentAnswer ? '답변 완료' : '미답변'}
        </span>
        {isSubjectOwner && <Dropdown onEdit={handleEdit} onDelete={handleDelete} />}
      </div>

      <div className={styles.container}>
        <p className={styles.question}>질문 · {dayjs(questionDate).fromNow()}</p>
        <p>{question.content}</p>
      </div>

      {isEditMode || (isSubjectOwner && !currentAnswer) ? (
        <AnswerCreateAndEdit
          answerId={answerId}
          questionId={questionId}
          initialContent={currentAnswer?.content || ''}
          onSave={handleSave}
          postAnswer={handlePostAnswer}
          imageSource={imageSource}
          name={name}
        />
      ) : (
        <answerItem
          name={name}
          imageSource={imageSource}
          answerDate={answerDate}
          isRejected={isRejected}
          currentAnswer={currentAnswer}
          like={like}
          dislike={dislike}
          questionId={questionId}
        />
      )}
    </div>
  );
}

function answerItem({
  name,
  imageSource,
  answerDate,
  isRejected,
  currentAnswer,
  like,
  dislike,
  questionId,
}) {
  return (
    <>
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
              <p className={styles.day}>{dayjs(answerDate).fromNow()}</p>
            </div>

            {isRejected ? (
              <p className="text-base text-[#B93333]">답변 거절</p>
            ) : currentAnswer ? (
              <p className="text-left text-base">{currentAnswer?.content}</p>
            ) : null}
          </div>
        </div>
      </div>

      <ReactionButtons questionId={questionId} initialLikes={like} initialDislikes={dislike} />
    </>
  );
}

export default QuestionAndAnswer;
