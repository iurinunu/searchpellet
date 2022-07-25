import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';
import fetcher from '@/utils/fetcher';
import SiteTableHeader from '@/components/SiteTableHeader';

const SellerDashboard = ({ children }: any) => {

  const { user } = useAuth();
  console.log('dashboard')
  console.log(user);
  const { data } = useSWR(user ? ['/api/ads', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  console.log(data.ads);
  console.log(!!data.ads);

  return (
    <DashboardShell>
      <SiteTableHeader />
      {data.ads?.length ? <SiteTable ads={data.ads} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default SellerDashboard;