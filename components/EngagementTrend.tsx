'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface EngagementTrendProps {
  labels: string[];
  dataPoints: number[];
}

export function EngagementTrend({ labels, dataPoints }: EngagementTrendProps) {
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: 'Total engagement',
            data: dataPoints,
            fill: true,
            borderColor: '#4f46e5',
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            tension: 0.4,
            borderWidth: 2,
            pointHoverRadius: 6,
            pointRadius: 4
          }
        ]
      }}
      options={{
        responsive: true,
        scales: {
          y: {
            grid: { display: false },
            ticks: { color: '#6b7280', callback: (value) => `${value}` },
            beginAtZero: true
          },
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8' }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.parsed.y} interactions`
            }
          }
        }
      }}
    />
  );
}
