import React, { useState, useRef, useEffect } from 'react';
import more from '../../../assets/images/ic_More.svg'; // "더보기" 아이콘
import dropDownEdit from '../../../assets/images/ic_Edit.svg'; // 수정하기 아이콘
import dropDownClose from '../../../assets/images/icon-close.svg'; // 삭제하기 아이콘
import dropDownRejected from '../../../assets/images/ic-rejected.svg'; // 답변 거절 아이콘

/**
 * 답변 수정 및 삭제 옵션을 제공하는 드롭다운 컴포넌트
 * @param {object} props - 컴포넌트의 props
 * @param {function} props.onEdit - 수정 버튼 클릭 시 호출되는 함수
 * @param {function} props.onDelete - 삭제 버튼 클릭 시 호출되는 함수
 * @returns {React.JSX} 수정/삭제 드롭다운 컴포넌트
 */

const Dropdown = ({ onEdit, onDelete, onRefuse }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태 관리
  const dropdownRef = useRef(null); // 드롭다운 영역

  // 드롭다운 토글
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // 클릭 감지, 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // 외부 클릭 시 드롭다운 닫기
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // 수정 클릭 핸들러
  const handleEditClick = () => {
    onEdit();
    setDropdownOpen(false); // 수정 클릭 시 드롭다운 닫기
  };

  // 삭제 클릭 핸들러
  const handleDeleteClick = () => {
    onDelete();
    setDropdownOpen(false); // 삭제 클릭 시 드롭다운 닫기
  };

  // 딥뱐거부 클릭 핸들러
  const handleRefusalClick = () => {
    onRefuse();
    setDropdownOpen(false); //거절 클릭 시 드롭다운 닫기
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* 더보기 버튼 */}
      <button onClick={toggleDropdown} style={{ border: 'none', background: 'none' }}>
        <img src={more} alt="더보기" />
      </button>

      {/* 드롭다운 */}
      {dropdownOpen && (
        <div className="absolute right-0 flex w-32 flex-col items-center rounded-lg border border-gray-300 bg-white">
          <div
            onClick={handleEditClick}
            className="flex cursor-pointer items-center justify-center gap-2 p-2 hover:bg-gray-100"
          >
            <img src={dropDownEdit} alt="수정하기" className="h-3.8 w-3.8" />
            <span>수정하기</span>
          </div>
          <div
            onClick={handleRefusalClick}
            className="flex cursor-pointer items-center justify-center gap-2 p-2 hover:bg-gray-100"
          >
            <img src={dropDownRejected} alt="거절하기" className="h-3.8 w-3.8" />
            <span>거절하기</span>
          </div>
          <div
            onClick={handleDeleteClick} // 삭제 클릭 핸들러
            className="flex cursor-pointer items-center justify-center gap-2 p-2 hover:bg-gray-100"
          >
            <img src={dropDownClose} alt="삭제하기" className="h-3.8 w-3.8" />
            <span>삭제하기</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
