import icon_message from '../../assets/images/icon-message.svg';
import icon_close from '../../assets/images/icon-close.svg';
import test_profile from '../../assets/images/test-profile.svg';
import styles from './QuestionCreateModal.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { postQuestion } from '../../api';
import { useParams } from 'react-router-dom';
import useAsync from '../../hooks/useAsync';
import Loading from '../Loading';

/**
 * 질문 내용의 유효성 검사 함수
 * @param {string} content 질문 내용
 * @returns 질문의 유효성 여부
 */
function checkContentValid(content) {
  if (content.length > 0) return true;
  else return false;
}

/**
 * 피드에 대한 질문 입력 폼을 담고 있는 모달 컴포넌트
 * @param {object} props
 * @param {object} props.profile 피드 프로필 정보
 * @param {string} props.profile.name 피드 이름
 * @param {string} props.profile.imageSource 피드 프로필 경로
 * @param {function} props.onClick 모달 on/off 상태를 조작할 함수
 * @returns {React.JSX} 질문 입력 모달 컴포넌트
 */
function QuestionCreateModal({ profile, onClick, onUpdate }) {
  const [content, setContent] = useState('');
  const { name, imageSource } = profile;
  const { id: subjectId } = useParams();
  const { loading, error, wrappedFunction: postQuestionAsync } = useAsync(postQuestion);
  const modalRef = useRef();

  /**
   * 모달 닫기를 하기 위한 이벤트 핸들러
   * @param {Event} e
   */
  const handleChangeContent = (e) => setContent(e.target.value.trim());
  const handleClickClose = () => {
    onClick(false);
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    await postQuestionAsync(content, subjectId);
    if (error) {
      alert(error);
    } else {
      onUpdate();
    }
    handleClickClose();
  };

  /**
   * 모달 외부를 클릭했을 때 모달 애니메이션을 보여주는 핸들러
   * @param {Event} e
   * @description `e.target`(클릭한 요소)가 modal 노드 내부에 포함되어 있어야 한다. 그렇지 않으면 모달 강조 애니메이션 출력. 로딩 중일 경우 동작하지 않는다.
   */
  const handleClickModalOutside = useCallback(
    (e) => {
      if (loading) return;
      if (!modalRef.current.contains(e.target)) {
        modalRef.current.classList.add(styles.highlight);
        modalRef.current.addEventListener('animationend', () => {
          modalRef.current.classList.remove(styles.highlight);
        });
      }
    },
    [loading],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickModalOutside);
    return () => document.removeEventListener('click', handleClickModalOutside);
  }, [handleClickModalOutside]);

  return (
    <div className={styles.modalBackground}>
      <Loading isVisible={loading} />
      <div id="modal" className={styles.modal} ref={modalRef}>
        <div className={styles.wrap}>
          <div className={styles.header}>
            <div className={styles.text}>
              <img src={icon_message} alt="메세지 아이콘" className="size-7" />
              <span>질문을 작성해 주세요</span>
            </div>
            <img
              className={styles.btnClose}
              src={icon_close}
              alt="닫기 버튼"
              onClick={handleClickClose}
            />
          </div>
          <div className={styles.destination}>
            <span className="to">To.</span>
            <img src={imageSource || test_profile} alt={name} />
            <span>{name}</span>
          </div>
          <QuestionCreateForm
            isValid={checkContentValid(content)}
            onChange={handleChangeContent}
            onSubmit={handleSubmitQuestion}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * 질문 생성을 위한 폼 컴포넌트
 * @param {object} props
 * @param {boolean} props.isValid 입력값 유효성 여부
 * @param {function} props.onChange 입력값 setter 함수
 * @param {function} props.onSubmit 폼 제출 이벤트 핸들러
 * @param {boolean} props.loading 질문 생성 응답 대기 로딩
 * @returns {React.JSX} 질문 생성 폼
 */
function QuestionCreateForm({ isValid, onChange, onSubmit, loading }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form className={styles.questionCreateFrom} onSubmit={onSubmit}>
      <textarea
        name="content"
        type="text"
        placeholder="질문을 입력하세요"
        required
        onChange={onChange}
        ref={inputRef}
      />
      <button type="submit" disabled={!isValid || loading}>
        질문 보내기
      </button>
    </form>
  );
}

export default QuestionCreateModal;
