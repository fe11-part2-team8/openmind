import React from 'react';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as IconArrowRight } from '../assets/images/icon-arrow-right.svg';
import logo from '../assets/images/logo.svg'; // 이미지 가져오기
import SubjectCreateForm from '../components/SubjectCreateForm';

function HomePage() {
  return (
    <div className={styles.wrap}>
      <div className="container mx-auto flex flex-col items-center">
        <img src={logo} className={styles.logo} alt="Open Mind" />

        <Link to="/list" className="btn btn-outline sm:order-first sm:self-end">
          질문하러 가기
          <IconArrowRight width="18" height="18" />
        </Link>

        <SubjectCreateForm />
      </div>
    </div>
  );
}

export default HomePage;
