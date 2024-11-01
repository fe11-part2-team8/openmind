import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import '../global.css';
import snsLink from '../assets/images/snsLink.png';
import warning from '../assets/images/warning.png';

function NotFound() {
  const urlToShare = window.location.href;

  return (
    <div>
      <Helmet>
        <meta property="og:url" content={urlToShare} />
        <meta property="og:title" content={`Open Mind - 404 Error`} />
        <meta property="og:description" content={`유효하지 않은 페이지입니다.`} />
        <meta property="og:image" content={snsLink} />
      </Helmet>

      <div className="mt-[120px] flex flex-col items-center">
        <img src={warning} alt="warning" />
        <h1 className="h1 mt-7 font-bold">페이지가 없거나 접근할 수 없어요.</h1>
        <p className="body1 mt-4">입력하신 주소가 맞는지 다시 확인해 주세요.</p>
        <Link to="/">
          <button className="btn btn-rounded mt-[40px]">오픈마인드 홈으로</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
