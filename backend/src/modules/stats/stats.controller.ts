import { Request, Response } from 'express';
import { Quote } from '../quotes/quote.model';
import { Booking } from '../bookings/booking.model';
import { Feedback } from '../feedbacks/feedback.model';
import { successResponse } from '../../utils/apiResponse';

export const getDashboardStats = async (req: Request, res: Response) => {
  const today = new Date().toISOString().split('T')[0];

  const [
    totalQuotes,
    newQuotes,
    scheduledQuotes,
    completedQuotes,
    totalBookings,
    todayBookings,
    upcomingBookings,
    cancelledBookings,
    totalFeedbacks,
    activeFeedbacks,
    mostCommonProblemAggregate
  ] = await Promise.all([
    Quote.countDocuments(),
    Quote.countDocuments({ status: 'new' }),
    Quote.countDocuments({ status: 'scheduled' }),
    Quote.countDocuments({ status: 'completed' }),
    
    Booking.countDocuments(),
    Booking.countDocuments({ date: today }),
    Booking.countDocuments({ date: { $gt: today }, status: { $in: ['scheduled', 'confirmed'] } }),
    Booking.countDocuments({ status: 'cancelled' }),

    Feedback.countDocuments(),
    Feedback.countDocuments({ isActive: true }),

    Quote.aggregate([
      { $group: { _id: '$problemType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ])
  ]);

  const mostCommonProblemType = mostCommonProblemAggregate.length > 0 ? mostCommonProblemAggregate[0]._id : null;

  res.json(successResponse('Estatísticas carregadas.', {
    totalQuotes,
    newQuotes,
    scheduledQuotes,
    completedQuotes,
    totalBookings,
    todayBookings,
    upcomingBookings,
    cancelledBookings,
    totalFeedbacks,
    activeFeedbacks,
    mostCommonProblemType
  }));
};
