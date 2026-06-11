import { prisma } from '@/lib/prisma';

export interface EarningsData {
  totalEarnings: number;
  pendingPayout: number;
  thisMonth: number;
  lastMonth: number;
  transactions: Transaction[];
  weeklyEarnings: number[];
  serviceBreakdown: ServiceEarning[];
}

export interface Transaction {
  id: string;
  type: 'EARNING' | 'REFUND' | 'PAYOUT' | 'COMMISSION';
  amount: number;
  description: string;
  date: Date;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

export interface ServiceEarning {
  service: string;
  count: number;
  amount: number;
}

export async function getProviderEarnings(userId: string): Promise<EarningsData> {
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const thisMonthTx = await prisma.transaction.findMany({
    where: {
      userId,
      createdAt: { gte: thirtyDaysAgo },
      type: 'EARNING',
    },
  });

  const lastMonthTx = await prisma.transaction.findMany({
    where: {
      userId,
      createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      type: 'EARNING',
    },
  });

  const completedBookings = await prisma.booking.findMany({
    where: {
      providerId: userId,
      status: 'COMPLETED',
    },
    include: { service: true },
  });

  const serviceMap = new Map<string, { count: number; amount: number }>();
  completedBookings.forEach((booking) => {
    const service = booking.service.name;
    const existing = serviceMap.get(service) || { count: 0, amount: 0 };
    serviceMap.set(service, {
      count: existing.count + 1,
      amount: existing.amount + booking.totalAmount,
    });
  });

  const serviceBreakdown: ServiceEarning[] = Array.from(serviceMap.entries()).map(
    ([service, data]) => ({
      service,
      count: data.count,
      amount: data.amount,
    })
  );

  const weeklyEarnings = await calculateWeeklyEarnings(userId);

  const pendingBookings = await prisma.booking.findMany({
    where: {
      providerId: userId,
      status: { in: ['ACCEPTED', 'IN_PROGRESS', 'COMPLETED'] },
    },
  });

  const pendingPayout = pendingBookings.reduce(
    (sum, b) => sum + (b.totalAmount - b.advancePaid),
    0
  );

  return {
    totalEarnings: transactions
      .filter((t) => t.type === 'EARNING')
      .reduce((sum, t) => sum + t.amount, 0),
    pendingPayout,
    thisMonth: thisMonthTx.reduce((sum, t) => sum + t.amount, 0),
    lastMonth: lastMonthTx.reduce((sum, t) => sum + t.amount, 0),
    transactions: transactions.map((t) => ({
      id: t.id,
      type: t.type as 'EARNING' | 'REFUND' | 'PAYOUT' | 'COMMISSION',
      amount: t.amount,
      description: t.description,
      date: t.createdAt,
      status: t.status as 'PENDING' | 'COMPLETED' | 'FAILED',
    })),
    weeklyEarnings,
    serviceBreakdown,
  };
}

async function calculateWeeklyEarnings(userId: string): Promise<number[]> {
  const weeklyEarnings = [0, 0, 0, 0];
  const now = new Date();

  for (let i = 0; i < 4; i++) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - (i + 1) * 7);
    const weekEnd = new Date(now);
    weekEnd.setDate(now.getDate() - i * 7);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        type: 'EARNING',
        createdAt: { gte: weekStart, lt: weekEnd },
      },
    });

    weeklyEarnings[3 - i] = transactions.reduce((sum, t) => sum + t.amount, 0);
  }

  return weeklyEarnings;
}

export async function requestPayout(userId: string, amount: number, method: string) {
  const pendingPayouts = await prisma.transaction.findMany({
    where: {
      userId,
      type: 'EARNING',
      status: 'PENDING',
    },
  });

  const availableEarnings = pendingPayouts.reduce((sum, t) => sum + t.amount, 0);

  if (amount > availableEarnings) {
    throw new Error('Insufficient earnings for payout');
  }

  const payout = await prisma.transaction.create({
    data: {
      userId,
      type: 'PAYOUT',
      amount,
      description: `Payout request via ${method}`,
      status: 'PENDING',
    },
  });

  for (const tx of pendingPayouts.slice(0, Math.ceil(amount / 500))) {
    await prisma.transaction.update({
      where: { id: tx.id },
      data: { status: 'COMPLETED' },
    });
  }

  return payout;
}

export async function getFarmerSpending(userId: string) {
  const bookings = await prisma.booking.findMany({
    where: { farmerId: userId },
    include: { service: true },
  });

  const monthlySpending = await Promise.all(
    Array.from({ length: 6 }, async (_, i) => {
      const monthStart = new Date();
      monthStart.setMonth(monthStart.getMonth() - i);
      monthStart.setDate(1);

      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);

      const monthBookings = bookings.filter(
        (b) => b.createdAt >= monthStart && b.createdAt < monthEnd
      );

      return {
        month: monthStart.toLocaleString('default', { month: 'short' }),
        amount: monthBookings.reduce((sum, b) => sum + b.totalAmount, 0),
      };
    })
  );

  return {
    totalSpent: bookings.reduce((sum, b) => sum + b.totalAmount, 0),
    monthlySpending: monthlySpending.reverse(),
    completedBookings: bookings.filter((b) => b.status === 'COMPLETED').length,
    pendingBookings: bookings.filter((b) => b.status !== 'COMPLETED').length,
  };
}
