import moment from "moment";

moment.locale("ru");

export const getMomentFromNow = (date) => moment(date).fromNow();