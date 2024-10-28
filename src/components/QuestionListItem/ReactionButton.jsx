import { useState } from 'react';
import { postReaction } from '../../api';
import thumbsUp from '../../assets/images/ic_thumbs-up.svg';
import thumbsDown from '../../assets/images/ic_thumbs-down.svg';

function ReactionButtons({ questionId, initialLikes, initialDislikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userReaction, setUserReaction] = useState(null); // 사용자의 반응 상태 저장

  const handleLike = async () => {
    if (userReaction) return; // 이미 반응한 경우 중복 방지
    try {
      await postReaction(questionId, 'like');
      setLikes((prev) => prev + 1);
      setUserReaction('like');
    } catch (error) {
      console.error('좋아요 반영 실패:', error);
    }
  };

  const handleDislike = async () => {
    if (userReaction) return; // 이미 반응한 경우 중복 방지
    try {
      await postReaction(questionId, 'dislike');
      setDislikes((prev) => prev + 1);
      setUserReaction('dislike');
    } catch (error) {
      console.error('싫어요 반영 실패:', error);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <button onClick={handleLike} disabled={userReaction !== null} style={{ display: 'flex' }}>
        <img src={thumbsUp} alt="좋아요 아이콘" />
        좋아요: {likes}
      </button>
      <button onClick={handleDislike} disabled={userReaction !== null} style={{ display: 'flex' }}>
        <img src={thumbsDown} alt="싫어요 아이콘" />
        싫어요: {dislikes}
      </button>
    </div>
  );
}

export default ReactionButtons;
