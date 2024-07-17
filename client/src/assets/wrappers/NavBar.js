import styled from 'styled-components';

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;

  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);

  z-index: 1;

  .nav__toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--primary-600);
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
  }

  .nav__center-title {
    display: none;
  }

  .nav__right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  @media (min-width: 62rem) {
    position: sticky;
    top: 0;

    .logo {
      display: none;
    }

    .nav__center-title {
      display: block;
      font-size: 2rem;
      font-weight: 500;
    }
  }
`;

export default Wrapper;
