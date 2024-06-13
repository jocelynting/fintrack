import { AddBill } from '../components';
import { useState } from 'react';

const Bills = () => {
  const [addBillVisible, setAddBillVisible] = useState(false);

  const openModal = () => {
    setAddBillVisible(true);
  };

  const closeModal = () => {
    setAddBillVisible(false);
  };

  return (
    <div>
      <button className="btn" onClick={openModal}>
        Add Bill
      </button>
      <AddBill visible={addBillVisible} closeModal={closeModal}>
        {' '}
      </AddBill>
    </div>
  );
};

export default Bills;
