import React from 'react';
import styles from './HomePage.module.css';

import logo from '../assets/images/logo.svg';
import homepage from '../assets/images/main-background.png';
import SubjectCreateForm from '../components/SubjectCreateForm';

function HomePage() {
  return (
    <div className={styles.homepage}>
      <img src={logo} alt="Open Mind" width="456" height="180" />
      <SubjectCreateForm />
      <img src={homepage} alt="HomePage bottom img" width="1200" height="627" />
    </div>
  );
}

export default HomePage;
