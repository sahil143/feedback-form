import * as React from 'react';
import axios from 'axios';
import { Feedback } from '../type';

export const useFeedbacks = () => {
  const [feedbacks, setFeedbacks] = React.useState<Feedback[]>();
  const [err, setError] = React.useState();
  React.useEffect(() => {
    let ignore = false;
    axios
      .get(`http://127.0.0.1:8000/api/feedbacks/`)
      .then((resp) => {
        if (ignore) return;
        setFeedbacks(resp.data);
      })
      .catch((err) => {
        console.warn('error fetching feedbacks', err);
        setError(err);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return [feedbacks, err];
};
