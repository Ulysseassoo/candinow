import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { ChartDataItem } from '@/lib/dashboardUtils';
import { CHART_COLORS } from '@/constants/chartColors';

interface BarChartSectionProps {
  data: ChartDataItem[];
}

export const BarChartSection = ({ data }: BarChartSectionProps) => {
  return (
    <div className="soft-card p-8 h-[400px]">
      <h3 className="text-[12px] font-black text-text-primary uppercase tracking-widest mb-8 border-b border-border pb-4">
        Distribution par Statut
      </h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#FCE4EC" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#9A9EB3', fontWeight: 800 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#9A9EB3', fontWeight: 800 }} 
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '20px', 
              border: 'none', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)', 
              fontWeight: 'bold' 
            }}
            cursor={{ fill: '#FFF0F3' }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[entry.key] || '#FFB7C5'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

