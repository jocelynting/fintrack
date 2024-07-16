import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartLegend = ({ data }) => {
  return (
    <div>
      {data.map((entry, index) => (
        <div
          key={`legend-${index}`}
          style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: colors[index % colors.length],
              marginRight: 5,
            }}
          />
          <div>{`${entry.category} - $${entry.total}  ${entry.percentage}`}</div>
        </div>
      ))}
    </div>
  );
};

const PieChartComponent = ({ data }) => {
  return (
    <PieChart width={500} height={500}>
      <Pie
        data={data}
        dataKey="total"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label={({ name, percentage }) => `${name}: ${percentage}`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend content={<PieChartLegend data={data} />} />
    </PieChart>
  );
};

export default PieChartComponent;
