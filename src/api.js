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

  const response = await instance.post(`${PATHS.SUBJECT}`, data);
  return response.data;
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
 * 특정 Subject와 이에 해당하는 질문과 답변을 모두 삭제하는 API
 * @param {string} subjectId
 * @returns {Promise<{subject : object, question :[ {question : object, answer : object}]}>} 반환값은 question과 answer의 `DELETE` 요청에 대한 응답을 담고 있다.
 * @description 데이터를 API로 불러오는 과정에서 서버의 과부하를 줄이기 위해 결과 반환까지 소요시간이 발생합니다.
 */
async function deleteSubject(subjectId) {
  const result = {};
  result.question = await deleteQuestionList(subjectId);
  result.subject = await instance.delete(`${PATHS.SUBJECT}${subjectId}/`);
  return result;
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
 * 특정 Subject의 질문과 답변을 모두 삭제하는 API
 * @param {string} subjectId 질문과 답변이 속한 subject의 id
 * @returns {Promise<[{question : object, answer : object}]>} 반환값은 question과 answer의 `DELETE` 요청에 대한 응답을 담고 있다.
 * @description 데이터를 API로 불러오는 과정에서 서버의 과부하를 줄이기 위해 결과 반환까지 소요시간이 발생합니다.
 */
async function deleteQuestionList(subjectId) {
  const limit = 8;
  let offset = 0;
  const result = [];
  let questions = [];

  if (!subjectId) {
    throw new Error('deleteQuestionList 파라미터 미전달');
  }

  while (true) {
    let next;
    let results;

    setTimeout(async () => {
      const response = await getQuestionList(subjectId);
      next = response.next;
      result = response.results;
    }, 200);

    offset += limit;
    questions = [...questions, ...results];

    if (next === null) break;
  }

  questions.forEach((e, i) => {
    setTimeout(async () => {
      result[i] = await deleteQuestion(e.id);
    }, 200);
  });

  return result;
}

/**
 * 질문 삭제하는 함수
 * @param {string} questionId - 질문 ID
 * @returns {Promise<{question : object, answer : object}>} - 삭제된 질문의 데이터
 */
async function deleteQuestion(questionId) {
  const result = {};
  const question = await getQuestion(questionId);

  if (question?.answer) {
    result.answer = await deleteAnswer(question.answer.id);
  }

  const path = `${PATHS.QUESTION}${questionId}/`;
  result.question = await instance.delete(`${path}`);

  return result;
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
  console.log(answerId);
  const path = `${PATHS.ANSWER}${answerId}/`;
  const response = await instance.delete(`${path}`);
  return response;
}

export {
  postSubject,
  getSubjectList,
  getSubject,
  deleteSubject,
  postQuestion,
  getQuestionList,
  getQuestion,
  deleteQuestionList,
  deleteQuestion,
  postReaction,
  postAnswer,
  getAnswer,
  putAnswer,
  patchAnswer,
  deleteAnswer,
};
