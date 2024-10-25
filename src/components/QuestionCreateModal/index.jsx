import ic_message from '../../assets/images/ic_message.png';
import ic_close from '../../assets/images/ic_close.png';
import styles from './QuestionCreateModal.module.css';

function QuestionCreateModal() {
  const handleClickModalOutside = (e) => {
    if (e.target.classList.contains(styles.modalBackground)) {
      // 모달 강조
    }
  };

  return (
    <div className={styles.modalBackground} onClick={handleClickModalOutside}>
      <QuestionCreateForm />
    </div>
  );
}

function QuestionCreateForm() {
  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <div className={styles.text}>
          <img src={ic_message} alt="메세지 아이콘" />
          <span>질문을 작성해 주세요</span>
        </div>
        <img className={styles.btnClose} src={ic_close} alt="닫기 버튼" />
      </div>
      <div className={styles.destination}>
        <span className="to">To.</span>
        <img src={undefined} alt="피드 프로필" />
        <span>아초는 고양이</span>
      </div>
      <form>
        <textarea name="content" type="text" placeholder="질문을 입력하세요" required />
        <button type="submit" disabled>
          질문 보내기
        </button>
      </form>
    </div>
  );
}

export default QuestionCreateModal;
