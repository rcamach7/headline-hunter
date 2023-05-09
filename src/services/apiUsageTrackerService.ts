import prisma from '@/lib/prisma';

export async function checkMetDailyUsageLimit(MAX_API_USAGE: number) {
  try {
    const gptUsage = await getGptUsage();

    const today = new Date();
    const lastUsed = gptUsage.lastUsed;

    if (!isSameDay(today, lastUsed)) {
      await prisma.apiUsageTracker.update({
        where: { name: 'gpt-3.5-turbo' },
        data: {
          lastUsed: today,
          calls: 0,
        },
      });
      return false;
    } else if (gptUsage.calls >= MAX_API_USAGE) {
      return true;
    } else {
      await prisma.apiUsageTracker.update({
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
    let gptUsage = await prisma.apiUsageTracker.findUnique({
      where: { name: 'gpt-3.5-turbo' },
    });
    if (!gptUsage) {
      gptUsage = await prisma.apiUsageTracker.create({
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
