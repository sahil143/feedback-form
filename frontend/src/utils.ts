import axios from 'axios';
import { FormState } from './type';

const api = 'http://127.0.0.1:8000/api';

export const submitForm = (formData: FormState) => {
  return axios.post(`${api}/feedbacks/`, formData).then((resp) => {
    try {
      const data = JSON.parse(resp.data);
      return data;
    } catch (e) {}
  });
};

export const getFeedbackById = (id: string) => {
  return axios.get(`${api}/feedbacks/${id}`);
};
