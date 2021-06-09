import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.locale("ko");
dayjs.extend(relativeTime);

const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const checkToday = (createdAt) => {
  const date = new Date(createdAt);
  return isToday(date);
};

export const changeDate = (date) => {
  const isWriteToday = checkToday(date);
  if (isWriteToday) return dayjs(date).fromNow();
  else return dayjs(date).format("YYYY.MM.DD HH:mm");
};
