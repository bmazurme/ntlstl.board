import React from 'react';
import {
  PieChart, Pie, Legend, ResponsiveContainer, Cell,
} from 'recharts';

import style from './chart-pie.module.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ChartPie() {
  const data = [
    { name: 'Item 1', value: 75 },
    { name: 'Item 2', value: 25 },
  ];

  return (
    <div className={style.chart}>
      <h2 className={style.title}>Title</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                name={data[index].name}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
