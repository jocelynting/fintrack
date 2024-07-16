export const getDatePeriod = (date, calendarType) => {
  let startDate, endDate;
  if (date) {
    if (calendarType === 'month') {
      // 设置startDate为所选月份的第一天
      startDate = new Date(date);
      startDate.setDate(1); // 设置为这个月的第一天
      // 设置endDate为所选月份的最后一天
      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    } else if (calendarType === 'year') {
      // 设置startDate为所选年份的1月1日
      startDate = new Date(date);
      startDate.setMonth(0); // 设置为1月
      startDate.setDate(1); // 设置为第一天
      // 设置endDate为所选年份的12月31日
      endDate = new Date(startDate.getFullYear() + 1, 0, 0);
    } else {
      startDate = new Date(date);
      endDate = new Date(date);
    }
  }
  return { startDate, endDate };
};
