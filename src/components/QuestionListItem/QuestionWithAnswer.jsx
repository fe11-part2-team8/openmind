import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko'; // 한국어 가져오기
import thumbsUp from '../../assets/images/ic_thumbs-up.svg'; // 좋아요 아이콘
import thumbsDown from '../../assets/images/ic_thumbs-down.svg'; // 싫어요 아이콘
import Dropdown from './QuestionListItemDropdown';

import { deleteQuestion } from '../../api';

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
  handleReaction,
  isSubjectOwner,
  setQuestions,
}) {
  //드롭다운
  // 수정하기 핸들러
  const handleEdit = () => {
    console.log('수정하기 클릭');
    // 수정하기 로직 추가
  };
  // 삭제하기 핸들러
  const handleDelete = async () => {
    await deleteQuestion(questionId);
    // 질문 삭제 후 페이지 새로고침
    window.location.reload();
  };
  return (
    <div>
      <span>{answer ? '답변 완료' : '미답변'}</span>

      {/* 피드 주인일 경우에만 드롭다운 표시 */}
      {isSubjectOwner && <Dropdown onEdit={handleEdit} onDelete={handleDelete} />}

      <div>
        <p>질문 · {dayjs(questionDate).fromNow()}</p>
        <p>{question.content}</p>
        <p>{questionId}</p> {/* 확인용 */}
      </div>

      {answer && (
        <div>
          <div>
            <p>{name}</p>
            <p>{dayjs(answerDate).fromNow()}</p>
          </div>
          <p>{answer.content}</p>
        </div>
      )}

      <div>
        {/* 좋아요/싫어요 버튼 */}
        <button onClick={() => handleReaction(questionId, 'like')}>
          <img src={thumbsUp} alt="좋아요 아이콘" />
          좋아요: {like}
        </button>
        <button onClick={() => handleReaction(questionId, 'dislike')}>
          <img src={thumbsDown} alt="싫어요 아이콘" />
          싫어요: {dislike}
        </button>
      </div>

      {isRejected && <p>답변 거절</p>}
      <br />
    </div>
  );
}

export default QuestionWithAnswer;
