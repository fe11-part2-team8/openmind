import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getQuestionList, getSubject } from '../api';
import useAsync from '../hooks/useAsync';

import styles from './PostPage.module.css';
import '../global.css';

import logo from '../assets/images/logo.svg';
import banner from '../assets/images/banner.png';
// import defortProfile from '../assets/images/default-profile.jpg';

function PostPage() {
  const { id } = useParams();
  const [total, setTotal] = useState(0);
  const [profileImage, setProfileImage] = useState('');
  const [username, setUsername] = useState('');

  const { error: questionError, wrappedFunction: fetchQuestion } = useAsync(getQuestionList);
  const { error: subjectError, wrappedFunction: fetchSubject } = useAsync(getSubject);

  useEffect(() => {
    /**
     * 질문 리스트를 요청해서 받아오는 함수
     * @returns {object} 질문 리스트 객체
     */
    const loadContent = async () => {
      const result = await fetchQuestion(id);
      const profile = await fetchSubject(id);

      if (!result || !profile) {
        console.log(questionError || subjectError);
        return;
      }

      setTotal(result.count);
      setProfileImage(profile.imageSource);
      setUsername(profile.name);
    };

    loadContent();
  }, [id]);

  return (
    <div className="container mx-auto">
      <img src={banner} alt="Background_Banner" className={styles.banner} />
      <div className="relative z-10 mt-[50px] flex flex-col items-center gap-3">
        <Link to="/">
          <img src={logo} alt="OpenMind" />
        </Link>
        <img src={profileImage} alt="ProfileImage" className={styles.profile} />
        <h2 className="h2">{username}</h2>
        <p className="body1">{total}개의 질문이 있습니다</p>
      </div>
    </div>
  );
}

export default PostPage;
