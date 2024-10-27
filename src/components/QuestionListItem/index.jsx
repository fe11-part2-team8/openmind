import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllQuestions, getSubject } from '../../api';
import QuestionWithAnswer from './QuestionWithAnswer';

function QuestionListItem() {
  const { id } = useParams(); // URL에서 id (subjectId) 받아옴
  const [questions, setQuestions] = useState([]); // 질문 목록 상태
  const [subjectData, setSubjectData] = useState(null); // 서브젝트 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    async function getData() {
      try {
        //질문 데이터 받아옴
        const questionsResponse = await getAllQuestions(id); // subjectId를 전달
        setQuestions(questionsResponse.results); // 결과 데이터를 상태로 설정

        //서브젝트(name) 데이터 받아옴
        const subjectResponse = await getSubject(id); // subjectId를 전달
        setSubjectData(subjectResponse); // 서브젝트 데이터를 상태로 설정

        setLoading(false); // 로딩 상태 해제
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다!', error);
        setLoading(false); // 실패 시에도 로딩 상태 해제
      }
    }

    getData();
  }, [id]); // 의존성 배열에 id 추가

  //비동기 시 잘못된 데이터 불러오는 거 방지용
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!questions.length || !subjectData) {
    return <div>질문이 없습니다.</div>;
  }

  return (
    <div>
      {questions.map((question) => (
        <QuestionWithAnswer
          key={question.id}
          question={question} // 질문 객체 전달
          questionDate={question.createdAt} //질문 날짜 전달
          name={subjectData.name} // 이름 전달
          answer={question.answer} // 질문 객체 안의 답변 전달
          answerDate={question.answer ? question.answer.createdAt : null} //답변 날짜 전달
          like={question.like} //좋아요 전달
          dislike={question.dislike} //싫어요 전달
        />
      ))}
    </div>
  );
}

export default QuestionListItem;
