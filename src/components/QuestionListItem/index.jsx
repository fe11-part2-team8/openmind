import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getQuestionList, getSubject } from '../../api';
import QuestionAndAnswer from './QuestionAndAnswer';
import useAsync from '../../hooks/useAsync';

import styles from './QuestionListItem.module.css';

function QuestionListItem({ questions, onUpdate }) {
  const { id } = useParams(); // URL에서 id (subjectId) 받아옴
  const [subjectData, setSubjectData] = useState(null); // 서브젝트 데이터 상태
  const [isSubjectOwner, setIsSubjectOwner] = useState(false); // 서브젝트 주인 여부

  // useAsync 훅을 사용하여 getQuestionList와 getSubject 호출 관리
  const {
    loading: loadingQuestions,
    error: errorQuestions,
    wrappedFunction: fetchQuestions,
  } = useAsync(getQuestionList);
  const {
    loading: loadingSubject,
    error: errorSubject,
    wrappedFunction: fetchSubject,
  } = useAsync(getSubject);

  useEffect(() => {
    async function getData() {
      try {
        const questionsResponse = await fetchQuestions(id);
        setSubjectData(questionsResponse.results);

        const subjectResponse = await fetchSubject(id);
        setSubjectData(subjectResponse);

        // subjectId 확인
        const storedSubjectId = localStorage.getItem('subjectId');
        if (storedSubjectId === id) {
          setIsSubjectOwner(true);
        }
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다!', error);
      }
    }

    getData();
  }, [id, fetchQuestions, fetchSubject]);

  // 로딩 또는 에러 상태 처리
  if (loadingQuestions || loadingSubject) {
    return <div>Loading...</div>;
  }

  if (errorQuestions || errorSubject) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다: {errorQuestions || errorSubject}</div>;
  }

  if (!questions.length || !subjectData) {
    return;
  }

  // porp 보내기
  return (
    <div className={styles.QuestionListItem}>
      {questions.map((question) => (
        <QuestionAndAnswer
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
          // setQuestions={setQuestions}
          answerId={question.answer ? question.answer.id : null} // 답변 ID (답변수정을 위해)
          imageSource={subjectData.imageSource} // 프로필 이미지 URL 전달
          onUpdate={onUpdate} // onUpdate를 prop으로 전달
        />
      ))}
    </div>
  );
}

export default QuestionListItem;
