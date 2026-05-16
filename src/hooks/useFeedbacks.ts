import { useState, useEffect } from 'react';
import { getFeedbacks } from '../services/feedbacks';
import type { Feedback } from '../types';

export function useFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeedbacks().then((data) => {
      setFeedbacks(data);
      setLoading(false);
    });
  }, []);

  return { feedbacks, loading };
}
