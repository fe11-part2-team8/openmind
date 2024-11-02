import QuestionAndAnswer from './QuestionAndAnswer';
import styles from './QuestionListItem.module.css';

// # API 함수 props에서 제거
// # subject는 새롭게 요청하기 보단 상위 컴포넌트에서 받아온다.
function QuestionListItem({ isOwner, subject, questions, onUpdate }) {
  // # subject를 직접 받아오니 id를 url param에서 얻을 필요가 없음
  // # 상태값과 이를 정의하기 위한 useEffet 제거

  if (!questions) return;

  // porp 보내기
  return (
    <div className={styles.QuestionListItem}>
      {questions.results.map((question) => (
        <QuestionAndAnswer
          key={question.id}
          question={question} // 질문 객체 전달
          name={subject.name} // 이름 전달
          isSubjectOwner={isOwner} // 주인 여부 전달
          imageSource={subject.imageSource} // 프로필 이미지 URL 전달
          onUpdate={onUpdate} // onUpdate를 prop으로 전달
        />
      ))}
    </div>
  );
}

export default QuestionListItem;
