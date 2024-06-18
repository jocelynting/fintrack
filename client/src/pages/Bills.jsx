import { AddBill, BillSearch, BillTable } from '../components';
import { useState, useContext, createContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/bills');
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const action = async ({ data }) => {
  try {
    await customFetch.post('/bills', data);
    toast.success('Add a new bill');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const BillContext = createContext();

const Bills = () => {
  const [addBillVisible, setAddBillVisible] = useState(false);
  const [billFormData, setBillFormData] = useState({
    amount: '',
    type: 'expense',
    category: '',
    subcategory: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
    errors: {},
  });

  const updateBillFormData = (updatedFormData) => {
    setBillFormData((oldForm) => updatedFormData(oldForm));
  };

  const handleBillSubmit = (event, data) => {
    event.preventDefault();
    console.log('add bill form', data);
    action({ data });
  };

  const openModal = () => {
    setAddBillVisible(true);
  };

  const closeModal = () => {
    setAddBillVisible(false);
  };

  const { bills } = useLoaderData();

  return (
    <BillContext.Provider value={{ billFormData, updateBillFormData }}>
      <div>
        <button className="btn" onClick={openModal}>
          Add Bill
        </button>
        <AddBill
          visible={addBillVisible}
          closeModal={closeModal}
          submitForm={handleBillSubmit}
        />
        <BillSearch />
        <BillTable bills={bills} />
      </div>
    </BillContext.Provider>
  );
};

export const useBillContext = () => useContext(BillContext);

export default Bills;
