import { useEffect } from 'react';
import styles from './Loading.module.css';

const loadingClassname = 'loading';

/**
 * 로딩 컴포넌트
 * @param {object} props
 * @param {boolean} props.isVisible : 로딩 여부 -> 노출 결정
 * @return {React.JSX} : 로딩 컴포넌트
 */
function Loading({ isVisible = false }) {
  if (isVisible) {
    document.body.classList.add(loadingClassname);
  } else {
    document.body.classList.remove(loadingClassname);
  }

  useEffect(() => {
    return () => {
      document.body.classList.remove(loadingClassname);
    };
  }, []);

  return <>{isVisible && <div id="loading" className={styles.loading} />}</>;
}

export default Loading;
