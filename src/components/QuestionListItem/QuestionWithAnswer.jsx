function QuestionWithAnswer({ question, questionDate, answer, answerDate, name, like, dislike }) {
  return (
    <div>
      <div>
        <h3>{question.content}</h3>
        <p>질문 날짜: {questionDate}</p>
      </div>

      {answer ? (
        <div>
          <h4>{name}</h4>
          <p>답변 날짜: {answerDate}</p>
          <p>{answer.content}</p>
        </div>
      ) : (
        <p>답변이 없습니다.</p>
      )}
      <p>좋아요: {like}</p>
      <p>싫어요: {dislike}</p>
      <br></br>
    </div>
  );
}

export default QuestionWithAnswer;
