import ic_message from '../../assets/images/ic_message.png';
import ic_close from '../../assets/images/ic_close.png';

function QuestionCreateForm() {
  return (
    <div id="modal">
      <div id="modal-header">
        <img src={ic_message} alt="메세지 아이콘" />
        <span>질문을 작성해 주세요</span>
        <img src={ic_close} alt="닫기 버튼" />
      </div>
      <div id="modal-main">
        <div>
          <span>To.</span>
          <img src={undefined} alt="피드 프로필" />
        </div>
        <form>
          <textarea name="content" placeholder="질문을 입력하세요" required />
          <button type="submit">질문 보내기</button>
        </form>
      </div>
    </div>
  );
}

export default QuestionCreateForm;
