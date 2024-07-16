import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Wrapper from '../assets/wrappers/StatisticsSearch';
import BillSearchFormSelect from './BillSearchFormSelect';
import { useState } from 'react';
import { STATISTICS_SEARCH_TYPE } from '../utils/utils';

const StatisticsSearch = ({ onSearch }) => {
  const [statisticsSearchInfo, setStatisticsSearchInfo] = useState({
    date: new Date(),
    calendar: 'month',
    type: STATISTICS_SEARCH_TYPE.EXPENSE_CATEGORY,
  });

  const handleCalenderTypeChange = (e) => {
    const value = e.target.value;
    setStatisticsSearchInfo((prevSearchInfo) => ({
      ...prevSearchInfo,
      calendar: value,
    }));
  };

  const handleDateChange = (date) => {
    setStatisticsSearchInfo((prevSearchInfo) => ({
      ...prevSearchInfo,
      date: date,
    }));
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setStatisticsSearchInfo((prevSearchInfo) => ({
      ...prevSearchInfo,
      type: value,
    }));
  };

  const handleSearch = () => {
    onSearch(statisticsSearchInfo);
  };

  return (
    <Wrapper>
      <BillSearchFormSelect
        name="calendar"
        options={[{ name: 'month' }, { name: 'year' }]}
        showName={true}
        value={statisticsSearchInfo.calendar}
        onChange={handleCalenderTypeChange}
      />
      <DatePicker
        onChange={handleDateChange}
        value={statisticsSearchInfo.date}
        maxDetail={statisticsSearchInfo.calendar === 'year' ? 'decade' : 'year'}
        format={statisticsSearchInfo.calendar === 'year' ? 'yyyy' : 'yyyy-MM'}
        view={statisticsSearchInfo.calendar === 'year' ? 'decade' : 'year'}
        locale="en-US"
      />
      <BillSearchFormSelect
        name="type"
        options={[
          { name: STATISTICS_SEARCH_TYPE.EXPENSE_CATEGORY },
          { name: STATISTICS_SEARCH_TYPE.EXPENSE_SUBCATEGORY },
          { name: STATISTICS_SEARCH_TYPE.INCOME_CATEGORY },
        ]}
        showName={true}
        value={statisticsSearchInfo.type}
        onChange={handleTypeChange}
      />
      <button className="btn" onClick={() => handleSearch()}>
        Search
      </button>
    </Wrapper>
  );
};
export default StatisticsSearch;
