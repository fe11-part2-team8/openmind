import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllQuestions, getSubject } from '../../api'; // getAnswers는 불필요

function QuestionListItem() {
  const { id } = useParams(); // URL에서 id (subjectId) 추출
  const [questions, setQuestions] = useState([]);
  const [subjectData, setSubjectData] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (!id) {
      console.error('subjectId가 없습니다.');
      return;
    }

    async function getData() {
      try {
        // 모든 질문 가져오기
        const questionsResponse = await getAllQuestions(id); // id를 subjectId로 사용
        setQuestions(questionsResponse.results); // results 배열을 사용

        // 피드 정보 가져오기
        const subjectResponse = await getSubject(id);
        setSubjectData(subjectResponse);

        setLoading(false); // 데이터가 모두 로딩되면 로딩 상태를 false로 설정
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다!', error);
        setLoading(false); // 실패 시에도 로딩 상태를 해제
      }
    }

    getData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!questions.length || !subjectData) {
    return <div>질문이 없습니다.</div>;
  }

  return (
    <>
      <h2>{subjectData.name}의 질문 목록</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <Question
              id={question.id}
              content={question.content}
              createdAt={question.createdAt}
              like={question.like}
              dislike={question.dislike}
              answer={question.answer} // 답변 데이터를 함께 전달
            />
          </li>
        ))}
      </ul>
    </>
  );
}

function Question({ id, content, like, dislike, createdAt, answer }) {
  return (
    <div>
      <h3>질문 ID: {id}</h3>
      <p>질문 내용: {content}</p>
      <p>생성일: {new Date(createdAt).toLocaleString()}</p>
      <p>
        좋아요: {like}, 싫어요: {dislike}
      </p>

      {answer ? ( // 답변이 있으면 표시
        <div>
          <h4>답변</h4>
          <p>답변 내용: {answer.content}</p>
          <p>생성일: {new Date(answer.createdAt).toLocaleString()}</p>
          <p>{answer.isRejected ? '거절된 답변' : '채택된 답변'}</p>
        </div>
      ) : (
        <p>답변이 없습니다.</p>
      )}
    </div>
  );
}

export default QuestionListItem;
