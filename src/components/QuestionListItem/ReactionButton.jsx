import { useState } from 'react';
import { postReaction } from '../../api';
import thumbsUp from '../../assets/images/ic_thumbs-up.svg';
import thumbsDown from '../../assets/images/ic_thumbs-down.svg';

/**
 * 좋아요 및 싫어요 버튼을 제공하는 컴포넌트
 * @param {object} props - 컴포넌트의 props
 * @param {number} props.questionId - 질문 ID
 * @param {number} props.initialLikes - 초기 좋아요 수
 * @param {number} props.initialDislikes - 초기 싫어요 수
 * @returns {React.JSX} 좋아요/싫어요 버튼 컴포넌트
 */

function ReactionButtons({ questionId, initialLikes, initialDislikes }) {
  const [reaction, setReaction] = useState({ like: initialLikes, dislike: initialDislikes });

  const handleClickReaction = async (e) => {
    const btn = e.target.closest('button');
    if (!btn || btn.hasAttribute('data-checked')) return;

    const type = btn.dataset.type;

    try {
      setReaction((prev) => ({ ...prev, [type]: prev[type] + 1 }));
      btn.setAttribute('data-checked', ''); // 중복 방지 속성 추가
      await postReaction(questionId, type);
    } catch (error) {
      console.error(`"${type}" 반영 실패:`, error);
    }
  };

  return (
    <div onClick={handleClickReaction} style={{ display: 'flex', gap: '10px' }}>
      <button data-type="like" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={thumbsUp} alt="좋아요 아이콘" />
        좋아요: {reaction.like}
      </button>
      <button data-type="dislike" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={thumbsDown} alt="싫어요 아이콘" />
        싫어요: {reaction.dislike}
      </button>
    </div>
  );
}

export default ReactionButtons;
