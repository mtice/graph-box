function getDate(date) {
  if (date) {
    return `${date} GMT`;
  } else {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    return `${month}/${day}/${year} GMT`;
  }
}

export { getDate }