import DemographicCard from '@/ui/components/highlight/DemographicCard';
import { EcommerceMetrics } from '@/ui/components/highlight/EcommerceMetrics';
import MonthlySalesChart from '@/ui/components/highlight/MonthlySalesChart';
import MonthlyTarget from '@/ui/components/highlight/MonthlyTarget';
import RecentOrders from '@/ui/components/highlight/RecentOrders';
import StatisticsChart from '@/ui/components/highlight/StatisticsChart';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Home for TailAdmin Dashboard Template',
};

const HomePage = () => (
  <div className="grid grid-cols-12 gap-4 md:gap-6">
    <div className="col-span-12 space-y-6 xl:col-span-7">
      <EcommerceMetrics />

      <MonthlySalesChart />
    </div>

    <div className="col-span-12 xl:col-span-5">
      <MonthlyTarget />
    </div>

    <div className="col-span-12">
      <StatisticsChart />
    </div>

    <div className="col-span-12 xl:col-span-5">
      <DemographicCard />
    </div>

    <div className="col-span-12 xl:col-span-7">
      <RecentOrders />
    </div>
  </div>
);

export default HomePage;
