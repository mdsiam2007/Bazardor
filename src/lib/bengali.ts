const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num: number | string | null | undefined): string {
  if (num === null || num === undefined || num === '') return '০';
  const str = typeof num === 'number' ? num.toString() : num;
  return str.replace(/\d/g, (d) => bengaliDigits[parseInt(d, 10)] || d);
}

const bengaliDays = [
  'রবিবার',
  'সোমবার',
  'মঙ্গলবার',
  'বুধবার',
  'বৃহস্পতিবার',
  'শুক্রবার',
  'শনিবার',
];

const bengaliMonths = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

export function getBengaliDate(dateInput?: Date | string): string {
  const date = dateInput ? new Date(dateInput) : new Date();
  const dayName = bengaliDays[date.getDay()];
  const dayNumber = toBengaliNumber(date.getDate());
  const monthName = bengaliMonths[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear());

  return `${dayName}, ${dayNumber} ${monthName}, ${year}`;
}

export function formatPrice(amount: number | string, unit?: string): string {
  const formattedNum = toBengaliNumber(amount);
  if (unit) {
    const formattedUnit = unit === 'kg' ? 'কেজি' : unit === 'liter' || unit === 'litre' ? 'লিটার' : unit === 'dozen' ? 'ডজন' : unit === 'piece' ? 'পিস' : unit;
    return `${formattedNum} টাকা/${formattedUnit}`;
  }
  return `${formattedNum} টাকা`;
}

export function formatUnitName(unit: string | null | undefined): string {
  if (!unit) return 'প্রতি কেজি';
  const clean = unit.toLowerCase();
  if (clean === 'kg' || clean === 'প্রতি কেজি') return 'প্রতি কেজি';
  if (clean === 'liter' || clean === 'litre' || clean === 'প্রতি লিটার') return 'প্রতি লিটার';
  if (clean === 'dozen' || clean === 'প্রতি ডজন') return 'প্রতি ডজন';
  if (clean === 'piece' || clean === 'প্রতি পিস') return 'প্রতি পিস';
  return unit.startsWith('প্রতি') ? unit : `প্রতি ${unit}`;
}
