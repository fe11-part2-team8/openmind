function AdminPage() {
  const [tab, setTab] = useState(0);

  return (
    <div className="container">
      <Navigation onClick={setTab} />
    </div>
  );
}

function Navigation({ onClick }) {
  const handleClickTab = (e) => {
    if (e.target.dataset.btn !== 'true') return;
    const value = Number(e.target.value);
    onClick(value);
  };

  return (
    <div onClick={handleClickTab}>
      <button value={0} data-btn={true}>
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
