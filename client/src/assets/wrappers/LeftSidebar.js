import styled from 'styled-components';

const Wrapper = styled.aside`
  display: none;

  @media (min-width: 62rem) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);

    .sidebar {
      background: var(--background-secondary-color);
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-left: -250px;
      transition: margin-left 0.3s ease-in-out;
    }

    .show__sidebar {
      margin-left: 0;
    }

    .sidebar__content {
      position: sticky;
      top: 0;
    }

    .logo {
      height: var(--nav-height);
      display: block;
      margin: 0 auto;
    }

    .nav__links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }

    .nav__link {
      display: flex;
      align-items: center;
      color: var(--text-secondary-color);
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: padding-left 0.3s ease-in-out;
    }

    .nav__link:hover {
      padding-left: 3rem;
      color: var(--primary-600);
      transition: var(--transition);
    }

    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
    }

    .active {
      color: var(--primary-600);
    }
  }
`;

export default Wrapper;
