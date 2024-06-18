import Wrapper from '../assets/wrappers/BillTable';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { useBillContext } from '../pages/Bills';

const BillTable = ({ bills }) => {
  const { openModal, updateBillFormData } = useBillContext();

  const handleBillEdit = (bill) => {
    updateBillFormData((prevFormData) => ({
      ...prevFormData,
      id: bill._id,
      amount: bill.amount,
      type: bill.type,
      category: bill.category._id,
      subcategory: bill.subcategory && bill.subcategory._id,
      description: bill.description,
      date: bill.createAt,
    }));
    openModal({ source: 'update' });
  };

  const handleBillDelete = (bill) => {};

  const dates = [];

  return (
    <Wrapper>
      <thead className="table__header">
        <tr>
          <th>Time</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Description</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        {bills
          .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
          .reduce((acc, bill) => {
            const billDate = new Date(bill.createAt);
            const date = new Date(
              billDate.getFullYear(),
              billDate.getMonth(),
              billDate.getDate()
            ).toLocaleDateString();
            const time = billDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });
            if (!dates.includes(date)) {
              dates.push(date);
              return acc.concat([
                <tr className="table__row" key={date}>
                  <td className="table__row-date" colSpan="5">
                    {date}
                  </td>
                </tr>,
                <tr className="table__row" key={bill._id}>
                  <td>{time}</td>
                  <td>${bill.amount}</td>
                  <td>
                    {bill.type === 'expense'
                      ? bill.subcategory.name
                      : bill.category.name}
                  </td>
                  <td>{bill.description}</td>
                  <td className="table__btn-groups">
                    <button
                      className="table__btn"
                      onClick={() => handleBillEdit(bill)}
                    >
                      <CiEdit />
                    </button>
                    <button
                      className="table__btn"
                      onClick={() => handleBillDelete(bill)}
                    >
                      <MdOutlineDeleteSweep />
                    </button>
                  </td>
                </tr>,
              ]);
            } else {
              return acc.concat([
                <tr className="table__row" key={bill._id}>
                  <td>{time}</td>
                  <td>${bill.amount}</td>
                  <td>
                    {bill.type === 'expense'
                      ? bill.subcategory.name
                      : bill.category.name}
                  </td>
                  <td>{bill.description}</td>
                  <td className="table__btn-groups">
                    <button
                      className="table__btn"
                      onClick={() => handleBillEdit(bill)}
                    >
                      <CiEdit />
                    </button>
                    <button
                      className="table__btn"
                      onClick={() => handleBillDelete(bill)}
                    >
                      <MdOutlineDeleteSweep />
                    </button>
                  </td>
                </tr>,
              ]);
            }
          }, [])}
      </tbody>
    </Wrapper>
  );
};

export default BillTable;
