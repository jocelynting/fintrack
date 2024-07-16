import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const BarChartComponent = ({ data }) => {
  const formatTooltip = (value, name, props) => {
    if (name === 'total') {
      return [`Amount: $${value}`];
    }
    return [value, name];
  };

  return (
    <BarChart width={600} height={500} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip formatter={formatTooltip} />
      <Bar dataKey="total" fill="#8884d8" label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Bar key={`bar-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default BarChartComponent;
