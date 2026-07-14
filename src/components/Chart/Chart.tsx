import {
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

interface Category {
  name: string;
  value: number;
  color: string;
}

const data: Category[] = [
  { name: "Свинина", value: 5000, color: "#FF751D" },
  { name: "Говядина", value: 4500, color: "#FFDAC0" },
  { name: "Курятина", value: 3200, color: "#FFDAC0" },
  { name: "Риба", value: 2100, color: "#FF751D" },
  { name: "Паніни", value: 1800, color: "#FFDAC0" },
  { name: "Кава", value: 1700, color: "#FFDAC0" },
  { name: "Спагетті", value: 1500, color: "#FF751D" },
  { name: "Шоколад", value: 800, color: "#FFDAC0" },
  { name: "Маслини", value: 500, color: "#FFDAC0" },
  { name: "Зелень", value: 300, color: "#FF751D" },
];

const customBar = (data: any) => {
  const { x, y, width, height, payload } = data;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={payload.color}
      rx={10}
      ry={10}
    />
  );
};

const Chart = () => {
  return (
    <ResponsiveContainer width="50%" height={400} style={{ margin: "0 auto" }}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="name" />
        <YAxis hide />
        <Tooltip />
        <Bar dataKey="value" shape={customBar} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;

// ResponsiveContainer - контейнер в котором храниться весь график , принимает value="100%"* && height="400"*
// BarChart - контейнер для самого графика - принимает data[array[{}]](массив обьектов)
// CartesianGrid - сетка фона(верт или гориз) vertical={false} будут горизонтальные
// Xa - Ya принимает dataKey="name" или hide
// ToolTip - подсказка при наведении вроде
// Bar - столбец который принимает dataKey="value" , radius={[10(lt) , 10(rt) , 0(lb) , 0(lr)]}



// клик по категории сохраняет\отправляет payload=[
// {name="..." , value="123" , color="#11111" }
// ]
// 
// 