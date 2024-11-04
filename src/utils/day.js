import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko', {
  relativeTime: {
    future: '%s 후',
    past: '%s 전',
    s: '몇 초',
    m: '1분',
    mm: '%d분',
    h: '1시간',
    hh: '%d시간',
    d: '1일',
    dd: '%d일',
    M: '1달',
    MM: '%d달',
    y: '1년',
    yy: '%d년',
  },
});

// 상대 시간을 포맷팅하는 함수
export const formatRelativeTime = (date) => dayjs(date).fromNow();

// 특정 포맷으로 날짜를 포맷팅하는 함수 (기본 포맷: YYYY-MM-DD)
export const formatDate = (date, format = 'YYYY-MM-DD') => dayjs(date).format(format);
