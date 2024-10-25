import axios from 'axios';

const TEAM = '11-8';
const PATH = {
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
 * 피드 보내는 함수
 * @param {string} name - 닉네임
 * @returns {Promise<string>} - 생성된 피드의 ID
 */
async function postSubject(name) {
  const data = {
    name,
    team: TEAM,
  };

  const response = await instance.post(`${PATH.SUBJECT}`, data);
  return response.data.id;
}

/**
 * 모든 사람 피드 불러오는 함수
 * @returns {Promise<Object>} - 모든 피드의 데이터
 */
async function getSubjectList() {
  const response = await instance.get(`${PATH.SUBJECT}`);
  return response.data;
}

/**
 * ID에 해당하는 피드만 불러오는 함수
 * @param {string} subjectId - 피드 ID
 * @returns {Promise<Object>} - 해당 피드의 데이터
 */
async function getSubject(subjectId) {
  const response = await instance.get(`${PATH.SUBJECT}${subjectId}/`);
  return response.data;
}

/**
 * ID에 해당하는 피드만 삭제하는 함수
 * @param {string} subjectId - 피드 ID
 * @returns {Promise<Object>} - 삭제된 피드의 데이터
 */
async function deleteSubject(subjectId) {
  const response = await instance.delete(`${PATH.SUBJECT}${subjectId}/`);
  return response.data;
}

/**
 * 질문 보내는 함수
 * @param {string} content - 질문 내용
 * @param {string} subjectId - 관련된 피드의 ID
 * @returns {Promise<string>} - 생성된 질문의 ID
 */
async function postQuestion(content, subjectId) {
  const query = `${PATH.SUBJECT}${subjectId}${PATH.QUESTION}`;
  const data = {
    subjectId,
    content,
    team: TEAM,
  };

  const response = await instance.post(`${query}`, data);
  return response.data.id;
}

/**
 * 모든 질문을 목록으로 받아오는 함수
 * @param {string} subjectId - 관련된 피드의 ID
 * @returns {Promise<Object>} - 모든 질문의 데이터
 */
async function getQuestionList(subjectId) {
  const query = `${PATH.SUBJECT}${subjectId}${PATH.QUESTION}`;
  const response = await instance.get(`${query}`);
  return response.data;
}

/**
 * 특정 질문 받아오는 함수
 * @param {string} questionId - 질문 ID
 * @returns {Promise<Object>} - 해당 질문의 데이터
 */
async function getQuestion(questionId) {
  const query = `${PATH.QUESTION}${questionId}/`;
  const response = await instance.get(`${query}`);
  return response.data;
}

/**
 * 질문 삭제하는 함수
 * @param {string} questionId - 질문 ID
 * @returns {Promise<Object>} - 삭제된 질문의 데이터
 */
async function deleteQuestion(questionId) {
  const query = `${PATH.QUESTION}${questionId}/`;
  const response = await instance.delete(`${query}`);
  return response.data;
}

/**
 * 좋아요/싫어요 보내는 함수
 * @param {string} questionId - 질문 ID
 * @param {string} type - 'like' 또는 'dislike'
 * @returns {Promise<Object>} - 반응 데이터
 */
async function postReaction(questionId, type = 'like') {
  const query = `${PATH.QUESTION}${questionId}/reaction/`;
  const data = {
    type,
  };

  const response = await instance.post(`${query}`, data);
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
  const query = `${PATH.QUESTION}${questionId}${PATH.ANSWER}`;
  const data = {
    questionId,
    content,
    isRejected,
    team: TEAM,
  };

  const response = await instance.post(`${query}`, data);
  return response.data.id;
}

/**
 * 특정 답변 받아오는 함수
 * @param {string} answerId - 답변 ID
 * @returns {Promise<Object>} - 해당 답변의 데이터
 */
async function getAnswer(answerId) {
  const query = `${PATH.ANSWER}${answerId}/`;
  const response = await instance.get(`${query}`);
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
  const query = `${PATH.ANSWER}${answerId}/`;
  const data = {
    content,
    isRejected,
  };

  const response = await instance.put(`${query}`, data);
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
  const query = `${PATH.ANSWER}${answerId}/`;
  const data = {
    content,
    isRejected,
  };

  const response = await instance.patch(`${query}`, data);
  return response.data;
}

/**
 * 답변 삭제하는 함수
 * @param {string} answerId - 답변 ID
 * @returns {Promise<Object>} - 삭제된 답변의 데이터
 */
async function deleteAnswer(answerId) {
  const query = `${PATH.ANSWER}${answerId}/`;
  const response = await instance.delete(`${query}`);
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
