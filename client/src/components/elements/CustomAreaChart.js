import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  {
    name: 'January',
    Donate: 1000,
  },
  {
    name: 'Fabuary',
    Donate: 2000,
  },
  {
    name: 'March',
    Donate: 900,
  },
  {
    name: 'April',
    Donate: 2780,
  },
  {
    name: 'May',
    Donate: 1890,
  },
  {
    name: 'June',
    Donate: 2000,
  },
  {
    name: 'August',
    Donate: 1100,
  },
  {
    name: 'September',
    Donate: 5000,
  },
  {
    name: 'October',
    Donate: 3490,
  },
]

const CustomAreaChart = ({ report, dataKey }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={report || data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Area
            type='monotone'
            dataKey={dataKey}
            stroke='#8884d8'
            fill='#8884d8'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomAreaChart
