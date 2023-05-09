import prisma from '@/lib/prisma';

export async function checkMetDailyUsageLimit() {
  try {
    const gptUsage = await getGptUsage();

    const today = new Date();
    const lastUsed = gptUsage.lastUsed;

    if (!isSameDay(today, lastUsed)) {
      prisma.apiUsageTracker.update({
        where: { name: 'gpt-3.5-turbo' },
        data: {
          lastUsed: today,
          calls: 0,
        },
      });
      return false;
    } else if (gptUsage.calls >= 250) {
      console.log('Call limit reached');
      return true;
    } else {
      prisma.apiUsageTracker.update({
        where: { name: 'gpt-3.5-turbo' },
        data: {
          calls: gptUsage.calls + 1,
        },
      });
      return false;
    }
  } catch (error) {
    console.error(error);
    return true;
  }
}

async function getGptUsage() {
  try {
    const gptUsage = prisma.apiUsageTracker.findUnique({
      where: { id: 'gpt-3.5-turbo' },
    });
    if (!gptUsage) {
      prisma.apiUsageTracker.create({
        data: {
          name: 'gpt-3.5-turbo',
        },
      });
    }
    return gptUsage;
  } catch (error) {
    console.error(error);
  }
}

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
