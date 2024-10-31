import React from 'react';
// import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as IconArrowRight } from '../assets/images/icon-arrow-right.svg';
import logo from '../assets/images/logo.svg'; // 이미지 가져오기
import homeImg from '../assets/images/main-background.png'; // 이미지 가져오기
import SubjectCreateForm from '../components/SubjectCreateForm';

function HomePage() {
  return (
    <div>
      <img src={logo} alt="Open Mind" className="h-[180px] w-[456px]" />

      <Link to="/list" className="btn btn-outline">
        질문하러 가기
        <IconArrowRight width="18" height="18" />
      </Link>

      <SubjectCreateForm />

      <img src={homeImg} alt="HomePage bottom img" />
    </div>
  );
}

export default HomePage;
