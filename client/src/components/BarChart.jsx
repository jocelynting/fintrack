import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { generateColorsForChart } from '../utils/utils';

const BarChartComponent = ({ data }) => {
  const colors = generateColorsForChart(data.length);

  const formatTooltip = (value, name, props) => {
    if (name === 'total') {
      return [`Amount: $${value}`];
    }
    return [value, name];
  };

  return (
    <BarChart width={750} height={600} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" tick={{ fontSize: 10 }} />
      <YAxis />
      <Tooltip formatter={formatTooltip} />
      <Bar dataKey="total" label={{ position: 'top' }} barSize={35}>
        {data.map((entry, index) => (
          <Cell key={`bar-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default BarChartComponent;
