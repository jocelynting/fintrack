import NoDataImage from '../assets/images/no-data.svg';

const NoData = () => {
  return (
    <div className="bill__nodata">
      <img className="nodata__image" src={NoDataImage} alt="not found" />
      <p className="nodata__content">
        Oops! There is no data found. Please add a new bill to get started.
      </p>
    </div>
  );
};

export default NoData;
