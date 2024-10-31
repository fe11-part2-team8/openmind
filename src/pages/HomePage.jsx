import React from 'react';
// import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as IconArrowRight } from '../assets/images/icon-arrow-right.svg';
import logo from '../assets/images/logo.svg'; // 이미지 가져오기
import homeImg from '../assets/images/main-background.png'; // 이미지 가져오기
import SubjectCreateForm from '../components/SubjectCreateForm';

function HomePage() {
  return (
    <div className="grid-rows=[auto_auto_auto] grid min-h-screen gap-8 bg-white p-6">
      <div className="mt-20 flex flex-col items-center">
        <img src={logo} alt="Open Mind" className="mb-6 w-60" />
        <Link to="/list" className="btn btn-outline">
          질문하러 가기
          <IconArrowRight width="18" height="18" />
        </Link>
      </div>

      <div className="grid grid-rows-[auto_auto] gap-4">
        <SubjectCreateForm />
      </div>

      <div className="w-full">
        <img src={homeImg} alt="HomePage bottom img" className="h-auto w-full object-contain" />
      </div>
    </div>
  );
}

export default HomePage;
