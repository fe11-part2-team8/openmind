import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko'; // 한국어 가져오기

dayjs.extend(relativeTime);
// 맞춤형 한국어 로케일
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
}) {
  return (
    <div>
      <badge>{answer ? '답변 완료' : '미답변'}</badge>
      <div>
        <p>질문 · {dayjs(questionDate).fromNow()}</p>
        <h3>{question.content}</h3>
        {/* <p>질문id: {questionId}</p> */}
      </div>

      {answer && (
        <div>
          <h4>{name}</h4>
          <p>{dayjs(answerDate).fromNow()}</p>
          <p>{answer.content}</p>
        </div>
      )}
      <p>
        <button onClick={() => handleReaction(questionId, 'like')}>좋아요: {like}</button>
        <button onClick={() => handleReaction(questionId, 'dislike')}>싫어요: {dislike}</button>
      </p>

      {isRejected && <p>답변 거절</p>}
      <br></br>
    </div>
  );
}

export default QuestionWithAnswer;
