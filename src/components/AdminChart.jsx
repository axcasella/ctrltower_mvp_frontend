import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const actualSpend = [45000, 130000, 250000, 278000, 338991, 500013];
const savings = [45000, 100000, 102290, 242000, 102181, 322500];
const xLabels = [
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
];

const AdminChart = () => {
  return (
    <LineChart
      width={1100} 
      height={500}
      series={[
        { 
          data: actualSpend, 
          label: 'Spend', 
          area: true, 
          stack: 'total', 
          showMark: true, 
          color: 'skyblue',
        },
        {
          data: savings,
          label: 'Savings',
          area: true,
          stack: 'total',
          showMark: true,
          color: '#2DBFFD',
        },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{
        '.MuiLineElement-root': {
          display: 'none',
        },
        m: '1rem',
      }}
    />
  );
}

export default AdminChart;
