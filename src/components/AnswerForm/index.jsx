// (1)프로필 보여준다.
// (2)상위 컴포넌트
// (3)이미지를 보여준다.
// (4)주제명을 보여준다.
// (5)답변폼을 만든다.
// (6)답변 입력을 만든다.
// (7)답변완료 버튼을 만든다.
// (8)수정시 답변을 불러와서 수정하기 기능 만든다.

/**
 * AnswerForm 컴포넌트
 * 사용자가 답변을 작성하거나 수정할 수 있도록 하는 답변 폼 컴포넌트입니다.
 *
 * @param {Object} props - 컴포넌트에 전달된 속성
 * @param {string} props.type - create 또는 edit로 답변 폼의 작동 방식을 결정합니다
 * @param {number} props.questionId - 질문의 ID
 * @param {string} props.feedName - 피드의 사용자 이름
 * @param {string} props.feedProfile - 피드 프로필 이미지의 URL
 * @param {function} props.onSubmit - 폼 제출 시 호출되는 콜백 함수
 * @returns {JSX.Element} - AnswerForm 컴포넌트
 */

import React, { useEffect } from 'react'; //리액트와 useEffect 훅을 가져옵니다.
import PropTypes from 'prop-types'; //PropTypes를 통해 컴포넌트 props의 타입 검사를 지원합니다.
import { useForm } from 'react-hook-form'; //react-hook-form의 useForm 훅을 가져옵니다.
import { yupResolver } from '@hookform/resolvers/yup'; //yup과 react-hook-form을 연결하는 yupResolver를 가져옵니다.
import * as yup from 'yup'; //yup을 사용하여 유효성 검사 스키마를 정의합니다.
import styles from './AnswerForm.module.css'; //모듈css로 스타일을 가져옵니다.

function AnswerForm({ type, questionId, feedName, feedProfile, onSubmit }) {
  /**
   * 유효성 검사 스키마 설정
   * answer는 필수 입력이며 문자열로만 입력이 가능
   */
  const schema = yup.object().shape({
    answer: yup.string().required('답변을 입력해주세요.'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  //(2)상위 컴포넌트에서 edit타입일 때 원래 답변을 불러온다
  useEffect(() => {
    if (type === 'edit') {
      fetch(`/api/answers_read/${questionId}`)
        .then((response) => response.json())
        .then((data) => setValue('answer', data.answer)) // 기존 답변을 폼에 설정
        .catch((error) => console.error('데이터 불러오기 오류:', error));
    }
  }, [type, questionId, setValue]);

  //폼 제출 핸들러 작성
  const onFormSubmit = (data) => {
    const url =
      type === 'create' ? '/api/question_answers_create' : `/api/answers_update/${questionId}`;
    fetch(url, {
      method: type === 'create' ? 'POST' : 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, answer: data.answer }),
    })
      .then(() => onSubmit()) //제출 성공 시 상위 컴포넌트의 콜백 함수 실행
      .catch((error) => console.error('제출 오류:', error)); //제출 실패 시 에러 메시지 출력
  };

  return (
    <div className={styles.answerForm}>
      {/* (1)프로필 보여준다 */}
      <div className={styles.header}>
        <img src={feedProfile} alt={`${feedName}의 프로필`} className={styles.profileImage} />{' '}
        {/* (3)이미지를 보여준다 */}
        <span>{feedName}</span> {/* (4)주제명 feedName을 보여준다 */}
      </div>

      {/* (5)답변폼을 만든다 */}
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {/* (6)답변 입력을 만든다 */}
        <textarea className={styles.textarea} placeholder="답변 입력" {...register('answer')} />
        {/* 유효성 검사 오류 발생 시 메시지 표시 */}
        {errors.answer && <p className={styles.error}>{errors.answer.message}</p>}

        {/* (7),(8)답변 완료 버튼 및 수정 버튼을 삼항연산자로 만든다 */}
        <button type="submit" className={styles.submitButton} disabled={!isDirty || !isValid}>
          {type === 'create' ? '답변 완료' : '수정 완료'}
        </button>
      </form>
    </div>
  );
}

// PropTypes를 통해 props 데이터 타입 검사
AnswerForm.propTypes = {
  type: PropTypes.oneOf(['create', 'edit']).isRequired,
  questionId: PropTypes.number.isRequired,
  feedName: PropTypes.string.isRequired,
  feedProfile: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AnswerForm;
