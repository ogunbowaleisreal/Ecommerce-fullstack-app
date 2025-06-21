import React from 'react'
import {AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from "recharts"

export default function Linegraph({ expensebyCategory }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={expensebyCategory.sort((a, b) => a._id - b._id)}
        margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
      >
        <XAxis dataKey="_id" tick={{ fontSize: 9 }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 9 }} />
        <Tooltip />
        <Legend />        
        <Area
          type="monotone"
          dataKey="total"
          stroke="#6B21A8"
          strokeWidth={2}
          fill="url(#colorUv)"
        />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6B21A8" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#6B21A8" stopOpacity={0} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  )
}
