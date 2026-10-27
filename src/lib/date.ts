import {
  parse as parseDate,
  differenceInDays,
  isToday,
  formatDistanceToNow,
} from "date-fns";

export function formatDateForCardBadge(date: Date) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
}

export function formatDateFromExcelToData(dateString: string) {
  const [day, month, year] = dateString.split(".");
  const isoDate = `${year}-${month?.padStart(2, "0")}-${day?.padStart(2, "0")}`;
  return isoDate;
}

export function formatDateAgo(date: string) {
  const parsedDate = parseDate(date, "dd.MM.yyyy", new Date());
  // Check if the date is today
  if (isToday(parsedDate)) {
    return "today";
  }

  // Use formatDistanceToNow for relative time formatting
  const daysDifference = differenceInDays(new Date(), parsedDate);
  if (daysDifference === 1) {
    return "1 day ago";
  }

  return formatDistanceToNow(parsedDate, { addSuffix: true });
}
