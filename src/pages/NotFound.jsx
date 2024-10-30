import { Link } from 'react-router-dom';
import '../global.css';

function NotFound() {
  return (
    <div className="mt-[120px] flex flex-col items-center">
      <h1 className="h1 font-bold">페이지가 없거나 접근할 수 없어요.</h1>
      <p className="body1 mt-3">입력하신 주소가 맞는지 다시 확인해 주세요.</p>
      <Link to="/">
        <button>오픈마인드 홈으로</button>
      </Link>
    </div>
  );
}

export default NotFound;
