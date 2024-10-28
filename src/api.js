import axios from 'axios';

const TEAM = '11-8';
const PATHS = {
  SUBJECT: '/subjects/',
  QUESTION: '/questions/',
  ANSWER: '/answers/',
};

const instance = axios.create({
  baseURL: `https://openmind-api.vercel.app/${TEAM}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 서브젝트 보내는 함수
 * @param {string} name - 닉네임
 * @returns {Promise<string>} - 생성된 서브젝트의 ID
 */
async function postSubject(name) {
  const data = {
    name,
    team: TEAM,
  };
<<<<<<< HEAD
  return instance
    .post(`${SUBJECTQUERY}`, data)
    .then((response) => {
      const subjectId = response.data.id;
      return subjectId;
    })
    .catch((error) => {
      console.error('패칭 중 오류가 발생했습니다', error.response?.data || error.message);
      throw new Error('피드를 보내는데 실패했습니다.');
    });
=======

  const response = await instance.post(`${PATHS.SUBJECT}`, data);
  return response.data;
>>>>>>> origin/develop
}

/**
 * 서브젝트 리스트
 * @returns {Promise<Object>} - 서브젝트 리스트 데이터
 */
async function getSubjectList(limit = 8, offset = 0) {
  const query = new URLSearchParams({ limit, offset }).toString();

  const response = await instance.get(`${PATHS.SUBJECT}?${query}`);
  return response.data;
}

/**
 * ID에 해당하는 서브젝트만 불러오는 함수
 * @param {string} subjectId - 서브젝트 ID
 * @returns {Promise<Object>} - 해당 서브젝트의 데이터
 */
async function getSubject(subjectId) {
  const response = await instance.get(`${PATHS.SUBJECT}${subjectId}/`);
  return response.data;
}

/**
 * ID에 해당하는 서브젝트만 삭제하는 함수
 * @param {string} subjectId - 서브젝트 ID
 * @returns {Promise<Object>} - 삭제된 서브젝트의 데이터
 */
async function deleteSubject(subjectId) {
  const response = await instance.delete(`${PATHS.SUBJECT}${subjectId}/`);
  return response.data;
}

/**
 * 질문 보내는 함수
 * @param {string} content - 질문 내용
 * @param {string} subjectId - 관련된 서브젝트의 ID
 * @returns {Promise<string>} - 생성된 질문의 ID
 */
async function postQuestion(content, subjectId) {
  const path = `${PATHS.SUBJECT}${subjectId}${PATHS.QUESTION}`;
  const data = {
    subjectId,
    content,
    team: TEAM,
  };

  const response = await instance.post(`${path}`, data);
  return response.data;
}

/**
 * 모든 질문을 목록으로 받아오는 함수
 * @param {string} subjectId - 관련된 서브젝트의 ID
 * @returns {Promise<Object>} - 모든 질문의 데이터
 */
async function getQuestionList(subjectId, limit = 10, offset = 0) {
  const query = new URLSearchParams({ limit, offset }).toString();
  const path = `${PATHS.SUBJECT}${subjectId}${PATHS.QUESTION}?${query}`;

  const response = await instance.get(`${path}`);
  return response.data;
}

/**
 * 특정 질문 받아오는 함수
 * @param {string} questionId - 질문 ID
 * @returns {Promise<Object>} - 해당 질문의 데이터
 */
async function getQuestion(questionId) {
  const path = `${PATHS.QUESTION}${questionId}/`;
  const response = await instance.get(`${path}`);
  return response.data;
}

/**
 * 질문 삭제하는 함수
 * @param {string} questionId - 질문 ID
 * @returns {Promise<Object>} - 삭제된 질문의 데이터
 */
async function deleteQuestion(questionId) {
  const path = `${PATHS.QUESTION}${questionId}/`;
  const response = await instance.delete(`${path}`);
  return response.data;
}

/**
 * 좋아요/싫어요 보내는 함수
 * @param {string} questionId - 질문 ID
 * @param {string} type - 'like' 또는 'dislike'
 * @returns {Promise<Object>} - 반응 데이터
 */
async function postReaction(questionId, type = 'like') {
  const path = `${PATHS.QUESTION}${questionId}/reaction/`;
  const data = {
    type,
  };

  const response = await instance.post(`${path}`, data);
  return response.data;
}

/**
 * 답변 보내는 함수
 * @param {string} content - 답변 내용
 * @param {string} questionId - 질문 ID
 * @param {boolean} [isRejected=false] - 답변 거절 여부
 * @returns {Promise<string>} - 생성된 답변의 ID
 */
async function postAnswer(content, questionId, isRejected = false) {
  const path = `${PATHS.QUESTION}${questionId}${PATHS.ANSWER}`;
  const data = {
    questionId,
    content,
    isRejected,
    team: TEAM,
  };

  const response = await instance.post(`${path}`, data);
  return response.data;
}

/**
 * 특정 답변 받아오는 함수
 * @param {string} answerId - 답변 ID
 * @returns {Promise<Object>} - 해당 답변의 데이터
 */
async function getAnswer(answerId) {
  const path = `${PATHS.ANSWER}${answerId}/`;
  const response = await instance.get(`${path}`);
  return response.data;
}

/**
 * 답변 수정하는 함수 (PUT)
 * @param {string} content - 수정할 내용
 * @param {string} answerId - 답변 ID
 * @param {boolean} [isRejected=false] - 답변 거절 여부
 * @returns {Promise<Object>} - 수정된 답변의 데이터
 */
async function putAnswer(content, answerId, isRejected = false) {
  const path = `${PATHS.ANSWER}${answerId}/`;
  const data = {
    content,
    isRejected,
  };

  const response = await instance.put(`${path}`, data);
  return response.data;
}

/**
 * 답변 수정하는 함수 (PATCH)
 * @param {string} content - 수정할 내용
 * @param {string} answerId - 답변 ID
 * @param {boolean} [isRejected=false] - 답변 거절 여부
 * @returns {Promise<Object>} - 수정된 답변의 데이터
 */
async function patchAnswer(content, answerId, isRejected = false) {
  const path = `${PATHS.ANSWER}${answerId}/`;
  const data = {
    content,
    isRejected,
  };

  const response = await instance.patch(`${path}`, data);
  return response.data;
}

/**
 * 답변 삭제하는 함수
 * @param {string} answerId - 답변 ID
 * @returns {Promise<Object>} - 삭제된 답변의 데이터
 */
async function deleteAnswer(answerId) {
  const path = `${PATHS.ANSWER}${answerId}/`;
  const response = await instance.delete(`${path}`);
  return response.data;
}

export {
  postSubject,
  getSubjectList,
  getSubject,
  deleteSubject,
  postQuestion,
  getQuestionList,
  getQuestion,
  deleteQuestion,
  postReaction,
  postAnswer,
  getAnswer,
  putAnswer,
  patchAnswer,
  deleteAnswer,
};
