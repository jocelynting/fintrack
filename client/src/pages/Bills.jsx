import { BillForm, BillSearch, BillTable } from '../components';
import { useState, useContext, createContext } from 'react';
import { useLoaderData, useNavigate, redirect } from 'react-router-dom';
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

export const action = async ({ data, source, navigate }) => {
  try {
    if (source === 'create') {
      await customFetch.post('/bills', data);
      toast.success('Add a new bill');
    } else if (source === 'update') {
      await customFetch.patch(`/bills/${data.id}`, data);
      toast.success('Update bill success');
    } else if (source === 'delete') {
      await customFetch.delete(`/bills/${data._id}`, data);
      toast.success('Delete bill success');
    }
    navigate('/dashboard', { replace: true });
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

  const handleBillSubmit = (event, bill, source) => {
    event.preventDefault();
    console.log('add bill form', bill);
    action({ data: bill, source: source, navigate: navigate });
  };

  const handleBillDelete = (bill, source) => {
    console.log(bill);
    action({ data: bill, source: source, navigate: navigate });
  };

  const openModal = ({ source }) => {
    setBillFormVisible({ visible: true, source: source });
  };

  const closeModal = () => {
    setBillFormVisible({ visible: false, source: '' });
    setBillFormData(initialBillFormData);
  };

  const { bills } = useLoaderData();
  const navigate = useNavigate();

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
        <BillTable bills={bills} onDelete={handleBillDelete} />
      </div>
    </BillContext.Provider>
  );
};

export const useBillContext = () => useContext(BillContext);

export default Bills;
