import type { Transaction } from "../../redux/selectors/transaction_selectors";

import {
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  LabelList,
} from "recharts";

import "./Chart.css";

interface ChartData {
  bigData: Transaction[];
}

interface CustomLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
}

const CustomLabel = ({
  x = 0,
  y = 0,
  width = 0,
  value = 0,
}: CustomLabelProps) => {
  return (
    <text
      x={x + width / 2}
      y={y - 10}
      textAnchor="middle"
      fill="#1f0303"
      fontSize={13}
      fontWeight={600}
    >
      {value} грн
    </text>
  );
};

const Chart = ({ bigData }: ChartData) => {
  if (!bigData?.length) return null;

  const sortedData = [...bigData].sort(
    (a, b) => b.value - a.value
  );

  return (
    <div className="chart-wrapper">
      <div className="chart-inner">
        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={sortedData}
            margin={{
              top: 45,
              right: 25,
              left: 25,
              bottom: 20,
            }}
            barCategoryGap="30%"
          >
            <CartesianGrid
              vertical={false}
              stroke="#e5e5e5"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              interval={0}
              dy={10}
              tick={{
                fill: "#4a4a4a",
                fontSize: 13,
              }}
            />

            <YAxis hide />

            <Tooltip
              cursor={{
                fill: "rgba(255, 117, 29, 0.05)",
              }}
              formatter={(value) => [`${value} грн`, "Сума"]}
              contentStyle={{
                border: "none",
                borderRadius: "10px",
                boxShadow: "0 6px 20px rgba(0,0,0,.1)",
              }}
            />

            <Bar
              dataKey="value"
              fill="#FF751D"
              radius={[10, 10, 0, 0]}
              maxBarSize={55}
              minPointSize={4}
            >
              <LabelList
                dataKey="value"
                content={<CustomLabel />}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;