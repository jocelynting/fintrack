import { Form } from 'react-router-dom';
import { useDashboardContext } from '../pages/Dashboard';
import Wrapper from '../assets/wrappers/AddBill';
import { Logo, FormRow, BillTypeSelection, SubmitBtn } from '../components';
import { useState } from 'react';

const AddBill = ({ visible, closeModal }) => {
  const { categories } = useDashboardContext();

  const [billType, setBillType] = useState('expense');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

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

  return (
    <Wrapper>
      {visible && (
        <div className="modal__background">
          <div className="modal__content">
            <Logo />
            <Form method="post" className="bill__form">
              <FormRow name="amount" type="number" />
              <FormRow
                name="type"
                labelText="Bill Type"
                onChange={handleBillTypeChange}
                radioOptions={[
                  { value: 'expense', label: 'Expense', checked: true },
                  { value: 'income', label: 'Income' },
                ]}
              />
              <BillTypeSelection
                type={billType}
                selectedCategory={selectedCategory}
                categories={categories}
                handleCategoryChange={handleCategoryChange}
              />
              <FormRow name="description" type="text" />
              <FormRow name="date" type="date" />
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
            </Form>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default AddBill;
