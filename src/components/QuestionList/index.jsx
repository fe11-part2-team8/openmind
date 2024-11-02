import QuestionAndAnswer from './QuestionAndAnswer';
import styles from './QuestionList.module.css';

// # API 함수 props에서 제거
// # subject는 새롭게 요청하기 보단 상위 컴포넌트에서 받아온다.

/**
 * 질문 리스트 아이템을 보여주기 위한 컴포넌트. 질문에 대한 답변 생성, 수정 혹은 질문 삭제가 가능하다.
 * @param {object} props
 * @param {boolean} props.isSubjectOwner 피드 주인 여부
 * @param {{name : string, imageSource : string}} props.subject subject 객체
 * @param {object} props.questions questions 객체
 * @param {number} props.questions.count question 개수
 * @param {{id : number, content : string, like : number, dislike : number, createdAt : string, answer : { id : number, content : string, isRejected : boolean, createdAt : string} | null}[]} props.questions.results
 * @param {function} props.onUpdate question 리스트 업데이트 핸들러
 * @returns {React.JSX} 질문 리스트 아이템 컴포넌트
 */
function QuestionList({ isSubjectOwner, subject, questions, onUpdate }) {
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
          isSubjectOwner={isSubjectOwner} // 주인 여부 전달
          imageSource={subject.imageSource} // 프로필 이미지 URL 전달
          onUpdate={onUpdate} // onUpdate를 prop으로 전달
        />
      ))}
    </div>
  );
}

export default QuestionList;
