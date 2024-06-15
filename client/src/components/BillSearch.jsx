import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './CustomDatePicker.css';
import Wrapper from '../assets/wrappers/BillSearch';
import FormSelect from './FormSelect';
import { useState, useEffect } from 'react';
import { useDashboardContext } from '../pages/Dashboard';

const BillSearch = () => {
  const [value, setValue] = useState(new Date());

  const { categories } = useDashboardContext();
  const [calenderType, setCalenderType] = useState('month');
  const [billType, setBillType] = useState('all');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');

  useEffect(() => {
    if (billType === 'all') {
      setCategory('');
      setSubcategory('');
    } else if (billType === 'expense') {
      const filteredCategories = categories.filter(
        (category) => category.type === 'expense'
      );
      const initialCategory = filteredCategories[0].name;
      setCategory(initialCategory);
      const filteredSubcategories = filteredCategories.find(
        (c) => c.name === initialCategory
      )?.subcategories;
      setSubcategory(filteredSubcategories[0].name);
    } else if (billType === 'income') {
      const filteredIncomeCategories = categories.filter(
        (category) => category.type === 'income'
      );
      const initialIncomeCategory = filteredIncomeCategories[0].name;
      setCategory(initialIncomeCategory);
      setSubcategory('');
    }
  }, [billType, categories]);

  const handleCalenderTypeChange = (e) => {
    const value = e.target.value.toLowerCase();
    setCalenderType(value);
  };

  const handleBillTypeChange = (e) => {
    const value = e.target.value.toLowerCase();
    setBillType(value);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    const filteredSubcategories = categories.find(
      (c) => c.name === selectedCategory
    )?.subcategories;
    if (billType === 'expense') {
      setSubcategory(filteredSubcategories[0].name);
    } else {
      setSubcategory('');
    }
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
  };

  const filteredCategories = categories.filter(
    (category) => category.type === billType
  );

  const filteredSubcategories = categories.find(
    (c) => c.name === category
  )?.subcategories;

  return (
    <Wrapper>
      <div className="search__time">
        <FormSelect
          name="timeType"
          options={[{ name: 'All' }, { name: 'Month' }, { name: 'Year' }]}
          value="Month"
          onChange={handleCalenderTypeChange}
        />
        <DatePicker
          onChange={setValue}
          value={value}
          view="year"
          maxDetail="year"
          locale="en-US"
        />
      </div>
      <div className="search__category">
        <FormSelect
          name="type"
          value={billType}
          onChange={handleBillTypeChange}
          options={[{ name: 'All' }, { name: 'Expense' }, { name: 'Income' }]}
        />
        {billType !== 'all' && (
          <FormSelect
            name="category"
            value={category}
            onChange={handleCategoryChange}
            options={filteredCategories}
          />
        )}
        {billType === 'expense' && category && (
          <FormSelect
            name="subcategory"
            value={subcategory}
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
        />
        <input className="form__input" type="submit" value="Search" />
      </div>
    </Wrapper>
  );
};

export default BillSearch;
