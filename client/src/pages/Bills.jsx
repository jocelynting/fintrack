import {
  BillForm,
  BillSearch,
  BillTable,
  PageIndex,
  NoData,
} from '../components';
import Wrapper from '../assets/wrappers/Bills';
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
  const navigate = useNavigate();

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

  const data = useLoaderData();
  const [bills, setBills] = useState(data.bills);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [searchValues, setSearchValues] = useState({});

  const handleSearch = async (searchInfo) => {
    const data = await loader({ params: searchInfo });
    setBills(data.bills);
    setSearchValues(searchInfo);
    setPage(1);
  };

  const pageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {}, [bills]);

  useEffect(() => {
    const fetchPageBills = async () => {
      const searchParams = { ...searchValues, page };
      const data = await loader({ params: searchParams });
      setBills(data.bills);
      setTotalPages(data.totalPages);
    };
    fetchPageBills();
  }, [page, searchValues]);

  return (
    <BillContext.Provider
      value={{ billFormData, updateBillFormData, openModal }}
    >
      <Wrapper>
        <button
          className="bill__add btn"
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
        {bills.length === 0 ? (
          // If there are no bills, display the following message
          <NoData />
        ) : (
          <div className="bills__table">
            <BillTable bills={bills} onDelete={handleBillDelete} />
            {totalPages > 1 && (
              <PageIndex
                page={page}
                totalPages={totalPages}
                pageChange={pageChange}
              />
            )}
          </div>
        )}
      </Wrapper>
    </BillContext.Provider>
  );
};

export const useBillContext = () => useContext(BillContext);

export default Bills;
