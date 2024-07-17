export const FETCH_TYPE = {
  SEARCH: 'search',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
};

export const STATISTICS_SEARCH_TYPE = {
  EXPENSE_CATEGORY: 'expense category',
  EXPENSE_SUBCATEGORY: 'expense subcategory',
  INCOME_CATEGORY: 'income category',
};

export const formatDate = (date) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function generateColorsForChart(count) {
  const pieChartColors = [
    '#0088FE', // Blue
    '#00C49F', // Green
    '#FFBB28', // Yellow
    '#FF8042', // Orange
    '#7B68EE', // Medium Slate Blue
    '#FF6347', // Tomato
    '#40E0D0', // Turquoise
    '#FFA07A', // Light Salmon
    '#20B2AA', // Light Sea Green
    '#87CEEB', // Sky Blue
    '#32CD32', // Lime Green
    '#FFD700', // Gold
    '#FF4500', // Orange Red
    '#6A5ACD', // Slate Blue
    '#DA70D6', // Orchid
    '#1E90FF', // Dodger Blue
  ];

  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(pieChartColors[i % pieChartColors.length]);
  }
  return colors;
}
