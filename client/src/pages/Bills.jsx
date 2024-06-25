import { BillForm, BillSearch, BillTable } from '../components';
import { useState, useEffect, useContext, createContext } from 'react';
import { useLoaderData, useNavigate, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { FETCH_TYPE } from '../utils/utils';

export const loader = async ({ params }) => {
  try {
    const query = params ? new URLSearchParams(params).toString() : '';
    const { data } = await customFetch.get(`/bills?${query}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const action = async ({ data, source, navigate }) => {
  try {
    if (source === FETCH_TYPE.CREATE) {
      await customFetch.post('/bills', data);
      toast.success('Add a new bill');
    } else if (source === FETCH_TYPE.UPDATE) {
      await customFetch.patch(`/bills/${data.id}`, data);
      toast.success('Update bill success');
    } else if (source === FETCH_TYPE.DELETE) {
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

  const loaderData = useLoaderData();
  const [bills, setBills] = useState(loaderData.bills);
  const navigate = useNavigate();

  const handleSearch = async (searchInfo) => {
    const data = await loader({ params: searchInfo });
    setBills(data.bills);
  };

  useEffect(() => {}, [bills]);

  return (
    <BillContext.Provider
      value={{ billFormData, updateBillFormData, openModal }}
    >
      <div>
        <button
          className="btn"
          onClick={() => openModal({ source: FETCH_TYPE.CREATE })}
        >
          Add Bill
        </button>
        <BillForm
          status={billFormVisible}
          closeModal={closeModal}
          submitForm={handleBillSubmit}
        />
        <BillSearch onSearch={handleSearch} />
        <BillTable bills={bills} onDelete={handleBillDelete} />
      </div>
    </BillContext.Provider>
  );
};

export const useBillContext = () => useContext(BillContext);

export default Bills;
