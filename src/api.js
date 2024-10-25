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

// 피드 보내는 함수 : props로 닉네임 보내주세요, subject는 개인 별 피드라고 생각해주시면 될 듯
function postSubject(name) {
  const data = {
    name,
    team: TEAM,
  };

  return instance
    .post(`${PATH.SUBJECT}`, data)
    .then((response) => {
      const subjectId = response.data.id;
      return subjectId;
    })
    .catch((error) => {
      console.error('피드를 보내는데 실패했습니다 : ', error.message);
    });
}

// 모든 사람 피드 불러오는 함수
function getSubjectList() {
  return instance
    .get(`${PATH.SUBJECT}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('전체 피드를 불러오는데 실패했습니다 : ', error.message);
    });
}

// ID에 해당하는 피드만 불러오는 함수 : postSubject 후 반환된 아이디 값을 id에 넣어야 함
function getSubject(subjectId) {
  return instance
    .get(`${PATH.SUBJECT}${subjectId}/`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('피드를 불러오는데 실패했습니다 : ', error.message);
    });
}

// ID에 해당하는 피드만 삭제하는 함수 : subjectId 넣어주세요
function deleteSubject(subjectId) {
  return instance
    .delete(`${PATH.SUBJECT}${subjectId}/`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('피드를 삭제하는데 실패했습니다 : ', error.message);
    });
}

// 질문 보내는 함수 : content엔 질문 내용 넣어주세요, subjectId 넣어주세요
function postQuestion(content, subjectId) {
  const query = `${PATH.SUBJECT}${subjectId}${PATH.QUESTION}`;

  const data = {
    subjectId,
    content,
    team: TEAM,
  };

  return instance
    .post(`${query}`, data)
    .then((response) => {
      const questionId = response.data.id;
      return questionId;
    })
    .catch((error) => {
      console.error('질문을 보내는데 실패했습니다 : ', error.message);
    });
}

// 질문 전부 다 (목록으로) 받아오는 함수 : subjectId 넣어주세요, subjectId 기준으로 리스트 나와요
function getQuestionList(subjectId) {
  const query = `${PATH.SUBJECT}${subjectId}${PATH.QUESTION}`;

  return instance
    .get(`${query}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('전체 질문을 불러오는데 실패했습니다 : ', error.message);
    });
}

// 질문 하나 씩 받아오는 함수 : postQuestions 후 반환된 아이디 값을 넣어야 함 (postSubject 후 반환된 아이디랑은 다름), like, dislike 수 여기서 확인 가능
function getQuestion(questionId) {
  const query = `${PATH.QUESTION}${questionId}/`;

  return instance
    .get(`${query}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('질문을 불러오는데 실패했습니다 : ', error.message);
    });
}

// 질문 삭제하는 함수 : questionId 넣어주세요
function deleteQuestion(questionId) {
  const query = `${PATH.QUESTION}${questionId}/`;

  return instance
    .delete(`${query}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('질문을 삭제하는데 실패했습니다 : ', error.message);
    });
}

// 좋아요/싫어요 보내는 함수 : questionId 넣어주세요, type엔 like랑 dislike 지정 가능, 함수 실행 시 좋아요나 싫어요 1 씩 올라감
function postReaction(questionId, type = 'like') {
  const query = `${PATH.QUESTION}${questionId}/reaction/`;
  const data = {
    type,
  };

  return instance
    .post(`${query}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error('좋아요/싫어요를 보내는데 실패했습니다 : ', error.message);
    });
}

// 답변 보내는 함수 : content에 답변 내용 넣어주세요, questionId 넣어주세요, isRejected = true는 답변 거절, 답변은 한 번 밖에 등록 못 함
function postAnswer(content, questionId, isRejected = false) {
  const query = `${PATH.QUESTION}${questionId}${PATH.ANSWER}`;
  const data = {
    questionId,
    content,
    isRejected,
    team: TEAM,
  };

  return instance
    .post(`${query}`, data)
    .then((response) => {
      const answerId = response.data.id;
      return answerId;
    })
    .catch((error) => {
      console.error('답변을 보내는데 실패했습니다 : ', error.message);
    });
}

// 답변 받아오는 함수 : postAnswers 후 반환된 아이디 값을 넣어야 함 (postQuestion 후 반환된 아이디랑은 다름)
function getAnswer(answerId) {
  const query = `${PATH.ANSWER}${answerId}/`;

  return instance
    .get(`${query}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('답변을 불러오는데 실패했습니다 : ', error.message);
    });
}

// 답변 수정하는 함수 (PUT) : content에 수정 할 내용 넣어주세요, answerId 넣어주세요, isRejected = true면 답변 거절
function putAnswer(content, answerId, isRejected = false) {
  const query = `${PATH.ANSWER}${answerId}/`;
  const data = {
    content,
    isRejected,
  };

  return instance
    .put(`${query}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error('답변을 수정하는데 실패했습니다 (put) : ', error.message);
    });
}

// 답변 수정하는 함수 (PATCH) : content에 수정 할 내용 넣어주세요, answerId 넣어주세요, isRejected = true면 답변 거절
function patchAnswer(content, answerId, isRejected = false) {
  const query = `${PATH.ANSWER}${answerId}/`;
  const data = {
    content,
    isRejected,
  };

  return instance
    .patch(`${query}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error('답변을 수정하는데 실패했습니다 (patch) : ', error.message);
    });
}

// 답변 삭제하는 함수 : answerId 넣어주세요
function deleteAnswer(answerId) {
  const query = `${PATH.ANSWER}${answerId}/`;

  return instance
    .delete(`${query}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('답변을 삭제하는데 실패했습니다 : ', error.message);
    });
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
