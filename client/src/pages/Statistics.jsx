import { StatisticsSearch, PieChart, BarChart, NoData } from '../components';
import Wrapper from '../assets/wrappers/Statistics';
import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { STATISTICS_SEARCH_TYPE } from '../utils/utils';

export const loader = async ({ params }) => {
  try {
    const defaultParams = {
      date: new Date(),
      calendar: 'year',
      type: STATISTICS_SEARCH_TYPE.EXPENSE_CATEGORY,
    };
    const finalParams = { ...defaultParams, ...params };
    const query = params ? new URLSearchParams(finalParams).toString() : '';
    const { data } = await customFetch.get(`/bills/statistics?${query}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Statistics = () => {
  const loaderData = useLoaderData();
  const [statistics, setStatistics] = useState(loaderData.statistics);
  const [activeChart, setActiveChart] = useState('pie');

  const handleSearch = async (searchInfo) => {
    const data = await loader({ params: searchInfo });
    setStatistics(data.statistics);
  };

  useEffect(() => {}, [statistics]);

  const loadPieChart = () => {
    setActiveChart('pie');
  };

  const loadBarChart = () => {
    setActiveChart('bar');
  };

  return (
    <Wrapper>
      <StatisticsSearch onSearch={handleSearch} />
      {statistics.length === 0 ? (
        <NoData />
      ) : (
        <div className="charts">
          <div className="charts__buttons">
            <button className="charts__button" onClick={loadPieChart}>
              Pie
            </button>
            <button className="charts__button" onClick={loadBarChart}>
              Bar
            </button>
          </div>
          {activeChart === 'pie' && <PieChart data={statistics} />}
          {activeChart === 'bar' && <BarChart data={statistics} />}
        </div>
      )}
    </Wrapper>
  );
};
export default Statistics;
