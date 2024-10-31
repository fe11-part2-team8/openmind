import { useState, useEffect } from 'react';
import { postReaction } from '../../api';
import { ReactComponent as ThumbsUpIcon } from '../../assets/images/ic_thumbs-up.svg';
import { ReactComponent as ThumbsDownIcon } from '../../assets/images/ic_thumbs-down.svg';

import styles from './QuestionListItem.module.css';

function ReactionButtons({ questionId, initialLikes, initialDislikes }) {
  const [reaction, setReaction] = useState({ like: initialLikes, dislike: initialDislikes });
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  useEffect(() => {
    const storedReaction = localStorage.getItem(`reaction_${questionId}`);
    if (storedReaction) {
      const { likeClicked, dislikeClicked, like, dislike } = JSON.parse(storedReaction);
      setLikeClicked(likeClicked);
      setDislikeClicked(dislikeClicked);
      setReaction({ like, dislike });
    }
  }, [questionId]);

  const handleClickReaction = async (type) => {
    // 이미 클릭한 상태에서 같은 버튼을 누른 경우 취소
    if ((type === 'like' && likeClicked) || (type === 'dislike' && dislikeClicked)) {
      setReaction((prev) => ({
        ...prev,
        [type]: prev[type] - 1,
      }));
      setLikeClicked(false);
      setDislikeClicked(false);
      localStorage.setItem(
        `reaction_${questionId}`,
        JSON.stringify({
          likeClicked: false,
          dislikeClicked: false,
          like: type === 'like' ? reaction.like - 1 : reaction.like,
          dislike: type === 'dislike' ? reaction.dislike - 1 : reaction.dislike,
        }),
      );
      return;
    }

    // 한쪽 버튼만 클릭 가능하게 설정
    const newReaction = {
      like:
        type === 'like'
          ? likeClicked
            ? reaction.like
            : reaction.like + 1
          : reaction.like - (likeClicked ? 1 : 0),
      dislike:
        type === 'dislike'
          ? dislikeClicked
            ? reaction.dislike
            : reaction.dislike + 1
          : reaction.dislike - (dislikeClicked ? 1 : 0),
    };

    setReaction(newReaction);
    setLikeClicked(type === 'like');
    setDislikeClicked(type === 'dislike');

    // 로컬 스토리지에 저장
    localStorage.setItem(
      `reaction_${questionId}`,
      JSON.stringify({
        likeClicked: type === 'like',
        dislikeClicked: type === 'dislike',
        like: newReaction.like,
        dislike: newReaction.dislike,
      }),
    );

    // 서버에 리액션 업데이트
    await postReaction(questionId, type);
  };

  return (
    <div className={styles.reaction}>
      <button
        data-type="like"
        className={`${styles.thumbsUp} ${likeClicked ? styles.active : ''}`}
        onClick={() => handleClickReaction('like')}
      >
        <ThumbsUpIcon
          className="h-3.5 w-3.5"
          style={{ fill: likeClicked ? '#1877f2' : '#818181' }}
        />
        <span>좋아요: {reaction.like}</span>
      </button>
      <button
        data-type="dislike"
        className={`${styles.thumbsDown} ${dislikeClicked ? styles.active : ''}`}
        onClick={() => handleClickReaction('dislike')}
      >
        <ThumbsDownIcon
          className="h-3.5 w-3.5"
          style={{ fill: dislikeClicked ? '#b93333' : '#818181' }}
        />
        <span>싫어요: {reaction.dislike}</span>
      </button>
    </div>
  );
}

export default ReactionButtons;
