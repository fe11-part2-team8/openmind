import { useState } from 'react';

/**
 * 예외 처리를 위한 커스텀 훅입니다.
 * @param {Function} asyncFunction - 실행할 비동기 함수
 *
 * @returns {Object} - 상태 및 함수를 포함한 객체 (아래 네 가지를 포함하고 있음)
 * @returns {boolean} loading - 함수 실행 중인지 여부
 * @returns {string|null} error - 발생한 오류 메시지
 * @returns {any|null} data - 비동기 함수의 반환 데이터
 * @returns {Function} wrappedFunction - 비동기 함수를 호출하는 함수
 */

function useAsync(asyncFunction) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  /**
   * 비동기 함수를 호출하는 래퍼 함수입니다.
   * @param {...any} args - 비동기 함수에 전달할 인자들
   */
  const wrappedFunction = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const responseData = await asyncFunction(...args);
      setData(responseData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, wrappedFunction };
}

export default useAsync;

// loading: 함수 실행하는 동안 true (값 받아오는 동안 버튼 비활성화 할 때)
// error: catch에서 받아온 에러 메시지
// data: 함수 실행 후 리턴된 data 값

// 페이지에서 사용 시 아래처럼 사용해주세요 //

// const { loading, error, data, wrappedFunction } = useAsync(API 함수);
// wrappedFunction(...args);
