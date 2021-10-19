import moment from "moment";

moment.locale("ru");

export const getMomentFromNow = (date) => moment(date).fromNow();
export const stringifyDateTime = (date) => moment(date).format("DD/MM/yyyy, HH:mm");