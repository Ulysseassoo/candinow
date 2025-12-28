import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { ChartDataItem } from '@/lib/dashboardUtils';
import { CHART_COLORS } from '@/constants/chartColors';

interface PieChartSectionProps {
  data: ChartDataItem[];
}

export const PieChartSection = ({ data }: PieChartSectionProps) => {
  return (
    <div className="soft-card p-8 h-[400px] flex flex-col">
      <h3 className="text-[12px] font-black text-text-primary uppercase tracking-widest mb-8 border-b border-border pb-4">
        Visualisation Pipeline
      </h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[entry.key] || '#FFB7C5'} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '20px', border: 'none' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: CHART_COLORS[entry.key] }} 
            />
            <span className="text-[9px] font-black text-text-secondary uppercase tracking-tighter truncate">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

