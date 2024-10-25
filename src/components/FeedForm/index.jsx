import { useState } from 'react';

function FeedForm() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <input value={inputValue} onChange={handleInputChange} />
      <button disabled={!inputValue}>질문 받기</button>
    </>
  );
}

export default FeedForm;
