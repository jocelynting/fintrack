import { useDashboardContext } from '../pages/Dashboard';
import { useBillContext } from '../pages/Bills';
import Wrapper from '../assets/wrappers/AddBill';
import {
  Logo,
  AddBillFormRow,
  BillCategorySelect,
  SubmitBtn,
} from '../components';
import { useState, useEffect } from 'react';

const AddBill = ({ visible, closeModal, submitForm }) => {
  const { categories } = useDashboardContext();
  const { billFormData, updateBillFormData } = useBillContext();

  const [billType, setBillType] = useState('expense');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    updateBillFormData((prevFormData) => ({
      ...prevFormData,
      category: selectedCategory._id,
    }));
    if (selectedCategory.subcategories.length > 0) {
      updateBillFormData((prevFormData) => ({
        ...prevFormData,
        subcategory: selectedCategory.subcategories[0]._id,
      }));
    }
  }, []);

  const handleBillTypeChange = (e) => {
    setBillType(e.target.value);
    if (e.target.value === 'expense') {
      setSelectedCategory(categories[0]);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryName = e.target.value;
    const selectedCategoryObject = categories.find(
      (category) => category._id === selectedCategoryName
    );
    setSelectedCategory(selectedCategoryObject);
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!billFormData.amount) {
      updateBillFormData((prevFormData) => ({
        ...prevFormData,
        errors: { ...prevFormData.errors, amount: 'Amount is required' },
      }));
      return;
    }

    if (isNaN(billFormData.amount)) {
      updateBillFormData((prevFormData) => ({
        ...prevFormData,
        errors: { ...prevFormData.errors, amount: 'Amount must be a number' },
      }));
      return;
    }

    updateBillFormData((prevFormData) => ({
      ...prevFormData,
      errors: {},
    }));

    let { errors, ...formData } = billFormData;

    submitForm(e, formData);

    closeModal();
  };

  return (
    <Wrapper>
      {visible && (
        <div className="modal__background">
          <div className="modal__content">
            <Logo />
            <form className="bill__form" onSubmit={handleFormSubmit}>
              <AddBillFormRow
                name="amount"
                type="text"
                error={billFormData.errors.amount}
              />
              <AddBillFormRow
                name="type"
                labelText="Bill Type"
                onChange={handleBillTypeChange}
                radioOptions={[
                  { value: 'expense', label: 'Expense', checked: true },
                  { value: 'income', label: 'Income' },
                ]}
              />
              <div className="form__row-category">
                <BillCategorySelect
                  name="category"
                  labelText="Category"
                  categories={categories.filter(
                    (category) => category.type === billType
                  )}
                  onChange={handleCategoryChange}
                  showLabel={true}
                />
                {billType === 'expense' && (
                  <BillCategorySelect
                    name="subcategory"
                    categories={selectedCategory.subcategories}
                    showLabel={false}
                    onChange={handleSubcategoryChange}
                  />
                )}
              </div>
              <AddBillFormRow name="description" type="text" />
              <AddBillFormRow
                name="createdAt"
                type="date"
                defaultValue={new Date().toLocaleDateString('fr-CA')}
              />
              <div className="form__buttons">
                <SubmitBtn formBtn />
                <button
                  type="button"
                  className="btn form__btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default AddBill;
