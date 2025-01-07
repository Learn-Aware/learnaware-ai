/* eslint-disable @typescript-eslint/no-explicit-any */
import { METHODS } from "./restClient";
import { client } from "./restClient";
import {
  SOCRATIC_TUTOR,
  START_SESSION,
  SUBMIT_ANSWER,
  AGENT_CHAT,
} from "./urls";

export const startSocratic = async (body: any) => {
  const question = {
    question: body,
  };
  const response = await client.API(METHODS.POST, SOCRATIC_TUTOR, question);
  return response.data;
};

export const startSession = async (body: any) => {
  const question = {
    student_question: body,
  };
  const response = await client.API(METHODS.POST, START_SESSION, question);
  return response.data;
};

export const submitAnswer = async (body: any) => {
  const question = {
    session_id: body.session_id,
    user_answer: body.user_answer,
  };
  const response = await client.API(METHODS.POST, SUBMIT_ANSWER, question);
  return response.data;
};

// export const agentChat = async (body: any) => {
//   const question = {
//     user_request: body.user_request,
//     session_id: body.session_id,
//   };
//   const response = await client.API(METHODS.POST, AGENT_CHAT, question);
//   return response.data;
// };


export const agentChat = async (body: any) => {
  // Ensure user_request is present
  if (!body.user_request || typeof body.user_request !== 'string') {
    throw new Error("user_request is required and should be a text string.");
  }

  const formData = new FormData();
  formData.append('user_request', body.user_request);
  formData.append('session_id', body.session_id);

  // If an image is provided, append it to the form data
  if (body.image) {
    formData.append('image', body.image);
  }

  const response = await client.API(METHODS.POST, AGENT_CHAT, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
