import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getQuestionList, getSubject } from '../../api';
import QuestionWithAnswer from './QuestionAndAnswer';

function QuestionListItem() {
  const { id } = useParams(); // URL에서 id (subjectId) 받아옴
  const [questions, setQuestions] = useState([]); // 질문 목록 상태
  const [subjectData, setSubjectData] = useState(null); // 서브젝트 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [isSubjectOwner, setIsSubjectOwner] = useState(false); //서브젝트 주인 여부

  useEffect(() => {
    async function getData() {
      try {
        //질문 데이터 받아옴
        const questionsResponse = await getQuestionList(id); // subjectId를 전달
        setQuestions(questionsResponse.results); // 결과 데이터를 상태로 설정

        //서브젝트(name) 데이터 받아옴
        const subjectResponse = await getSubject(id); // subjectId를 전달
        setSubjectData(subjectResponse); // 서브젝트 데이터를 상태로 설정

        // localStorage에서 저장된 피드 주인의 ID 가져오기
        const storedSubjectId = localStorage.getItem('subjectId');

        // 현재 피드 ID와 localStorage의 피드 ID 비교
        if (storedSubjectId === id) {
          setIsSubjectOwner(true); // 일치하면 피드 주인임
        }

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

  // 확인용!!!!!!!!!! 나중에 지우기~~~~~~~~~~~~~~~~~~~~~~
  localStorage.setItem('subjectId', 8668);

  return (
    <div>
      {questions.map((question) => {
        return (
          <QuestionWithAnswer
            key={question.id}
            questionId={question.id} // 질문 ID 전달
            question={question} // 질문 객체 전달
            questionDate={question.createdAt} // 질문 날짜 전달
            name={subjectData.name} // 이름 전달
            answer={question.answer} // 질문 객체 안의 답변 전달
            answerDate={question.answer ? question.answer.createdAt : null} // 답변 날짜 전달
            like={question.like} // 좋아요 전달
            dislike={question.dislike} // 싫어요 전달
            isRejected={question.answer ? question.answer.isRejected : false} // 답변 거절 상태 전달
            isSubjectOwner={isSubjectOwner} // 주인 여부 전달
            setQuestions={setQuestions}
            answerId={question.answer ? question.answer.id : null} // 답변 ID (답변수정을 위해)
            imageSource={subjectData.imageSource} // 프로필 이미지 URL 전달
          />
        );
      })}
    </div>
  );
}

export default QuestionListItem;
