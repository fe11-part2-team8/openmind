import { useState } from 'react';
import styles from './style.module.css';
import { postAnswer } from '../../api';

// 1. 서브젝트 이름
// 1.1. 상위 컴포넌트에서 서브젝트 이름을 받아온다.
// 1.2. 서브젝트 이름을 React HTML로 화면에 표시한다.
// 2. 프로필 표시
// 2.1. 상위 컴포넌트에서 서브젝트 프로필을 받아온다.
// 2.2. 받아온 프로필 이미지 경로를 활용해 img 태그로 프로필을 표시한다.

// 3. 답변 입력 폼
// 3.1. 첫 답변 생성
// 3.1.1. 입력란을 만든다. 무엇으로? textarea 태그로
// 3.1.1.1. placeholder로 "답변을 입력해주세요" 라고 표기한다.
// 3.1.1.2. 사용자가 입력한 값을 상태값으로 저장한다.
// 3.1.1.3. 상태값이 변경되면 유효성 검사를 진행한다.

// 3.1.2. 제출 버튼을 만든다.
// 3.1.2.1. 초기 속성은 disabled = false;
// 3.1.2.2. 유효성 검사가 성공하면 활성화 한다.
// 3.1.2.3. 폼 제출 이벤트 발생 시 이벤트를 우선 방지한다.
// 3.1.2.4. API를 사용해서 답변을 보낸다.

function checkValidContent(content) {
  if (content === '') return false;
  else return true;
}

function AnswerCreateForm({
  name = 'testname',
  imgSrc = 'https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg',
  questionId = '1234',
}) {
  const [answerContent, setAnswerContent] = useState('');

  const handleChangeContent = (event) => {
    setAnswerContent(event.target.value.trim());
  };

  const handleSubmitContent = async (event) => {
    event.preventDefault();
    const response = await postAnswer(answerContent, questionId);
    console.log(response);
  };

  return (
    <div>
      <div>
        <h4>{name}</h4>
        <img src={imgSrc} alt={name} width="100px" />
      </div>
      <form onSubmit={handleSubmitContent}>
        <textarea type="text" placeholder="답변을 입력해주세요" onChange={handleChangeContent} />
        <button type="submit" disabled={!checkValidContent(answerContent)}>
          답변 생성
        </button>
      </form>
    </div>
  );
}

export default AnswerCreateForm;
