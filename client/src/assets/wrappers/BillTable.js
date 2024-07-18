import styled from 'styled-components';

const Wrapper = styled.table`
  width: 100%;
  padding: 1rem 0rem;

  .table__header {
    background-color: var(--primary-500);
    color: var(--white);
    th {
      padding: 8px 5px;
    }
  }

  .table__row {
  }

  .table__row:nth-child(odd) {
    background-color: var(--table-bg-color-odd);
  }

  .table__row:nth-child(even) {
    background-color: var(--table-bg-color-even);
  }

  td {
    padding: 5px;
    text-align: center;
  }

  td:nth-child(1) {
    width: 10%;
  }

  td:nth-child(2) {
    width: 15%;
  }

  td:nth-child(3) {
    width: 25%;
  }

  td:nth-child(4) {
    width: 35%;
  }

  td:nth-child(5) {
    width: 15%;
  }

  .table__row-date {
    background-color: var(--table-date-bg-color);
    text-align: left;
    padding-left: 0.5rem;
  }

  .table__btn {
    background: transparent;
    color: var(--table-btn-bg-color);
    border: none;
    font-size: 1rem;
    padding: 2px 5px 0 5px;
    cursor: pointer;
  }
`;

export default Wrapper;
