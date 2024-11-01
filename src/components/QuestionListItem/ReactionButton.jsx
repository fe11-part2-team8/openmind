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
    const storedReactions = JSON.parse(localStorage.getItem('reactions')) || {};
    const questionReaction = storedReactions[questionId];
    if (questionReaction) {
      setLikeClicked(questionReaction.likeClicked);
      setDislikeClicked(questionReaction.dislikeClicked);
      setReaction({ like: questionReaction.like, dislike: questionReaction.dislike });
    }
  }, [questionId]);

  const handleClickReaction = async (type) => {
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

    const storedReactions = JSON.parse(localStorage.getItem('reactions')) || {};
    storedReactions[questionId] = {
      likeClicked: type === 'like' && !likeClicked,
      dislikeClicked: type === 'dislike' && !dislikeClicked,
      ...updatedReaction,
    };
    localStorage.setItem('reactions', JSON.stringify(storedReactions));

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
