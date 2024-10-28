import React, { useState } from 'react';
import more from '../../../assets/images/ic_More.svg'; // "더보기" 아이콘
import dropDownEdit from '../../../assets/images/ic_Edit.svg'; // 수정하기 아이콘
import dropDownClose from '../../../assets/images/ic_close.svg'; // 삭제하기 아이콘

const Dropdown = ({ onEdit, onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // 드롭다운 상태 관리

  // 드롭다운 토글
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* 더보기 버튼 */}
      <button onClick={toggleDropdown} style={{ border: 'none', background: 'none' }}>
        <img src={more} alt="더보기" />
      </button>

      {/* 드롭다운 */}
      {dropdownOpen && (
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            width: '130px',
          }}
        >
          <div
            onClick={onEdit}
            style={{ display: 'flex', alignItems: 'center', padding: '8px', cursor: 'pointer' }}
          >
            <img src={dropDownEdit} alt="수정하기" />
            <span>수정하기</span>
          </div>
          <div
            onClick={onDelete}
            style={{ display: 'flex', alignItems: 'center', padding: '8px', cursor: 'pointer' }}
          >
            <img src={dropDownClose} alt="삭제하기" />
            <span>삭제하기</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
