import QuestionAndAnswer from './QuestionAndAnswer';

import styles from './QuestionListItem.module.css';

// API 함수 props에서 제거
// subject는 새롭게 요청하기 보단 상위 컴포넌트에서 받아온다.
function QuestionListItem({ isOwner, subject, questions, onUpdate }) {

  // subject를 직접 받아오니 id를 url param에서 얻을 필요가 없음
  // 상태값과 이를 정의하기 위한 useEffet 제거

  console.log(questions)

  if(!questions) return;

  // porp 보내기
  return (
    <div className={styles.QuestionListItem}>
      {questions.results.map((question) => (
        <QuestionAndAnswer
          key={question.id}
          questionId={question.id} // 질문 ID 전달
          question={question} // 질문 객체 전달
          questionDate={question.createdAt} // 질문 날짜 전달
          name={subject.name} // 이름 전달
          answer={question.answer} // 질문 객체 안의 답변 전달
          answerDate={question.answer ? question.answer.createdAt : null} // 답변 날짜 전달
          like={question.like} // 좋아요 전달
          dislike={question.dislike} // 싫어요 전달
          isRejected={question.answer ? question.answer.isRejected : false} // 답변 거절 상태 전달
          isSubjectOwner={isOwner} // 주인 여부 전달
          // setQuestions={setQuestions}
          answerId={question.answer ? question.answer.id : null} // 답변 ID (답변수정을 위해)
          imageSource={subject.imageSource} // 프로필 이미지 URL 전달
          onUpdate={onUpdate} // onUpdate를 prop으로 전달
        />
      ))}
    </div>
  );
}

export default QuestionListItem;
