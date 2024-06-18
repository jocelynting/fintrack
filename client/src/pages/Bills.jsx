import { BillForm, BillSearch, BillTable } from '../components';
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

export const action = async ({ data, source }) => {
  try {
    if (source === 'create') {
      await customFetch.post('/bills', data);
      toast.success('Add a new bill');
    } else {
      await customFetch.patch(`/bills/${data.id}`, data);
      toast.success('Update bill success');
    }
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const BillContext = createContext();

const Bills = () => {
  const [billFormVisible, setBillFormVisible] = useState({
    visible: false,
    source: '',
  });

  const initialBillFormData = {
    id: '',
    amount: '',
    type: 'expense',
    category: '',
    subcategory: '',
    description: '',
    date: 'today',
    errors: {},
  };

  const [billFormData, setBillFormData] = useState(initialBillFormData);

  const updateBillFormData = (updatedFormData) => {
    setBillFormData((oldForm) => updatedFormData(oldForm));
  };

  const handleBillSubmit = (event, data, source) => {
    event.preventDefault();
    console.log('add bill form', data);
    action({ data, source });
  };

  const openModal = ({ source }) => {
    setBillFormVisible({ visible: true, source: source });
  };

  const closeModal = () => {
    setBillFormVisible({ visible: false, source: '' });
    setBillFormData(initialBillFormData);
  };

  const { bills } = useLoaderData();

  return (
    <BillContext.Provider
      value={{ billFormData, updateBillFormData, openModal }}
    >
      <div>
        <button className="btn" onClick={() => openModal({ source: 'create' })}>
          Add Bill
        </button>
        <BillForm
          status={billFormVisible}
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
