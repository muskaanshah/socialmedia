const getDateTime = date => {
  let strDate = '';
  const shortMonth = date.toLocaleString('en-us', { month: 'short' });
  let minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  strDate = `${shortMonth} ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${minutes}`;
  return strDate;
};

export { getDateTime };
