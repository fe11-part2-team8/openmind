import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSubject } from '../../api';
import useAsync from '../../hooks/useAsync';
import icon_person from '../../assets/images/icon-person.svg';
import styles from './SubjectCreateForm.module.css';
import Loading from '../Loading';

const nameLengthError = '이름은 30자 이내로 적어주세요.';

function checkNameValid(name) {
  return name.length > 0 && name.length <= 30;
}

function SubjectCreateForm() {
  const [name, setName] = useState('');
  const { loading, error, wrappedFunction: postSubjectAsync } = useAsync(postSubject);
  const navigate = useNavigate();

  // 서브젝트 생성, 페이지 이동
  const handleCreateSubject = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    if (!checkNameValid(name)) {
      return; // 유효하지 않은 경우 폼 제출 방지
    }

    const result = await postSubjectAsync(name);
    if (error) {
      alert(error);
      return;
    }
    const subjectId = result.id;
    localStorage.setItem('subjectId', subjectId);
    navigate(`/list`);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <form className={styles.subjectCreateForm} onSubmit={handleCreateSubject}>
      <Loading isVisible={loading} />
      <div className={styles.inputContainer}>
        {name.length > 30 && <p className={styles.errorMessage}>{nameLengthError}</p>}
        <InputName name={name} onChange={handleChangeName} />
      </div>
      <button type="submit" disabled={!checkNameValid(name)}>
        질문 받기
      </button>
    </form>
  );
}

function InputName({ name, onChange }) {
  const inputRef = useRef();

  const handleToggleFocus = (e) => {
    if (e.type === 'focus') {
      inputRef.current.classList.add(styles.focus);
      return;
    }
    if (e.type === 'blur') {
      inputRef.current.classList.remove(styles.focus);
      return;
    }
  };

  return (
    <fieldset ref={inputRef} className={styles.inputName}>
      <label htmlFor="name">
        <img src={icon_person} alt="아이콘" />
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={onChange}
        onFocus={handleToggleFocus}
        onBlur={handleToggleFocus}
        placeholder="이름을 입력하세요"
      />
    </fieldset>
  );
}

export default SubjectCreateForm;
