import { useState, useEffect } from 'react';
import { postReaction } from '../../api';
import { ReactComponent as ThumbsUpIcon } from '../../assets/images/ic_thumbs-up.svg';
import { ReactComponent as ThumbsDownIcon } from '../../assets/images/ic_thumbs-down.svg';

import styles from './QuestionList.module.css';

function ReactionButtons({ questionId, initialLikes, initialDislikes }) {
  const [reaction, setReaction] = useState({ like: initialLikes, dislike: initialDislikes });
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  useEffect(() => {
    const storedReactions = JSON.parse(localStorage.getItem('reactions')) || {};
    const questionReaction = storedReactions[questionId];
    if (questionReaction) {
      setLikeClicked(questionReaction.likeClicked);
      setDislikeClicked(questionReaction.dislikeClicked);
      setReaction({ like: questionReaction.like, dislike: questionReaction.dislike });
    }
  }, [questionId]);

  const handleClickReaction = async (type) => {
    const prevReaction = { ...reaction }; // 이전 상태 저장
    const prevLikeClicked = likeClicked;
    const prevDislikeClicked = dislikeClicked;

    // UI에 낙관적으로 변경사항 반영
    const updatedReaction = {
      like:
        type === 'like' && !likeClicked ? reaction.like + 1 : reaction.like - (likeClicked ? 1 : 0),
      dislike:
        type === 'dislike' && !dislikeClicked
          ? reaction.dislike + 1
          : reaction.dislike - (dislikeClicked ? 1 : 0),
    };

    setReaction(updatedReaction);
    setLikeClicked(type === 'like' && !likeClicked);
    setDislikeClicked(type === 'dislike' && !dislikeClicked);

    // 로컬 저장소 업데이트
    const storedReactions = JSON.parse(localStorage.getItem('reactions')) || {};
    storedReactions[questionId] = {
      likeClicked: type === 'like' && !likeClicked,
      dislikeClicked: type === 'dislike' && !dislikeClicked,
      ...updatedReaction,
    };
    localStorage.setItem('reactions', JSON.stringify(storedReactions));

    // 서버에 리액션 업데이트 요청
    try {
      await postReaction(questionId, type);
    } catch (error) {
      // 에러 발생 시 이전 상태로 롤백
      console.error('서버에 리액션 업데이트 요청 실패:', error);
      setReaction(prevReaction);
      setLikeClicked(prevLikeClicked);
      setDislikeClicked(prevDislikeClicked);

      // 로컬 저장소도 이전 상태로 복구
      storedReactions[questionId] = {
        likeClicked: prevLikeClicked,
        dislikeClicked: prevDislikeClicked,
        ...prevReaction,
      };
      localStorage.setItem('reactions', JSON.stringify(storedReactions));
    }
  };

  return (
    <div className={styles.reaction}>
      <button
        data-type="like"
        className={`${styles.thumbsUp} ${likeClicked ? styles.active : ''}`}
        onClick={() => handleClickReaction('like')}
      >
        <ThumbsUpIcon style={{ fill: likeClicked ? '#1877f2' : '#818181' }} />
        <span>좋아요: {reaction.like}</span>
      </button>
      <button
        data-type="dislike"
        className={`${styles.thumbsDown} ${dislikeClicked ? styles.active : ''}`}
        onClick={() => handleClickReaction('dislike')}
      >
        <ThumbsDownIcon style={{ fill: dislikeClicked ? '#b93333' : '#818181' }} />
        <span>싫어요: {reaction.dislike}</span>
      </button>
    </div>
  );
}

export default ReactionButtons;
