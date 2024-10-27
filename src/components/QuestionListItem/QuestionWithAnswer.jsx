import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko'; // 한국어 가져오기

dayjs.extend(relativeTime);
dayjs.locale('ko');

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
}) {
  return (
    <div>
      <div>
        <h3>{question.content}</h3>
        <p>질문 날짜: {dayjs(questionDate).fromNow()}</p>
        <p>질문id: {questionId}</p>
      </div>

      {answer ? (
        <div>
          a<h4>{name}</h4>
          <p>답변 날짜: {dayjs(answerDate).fromNow()}</p>
          <p>{answer.content}</p>
        </div>
      ) : (
        <p>답변이 없습니다.</p>
      )}
      <p>좋아요: {like}</p>
      <p>싫어요: {dislike}</p>

      {isRejected && <p>답변 거절</p>}
      <br></br>
    </div>
  );
}

export default QuestionWithAnswer;
