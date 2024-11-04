import React from 'react';
import styles from './HomePage.module.css';

import { Link } from 'react-router-dom';
import { ReactComponent as IconArrowRight } from '../assets/images/icon-arrow-right.svg';
import { Helmet } from 'react-helmet';

import snsLink from '../assets/images/snsLink.png';
import logo from '../assets/images/logo.svg'; // 이미지 가져오기
import SubjectCreateForm from '../components/SubjectCreateForm';

function HomePage() {
  const urlToShare = window.location.href;

  return (
    <div>
      <Helmet>
        <meta property="og:url" content={urlToShare} />
        <meta property="og:title" content={`Open Mind - 마음을 열고 고민을 나눠요.`} />
        <meta
          property="og:description"
          content={`익명으로 고민을 나누는 채팅 커뮤니티 서비스, Open Mind 입니다.`}
        />
        <meta property="og:image" content={snsLink} />
      </Helmet>

      <div className={styles.wrap}>
        <div className="container mx-auto flex flex-col items-center">
          <h1>
            <img src={logo} className={styles.logo} alt="Open Mind" />
          </h1>

          <Link to="/list" className="btn btn-outline mb-6 mt-6 md:order-first md:self-end">
            질문하러 가기
            <IconArrowRight width="18" height="18" />
          </Link>

          <SubjectCreateForm />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
