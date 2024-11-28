module.exports = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-based
  const day = today.getDate();

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
