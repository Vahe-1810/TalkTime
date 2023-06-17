import moment from "moment";

export const formatDate = (date: string | undefined) => {
  return moment(date).format("HH:mm");
};
