// 4. 수정 상태 답변 입력 폼
// 타입값에 따라 버튼과 api가 변하게 한다 - 버튼0  api0

// 1. 기존 답변을 props로 받아온다 - 일단 originAnswer 0
// 2. 타입이 create일때 초기값이 빈 값이고 edit일때 기존답변이 초기값이 된다 0
// 3. 타입이 edit일 때 기존답변과 수정답변을 비교한다 - 유효성 검사 0
// (그럼 수정하기 했을 땐 답변완료 라고 적혀있을텐데 일단 스킵)
// 4. 타입이 edit일 때 버튼 글자가 수정완료 로 변경되어야한다 0
// 5. 타입이 edit일 때 patch api를 실행한다 0

import { useState } from 'react';
import { postAnswer, patchAnswer } from '../../api';
// import styles from './AnswerCreateForm.module.css';

//상태값이 변경되면 유효성 검사를 진행한다 :
//빈값이거나 기존 답변(edit타입일때)이면 false, 값이 있거나 수정된 답변일 경우 true 4.2 0  이거하기
function verifyContent(content, originAnswer) {
  if (content === '' || content === originAnswer) {
    return false;
  } else {
    return true;
  }
}

//상위 컴포넌트에서 subjectName, subjectProfile, originAnswer를 받아온다. 4.1 0

// TODO: 답변 수정일때 answerId 가 있을때, originAnswer 빈값이 아닐때
// answerId 받아야함. 수정일때 patchAnswer 에 answerId 로 값을 보내야함

/**
 * 답변 폼 컴포넌트
 * @param {object} props
 * @param {string} props.subjectName
 * @param {string} props.subjectProfile 썸네일 주소값
 * @param {string} props.questionId
 * @param {string} props.type
 * @param {string} props.originAnswer 내용 유무로 답변 저장, 수정 체크 -> 나중
 * @returns
 */
function AnswerCreateForm({
  subjectName,
  subjectProfile,
  questionId,
  answerId,
  type = 'create',
  originAnswer = '', // 더블체크 -> 추후 수정해보면 좋을듯
}) {
  //타입에 따라 초기값을 빈 값 또는 originAnswer로 설정한다. - 유효성검사 4.3 0
  const [answerContent, setAnswerContent] = useState(originAnswer);

  //사용자가 입력한 값을 상태값으로 저장한다.(여백없이)
  const handleChangeContent = (e) => {
    setAnswerContent(e.target.value.trim());
  };

  const handleSubmitContent = async (e) => {
    //폼 제출 이벤트 발생 시 폼 제출을 막는다.
    e.preventDefault();
    let response; //상태에 따라 값을 보내주기 전 가지고 있는 용도 - 검색

    //API를 사용해서 답변을 보낸다. -> 타입에 따라 create = postAnswer, edit = patchAnswer 실행 4.5 0
    if (type === 'create') {
      response = await postAnswer(answerContent, questionId);
    } else if (type === 'edit') {
      response = await patchAnswer(answerContent, answerId);
    }
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
        <textarea
          type="text"
          value={answerContent}
          placeholder="답변을 입력해주세요"
          onChange={handleChangeContent}
        />
        {/*답변 제출 버튼을 만듬*/}
        {/*disabled 초기 속성은 비활성화하고 유효성 검사가 성공하면 활성화 한다. 4.4 0*/}
        <button
          type="submit"
          className="btn"
          disabled={!verifyContent(answerContent, originAnswer)}
        >
          {type === 'create' ? '답변 완료' : '수정 완료'}
        </button>
      </form>
    </div>
  );
}

export default AnswerCreateForm;
