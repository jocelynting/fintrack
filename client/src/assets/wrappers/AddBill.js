import styled from 'styled-components';

const Wrapper = styled.div`
  .modal__background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .modal__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 0rem 3rem;
    border-radius: 5px;
  }

  .bill__form {
    padding: 1rem 0;
    width: 60vw;
    max-width: var(--fixed-width);
    background: var(--background-secondary-color);
  }

  .logo {
    padding: 1.5rem 0;
  }

  .form__row-radio {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
  }

  .form__radio-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form__radio {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }

  .form__row-category {
    display: flex;
    flex-direction: column;
  }

  .category__select {
    width: 100%;
    height: 40px;
    padding: 0.375rem 0.75rem;
    padding-right: 2rem;
    border-radius: var(--border-radius);
    background: var(--background-color);
    border: 1px solid var(--grey-300);
    color: var(--text-color);
    font-family: inherit;
  }

  .form__buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }

  @media (min-width: 30rem) {
    .form__radio-group {
      flex-direction: row;
    }

    .form__row-category {
      flex-direction: row;
      gap: 1.5rem;
    }

    .subcategory {
      padding-top: 2rem;
    }
  }
`;

export default Wrapper;
