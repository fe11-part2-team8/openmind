import { useState } from 'react';
import { postAnswer } from '../../api';
import styles from './AnswerCreateForm.module.css';

//상태값이 변경되면 유효성 검사를 진행한다 : 빈값이면 false, 값이 있다면 true
function verifyContent(content) {
  if (content === '') {
    return false;
  } else {
    return true;
  }
}

//상위 컴포넌트에서 subjectName, subjectProfile을 받아온다.
function AnswerCreateForm({
  subjectName = '아초는 고양이',
  subjectProfile = 'subjectProfile',
  questionId = '1234',
  type = 'create',
}) {
  const [answerContent, setAnswerContent] = useState('');

  //사용자가 입력한 값을 상태값으로 저장한다.(여백없이)
  const handleChangeContent = (e) => {
    setAnswerContent(e.target.value.trim());
  };

  const handleSubmitContent = async (e) => {
    //폼 제출 이벤트 발생 시 폼 제출을 막는다.
    e.preventDefault();
    //API를 사용해서 답변을 보낸다.
    const response = await postAnswer(answerContent, questionId);
    console.log(response);
  };

  return (
    <div>
      <div>
        {/*서브젝트 이름을 React HTML로 화면에 표시한다.*/}
        <h1>{subjectName}</h1>
        {/*받아온 프로필 이미지 경로를 활용해 img 태그로 프로필을 표시한다.*/}
        <img src={subjectProfile} alt={`${subjectName} 프로필 이미지`} />
      </div>
      {/*첫 답변 생성 폼 만듬*/}
      <form onSubmit={handleSubmitContent}>
        {/*입력란을 textarea 태그로 만든다.*/}
        {/*placeholder로 "답변을 입력해주세요" 라고 표기한다.*/}
        <textarea type="text" placeholder="답변을 입력해주세요" onChange={handleChangeContent} />
        {/*답변 제출 버튼을 만듬*/}
        {/*disabled 초기 속성은 비활성화하고 유효성 검사가 성공하면 활성화 한다.*/}
        <button type="submit" disabled={!verifyContent(answerContent)}>
          답변 완료
        </button>
      </form>
    </div>
  );
}

export default AnswerCreateForm;
