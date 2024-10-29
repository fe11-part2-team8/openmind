import { useState } from 'react';
import { postAnswer, postQuestion, postSubject } from '../../api';
import styles from './SubjectCreate.module.css';

const DEFAULT_VALUE = {
  subject: 1,
  question: 0,
  answer: false,
};

const createData = async (value) => {
  const content = Date.now().toString();

  for (let i = 0; i < value.subject; i++) {
    const subject = await postSubject(content + i);
    console.log('Subject : ', subject);
    await new Promise((resolve) => setTimeout(resolve, 200));
    for (let j = 0; j < value.question; j++) {
      const question = await postQuestion(content + i, subject.id);
      console.log('Question : ', question);
      await new Promise((resolve) => setTimeout(resolve, 200));
      if (value.question) {
        const answer = await postAnswer(content + i, question.id);
        console.log('Answer : ', answer);
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }
  }
};

function SubjectCreate() {
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (e) => {
    const id = e.target.id;
    const value = e.target.id === 'answer' ? e.target.checked : e.target.value;

    setValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createData(value);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmitForm} onChange={handleChangeInput}>
      <fieldset>
        <label htmlFor="subject">생성 피드 수</label>
        <input id="subject" type="number" placeholder="생성할 피드 수를 입력해주세요" />
      </fieldset>
      <fieldset>
        <label htmlFor="question">피드당 질문 수</label>
        <input id="question" type="number" placeholder="피드당 질문 수를 입력해주세요" />
      </fieldset>
      <fieldset>
        <label htmlFor="answer">답글 작성 여부</label>
        <input id="answer " type="checkbox" />
      </fieldset>
      <button type="submit" disabled={loading}>
        생성하기
      </button>
    </form>
  );
}

export default SubjectCreate;
