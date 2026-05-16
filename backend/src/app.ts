import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';
import { globalLimiter } from './middlewares/rateLimiter';

// Import Routes
import authRoutes from './modules/auth/auth.routes';
import siteConfigRoutes from './modules/siteConfig/siteConfig.routes';
import quoteRoutes from './modules/quotes/quote.routes';
import availabilityRoutes from './modules/availability/availability.routes';
import bookingRoutes from './modules/bookings/booking.routes';
import googleCalendarRoutes from './modules/googleCalendar/googleCalendar.routes';
import feedbackRoutes from './modules/feedbacks/feedback.routes';
import statsRoutes from './modules/stats/stats.routes';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: [env.FRONTEND_URL, env.ADMIN_URL],
  credentials: true
}));
app.use(express.json());
app.use(globalLimiter);

// Routes
app.use('/api/admin/auth', authRoutes);
app.use('/api/site-config', siteConfigRoutes);
app.use('/api/quotes', quoteRoutes); // Public quotes
app.use('/api/public/availability', availabilityRoutes.public);
app.use('/api/admin/availability', availabilityRoutes.admin);
app.use('/api/public/quote-with-booking', bookingRoutes.public);
app.use('/api/admin/bookings', bookingRoutes.admin);
app.use('/api/admin/google', googleCalendarRoutes);
app.use('/api/feedbacks', feedbackRoutes.public);
app.use('/api/admin/feedbacks', feedbackRoutes.admin);
app.use('/api/admin/stats', statsRoutes);

app.use('/api/admin/quotes', quoteRoutes.admin);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
