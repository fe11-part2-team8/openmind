<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
import React from 'react';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as IconArrowRight } from '../assets/images/icon-arrow-right.svg';
import logo from '../assets/images/logo.svg'; // 이미지 가져오기
>>>>>>> origin/develop
import SubjectCreateForm from '../components/SubjectCreateForm';

function HomePage() {
  return (
<<<<<<< HEAD
    <div>
      <SubjectCreateForm />
      <Link to={'/list'}>질문 작성하러 가기</Link>
=======
    <div className={styles.wrap}>
      <div className="container mx-auto flex flex-col items-center">
        <Link to="/list" className="btn btn-outline self-end">
          질문하러 가기
          <IconArrowRight width="18" height="18" />
        </Link>

        <img src={logo} className={styles.logo} alt="Open Mind" />

        <SubjectCreateForm />
      </div>
>>>>>>> origin/develop
    </div>
  );
}

export default HomePage;
