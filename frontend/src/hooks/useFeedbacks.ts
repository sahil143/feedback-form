import * as React from 'react';
import { Feedback } from '../type';
import { getFeedbacks } from '../utils';

export const useFeedbacks = () => {
  const [feedbacks, setFeedbacks] = React.useState<Feedback[]>();
  const [err, setError] = React.useState();
  React.useEffect(() => {
    let ignore = false;
    getFeedbacks()
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
