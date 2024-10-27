import { useState } from 'react';
import SubjectList from './SubjectList';
import styles from './Admin.page.module.css';
import SubjectCreate from './SubjectCreate';

const PAGES = [<SubjectList />, <SubjectCreate />];

function AdminPage() {
  const [tab, setTab] = useState(0);

  return (
    <div className="container">
      <Navigation onClick={setTab} />
      {PAGES[tab]}
    </div>
  );
}

function Navigation({ onClick }) {
  const handleClickTab = (e) => {
    if (e.target.dataset.btn !== 'true') return;
    const value = Number(e.target.value);
    onClick(value);

    Array.from(e.currentTarget.children).forEach((child, i) => {
      if (i === value) {
        child.classList.add(styles.clicked);
      } else {
        child.classList.remove(styles.clicked);
      }
    });
  };

  return (
    <div className={styles.navigation} onClick={handleClickTab}>
      <button className={styles.clicked} value={0} data-btn={true}>
        피드 관리
      </button>
      <button value={1} data-btn={true}>
        피드 생성
      </button>
      <div />
    </div>
  );
}

export default AdminPage;
