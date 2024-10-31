import { Link } from 'react-router-dom';
import SubjectCreateForm from '../components/SubjectCreateForm';

function HomePage() {
  return (
    <div>
      <SubjectCreateForm />
      <Link to={'/list'}>질문 작성하러 가기</Link>
    </div>
  );
}

export default HomePage;
