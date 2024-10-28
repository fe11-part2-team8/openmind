import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko'; // 한국어 가져오기
import thumbsUp from '../../assets/images/ic_thumbs-up.svg'; // 좋아요 아이콘
import thumbsDown from '../../assets/images/ic_thumbs-down.svg'; // 싫어요 아이콘
import Dropdown from './Dropdown';
import { deleteQuestion, patchAnswer } from '../../api'; // 답변 수정 API 불러오기
import AnswerEditor from './Dropdown/AnswerEditor'; // 수정 컴포넌트 가져오기
import { useState } from 'react';

dayjs.extend(relativeTime);

dayjs.locale('ko', {
  relativeTime: {
    future: '%s 후',
    past: '%s 전',
    s: '몇 초', // 몇 초 전
    m: '1분', // 1분 전
    mm: '%d분', // n분 전
    h: '1시간', // 1시간 전
    hh: '%d시간', // n시간 전
    d: '1일', // 1일 전 (하루 대신 1일로 변경)
    dd: '%d일', // n일 전
    M: '1달', // 1달 전
    MM: '%d달', // n달 전
    y: '1년', // 1년 전
    yy: '%d년', // n년 전
  },
});

function QuestionWithAnswer({
  question,
  questionDate,
  answer,
  answerDate,
  name,
  like,
  dislike,
  isRejected,
  questionId,
  answerId, // 답변 ID 추가
  handleReaction,
  isSubjectOwner,
}) {
  const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 상태 추가

  // 수정하기 핸들러
  const handleEdit = () => {
    setIsEditMode(true); // 수정 모드로 전환
  };

  // 삭제하기 핸들러
  const handleDelete = async () => {
    await deleteQuestion(questionId);
    // 질문 삭제 후 페이지 새로고침
    window.location.reload();
  };

  // 수정 완료 핸들러
  const handleSave = async (newContent, answerId, isRejected) => {
    try {
      await patchAnswer(newContent, answerId, isRejected); // API 호출
      setIsEditMode(false); // 수정 완료 후 수정 모드 해제
      // 수정 후 페이지 새로고침
      window.location.reload();
    } catch (error) {
      alert('답변 수정에 실패했습니다.');
    }
  };

  return (
    <div>
      <span>{answer ? '답변 완료' : '미답변'}</span>

      {/* 피드 주인일 경우에만 드롭다운 표시 */}
      {isSubjectOwner && <Dropdown onEdit={handleEdit} onDelete={handleDelete} />}

      {/* 수정 모드일 때 AnswerEditor 표시 */}
      {isEditMode ? (
        <AnswerEditor
          answerId={answer?.id || answerId} // 답변 ID 전달
          initialContent={answer?.content || ''} // 답변 내용 전달
          initialIsRejected={isRejected} // 답변 거절 여부 전달
          onSave={handleSave} // 저장 핸들러 전달
        />
      ) : (
        <>
          <div>
            <p>질문 · {dayjs(questionDate).fromNow()}</p>
            <p>{question.content}</p>
          </div>

          {answer && (
            <div>
              <div style={{ display: 'flex' }}>
                <p>{name}</p>
                <p>{dayjs(answerDate).fromNow()}</p>
              </div>
              <p>{answer.content}</p> {/* 답변 내용 표시 */}
            </div>
          )}

          <div style={{ display: 'flex' }}>
            {/* 좋아요/싫어요 버튼 */}
            <button onClick={() => handleReaction(questionId, 'like')} style={{ display: 'flex' }}>
              <img src={thumbsUp} alt="좋아요 아이콘" />
              좋아요: {like}
            </button>
            <button
              onClick={() => handleReaction(questionId, 'dislike')}
              style={{ display: 'flex' }}
            >
              <img src={thumbsDown} alt="싫어요 아이콘" />
              싫어요: {dislike}
            </button>
          </div>

          {isRejected && <p>답변 거절</p>}
        </>
      )}

      <br />
    </div>
  );
}

export default QuestionWithAnswer;
