import styled from 'styled-components';

const Wrapper = styled.div`
  .bill__table-nodata {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0rem;
  }

  .nodata__image {
    padding-top: 5rem;
    max-width: 25rem;
  }

  .nodata__content {
    padding-top: 1.5rem;
    line-height: 1.5;
    color: var(--text-secondary-color);
  }
`;

export default Wrapper;
