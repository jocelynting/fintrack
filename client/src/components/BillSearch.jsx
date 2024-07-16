import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Wrapper from '../assets/wrappers/BillSearch';
import BillSearchFormSelect from './BillSearchFormSelect';
import { useState, useEffect } from 'react';
import { useDashboardContext } from '../pages/Dashboard';

const BillSearch = ({ onSearch }) => {
  const [searchInfo, setSearchInfo] = useState({
    date: new Date(),
    calendar: 'month',
    type: 'all',
    category: '',
    subcategory: '',
  });

  const { categories } = useDashboardContext();

  useEffect(() => {
    if (searchInfo.type === 'expense') {
      const filteredCategories = categories.filter(
        (category) => category.type === 'expense'
      );
      const initialCategory = filteredCategories[0]._id || '';
      const filteredSubcategories =
        filteredCategories.find((c) => c._id === initialCategory)
          ?.subcategories || [];

      setSearchInfo((prevSearchInfo) => ({
        ...prevSearchInfo,
        category: initialCategory,
        subcategory: filteredSubcategories[0]?._id || '',
      }));
    } else if (searchInfo.type === 'income') {
      const filteredIncomeCategories = categories.filter(
        (category) => category.type === 'income'
      );
      const initialCategory = filteredIncomeCategories[0]._id || '';
      setSearchInfo((prevSearchInfo) => ({
        ...prevSearchInfo,
        category: initialCategory,
        subcategory: '',
      }));
    }
  }, [searchInfo.type, categories]);

  const handleCalenderTypeChange = (e) => {
    const value = e.target.value;
    setSearchInfo((prevSearchInfo) => ({
      ...prevSearchInfo,
      calendar: value,
    }));
  };

  const handleDateChange = (date) => {
    // const formattedDate = formatDate(date);
    setSearchInfo((prevSearchInfo) => ({
      ...prevSearchInfo,
      date: date,
    }));
  };

  const handleBillTypeChange = (e) => {
    const value = e.target.value;
    setSearchInfo((prevSearchInfo) => ({
      ...prevSearchInfo,
      type: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const filteredSubcategories =
      categories.find((c) => c._id === selectedCategory)?.subcategories || [];

    setSearchInfo((prevSearchInfo) => ({
      ...prevSearchInfo,
      category: selectedCategory,
      subcategory: filteredSubcategories[0]?._id || '',
    }));
  };

  const handleSubcategoryChange = (e) => {
    const value = e.target.value;
    setSearchInfo((prevSearchInfo) => ({
      ...prevSearchInfo,
      subcategory: value,
    }));
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setSearchInfo((prevSearchInfo) => ({
      ...prevSearchInfo,
      description: value,
    }));
  };

  const filteredCategories = categories.filter(
    (category) => category.type === searchInfo.type
  );

  const filteredSubcategories = categories.find(
    (c) => c._id === searchInfo.category
  )?.subcategories;

  const handleSearch = () => {
    onSearch(searchInfo);
  };

  return (
    <Wrapper>
      <div className="search__time">
        <BillSearchFormSelect
          name="calendar"
          options={[{ name: 'month' }, { name: 'year' }]}
          showName={true}
          value={searchInfo.calendar}
          onChange={handleCalenderTypeChange}
        />
        <DatePicker
          onChange={handleDateChange}
          value={searchInfo.date}
          maxDetail={searchInfo.calendar === 'year' ? 'decade' : 'year'}
          format={searchInfo.calendar === 'year' ? 'yyyy' : 'yyyy-MM'}
          view={searchInfo.calendar === 'year' ? 'decade' : 'year'}
          locale="en-US"
        />
      </div>
      <div className="search__category">
        <BillSearchFormSelect
          name="type"
          options={[{ name: 'all' }, { name: 'expense' }, { name: 'income' }]}
          showName={true}
          value={searchInfo.type}
          onChange={handleBillTypeChange}
        />
        {searchInfo.type !== 'all' && (
          <BillSearchFormSelect
            name="category"
            value={searchInfo.category}
            onChange={handleCategoryChange}
            options={filteredCategories}
          />
        )}
        {searchInfo.type === 'expense' && searchInfo.category && (
          <BillSearchFormSelect
            name="subcategory"
            value={searchInfo.subcategory}
            onChange={handleSubcategoryChange}
            options={filteredSubcategories}
          />
        )}
      </div>
      <div className="search__description">
        <input
          className="form__input"
          type="text"
          placeholder="Search Description"
          onChange={handleDescriptionChange}
        />
        <button className="btn" onClick={() => handleSearch()}>
          Search
        </button>
      </div>
    </Wrapper>
  );
};

export default BillSearch;
