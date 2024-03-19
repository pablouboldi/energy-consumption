export default function generateDailyDates(startDate, endDate) {
  const currentDate = new Date(startDate);
  const dateArray = [];
  const endDateObj = new Date(endDate);

  while (currentDate <= endDateObj) {
    const formattedDate = currentDate.toLocaleString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short'
    });

    dateArray.push(formattedDate);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}