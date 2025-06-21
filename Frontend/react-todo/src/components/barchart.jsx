import React from 'react'
import {ResponsiveContainer,BarChart,XAxis,YAxis,Tooltip,Legend, Bar, CartesianGrid} from "recharts"

export default function Barchart({Transactions}){
  const barchartData= Transactions
  return (
    <ResponsiveContainer width= "100%" height="80%">
        <BarChart data={barchartData} margin={{ top: 20, right:0, left:0, bottom: 5 }}>
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 9 }}/>
            <XAxis dataKey="_id" tickLine={false} axisLine={false} tick={{ fontSize: 9 }}></XAxis>
            <Tooltip></Tooltip>
            <Bar barSize={100} barGap={3} dataKey="total" fill='#c084fc' radius={[10, 10, 0, 0]}></Bar>
        </BarChart>
    </ResponsiveContainer>
  )
}
