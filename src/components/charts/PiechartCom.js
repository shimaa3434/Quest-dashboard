import React from 'react'
import { Cell, Pie, PieChart } from 'recharts';

const PiechartCom = (props) => {
    const data = [
  { name: 'Group A', value: props.val_1 },
  { name: 'Group B', value: props.val_2 },
  { name: 'Group C', value: props.val_3 },
  { name: 'Group D', value: props.val_4 },
];
  return (
    <PieChart width={100} height={100}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={40}
          innerRadius={20}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={5}
        >
        {data.map((entry, index) => (
          <Cell key={`cell-${entry.name}`} fill={props.COLORS[index % props.COLORS.length]} />
        ))}
        </Pie>
    </PieChart>
  )
}

export default PiechartCom