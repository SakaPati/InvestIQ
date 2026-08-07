import type { Transaction } from "@/redux/transaction_selectors";

import {
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";


interface ChartData {
  bigData: Transaction[];
}

const customBar = (data: any) => {
  const { x, y, width, height } = data;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="#FF751D"
      rx={10}
      ry={10}
    />
  );
};

const Chart = ({ bigData }: ChartData) => {

  return bigData ? (
    <ResponsiveContainer width="50%" height={400} style={{ margin: "0 auto" }}>
      <BarChart data={bigData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" />
        <YAxis hide />
        <Tooltip />
        <Bar dataKey="value" shape={customBar} />
      </BarChart>
    </ResponsiveContainer>
  ) : null;
};

export default Chart;

