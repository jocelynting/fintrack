import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { generateColorsForChart } from '../utils/utils';

const PieChartLegend = ({ data, colors }) => {
  return (
    <div className="legend__details">
      {data.map((entry, index) => (
        <div key={`legend-${index}`} className="legend__detail-item">
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: colors[index % colors.length],
              marginRight: 5,
            }}
          />
          <p>{`${entry.category} - $${entry.total}  ${entry.percentage}`}</p>
        </div>
      ))}
    </div>
  );
};

const PieChartComponent = ({ data }) => {
  const colors = generateColorsForChart(data.length);

  return (
    <PieChart width={800} height={700}>
      <Pie
        data={data}
        dataKey="total"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label={({ name, percentage }) => `${name}: ${percentage}`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend content={<PieChartLegend data={data} colors={colors} />} />
    </PieChart>
  );
};

export default PieChartComponent;
