export const FETCH_TYPE = {
  SEARCH: 'search',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
};

export const formatDate = (date) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
