import React from 'react'
import {PieChart,Pie,Tooltip,Legend,ResponsiveContainer, Cell} from "recharts"

export default function Piecharts({Transactions,text1,text2}) {
    const COLORS =["#6B21A8","#F97316","#EF4444","#B45309","#15803D"]
  return (
    <ResponsiveContainer>
        <PieChart>
          <Tooltip></Tooltip>
            <Pie
            data={Transactions}
            dataKey="total"
            nameKey="_id"
            outerRadius={120}
            innerRadius={80}
            cx="50%"
            cy="50%">
            {Transactions.map((item,index)=>{
            return <Cell key={index} fill={COLORS[index]}/>})}                
            </Pie>
            <text
            x="50%"
            y="45%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-md font-semibold fill-gray-800"
          >
          {text1}
          </text>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-lg font-bold fill-gray-800"
          >
          $ {text2}
          </text>
            <Legend wrapperStyle={{ fontSize: '12px' }} layout='vertical' height={80} iconType='circle'/>
        </PieChart>
    </ResponsiveContainer>
  )
}
