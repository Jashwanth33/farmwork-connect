import { prisma } from '@/lib/prisma';

export interface NotificationPayload {
  userId: string;
  title: string;
  message: string;
  type: 'BOOKING' | 'PAYMENT' | 'ALERT' | 'SYSTEM' | 'WEATHER';
  data?: Record<string, unknown>;
}

export async function sendNotification(payload: NotificationPayload) {
  const notification = await prisma.notification.create({
    data: {
      userId: payload.userId,
      title: payload.title,
      message: payload.message,
      type: payload.type,
    },
  });

  if (process.env.FIREBASE_API_KEY) {
    await sendPushNotification(payload);
  }

  return notification;
}

async function sendPushNotification(payload: NotificationPayload) {
  // FCM integration placeholder - would require user FCM tokens stored in database
  if (!process.env.FIREBASE_API_KEY) return;
  
  try {
    // In production, fetch user's FCM token from database
    // const user = await prisma.user.findUnique({ where: { id: payload.userId }, select: { fcmToken: true } });
    // if (!user?.fcmToken) return;
    
    console.log('Push notification would be sent:', payload);
  } catch (error) {
    console.error('FCM error:', error);
  }
}

export async function notifyBookingUpdate(
  userId: string,
  bookingId: string,
  status: string,
  providerName?: string
) {
  const statusMessages: Record<string, { title: string; message: string }> = {
    ACCEPTED: {
      title: 'Booking Accepted!',
      message: `${providerName} has accepted your booking`,
    },
    IN_PROGRESS: {
      title: 'Work Started',
      message: `The service has started at your farm`,
    },
    COMPLETED: {
      title: 'Work Completed',
      message: `Please rate and review the service`,
    },
    CANCELLED: {
      title: 'Booking Cancelled',
      message: `The booking has been cancelled`,
    },
  };

  const { title, message } = statusMessages[status] || {
    title: 'Booking Update',
    message: `Your booking status has been updated to ${status}`,
  };

  return sendNotification({
    userId,
    title,
    message,
    type: 'BOOKING',
    data: { bookingId, status },
  });
}

export async function notifyPayment(
  userId: string,
  bookingId: string,
  amount: number,
  type: 'RECEIVED' | 'SENT' | 'REFUND'
) {
  const messages = {
    RECEIVED: {
      title: 'Payment Received',
      message: `₹${amount} has been credited to your account`,
    },
    SENT: {
      title: 'Payment Successful',
      message: `₹${amount} payment completed`,
    },
    REFUND: {
      title: 'Refund Processed',
      message: `₹${amount} refund has been initiated`,
    },
  };

  return sendNotification({
    userId,
    title: messages[type].title,
    message: messages[type].message,
    type: 'PAYMENT',
    data: { bookingId, amount },
  });
}

export async function notifyWeatherAlert(
  userId: string,
  alert: { type: string; message: string; severity: string }
) {
  return sendNotification({
    userId,
    title: `Weather Alert: ${alert.type}`,
    message: alert.message,
    type: 'WEATHER',
    data: alert,
  });
}

export async function notifyEmergencyBooking(
  providerIds: string[],
  bookingDetails: {
    id: string;
    service: string;
    cropType: string;
    farmSize: number;
    distance: number;
    payment: number;
  }
) {
  const notifications = providerIds.map((userId) =>
    sendNotification({
      userId,
      title: '🚨 Emergency Booking Request',
      message: `Urgent ${bookingDetails.service} needed for ${bookingDetails.farmSize} acres of ${bookingDetails.cropType}`,
      type: 'ALERT',
      data: { bookingId: bookingDetails.id, emergency: true },
    })
  );

  return Promise.all(notifications);
}

export async function getUserNotifications(
  userId: string,
  limit: number = 50,
  unreadOnly: boolean = false
) {
  return prisma.notification.findMany({
    where: {
      userId,
      ...(unreadOnly && { isRead: false }),
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export async function markNotificationRead(notificationId: string) {
  return prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });
}

export async function markAllNotificationsRead(userId: string) {
  return prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}
