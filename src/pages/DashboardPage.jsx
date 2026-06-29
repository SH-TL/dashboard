import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PeopleIcon from '@mui/icons-material/People';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import Sidebar from '../components/common/Sidebar';
import TopBar from '../components/common/TopBar';
import KpiCard from '../components/ui/KpiCard';
import KpiCardLg from '../components/ui/KpiCardLg';
import DonutChart from '../components/ui/DonutChart';
import SalesChart from '../components/ui/SalesChart';
import ActivityChart from '../components/ui/ActivityChart';
import OrderTable from '../components/ui/OrderTable';

const KPI_ITEMS = [
  {
    icon: <ShoppingCartIcon sx={{ fontSize: 18, color: '#EAB500' }} />,
    iconBgColor: '#C4920030',
    label: 'Orders',
    value: '201',
    changePercent: 7.5,
  },
  {
    icon: <CheckCircleOutlinedIcon sx={{ fontSize: 18, color: '#10B981' }} />,
    iconBgColor: '#10B98130',
    label: 'Approved',
    value: '4,890',
    changePercent: 3.2,
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 18, color: '#8090E0' }} />,
    iconBgColor: '#6070C830',
    label: 'Users',
    value: '25,410',
    changePercent: 12.1,
    chart: <DonutChart percent={72} color='#8090E0' size={56} />,
  },
  {
    icon: <SubscriptionsIcon sx={{ fontSize: 18, color: '#EAB500' }} />,
    iconBgColor: '#EAB50020',
    label: 'Subscriptions',
    value: '1,352',
    changePercent: -1.8,
    chart: <DonutChart percent={48} color='#EF4444' size={56} />,
  },
];

const KPI_LG_ITEMS = [
  {
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 20, color: '#EAB500' }} />,
    iconBgColor: '#C4920030',
    label: 'Month Total',
    value: '$30,256.23',
    changePercent: 12.5,
    subLabel: 'vs last month',
  },
  {
    icon: <MonetizationOnIcon sx={{ fontSize: 20, color: '#8090E0' }} />,
    iconBgColor: '#6070C830',
    label: 'Revenue',
    value: '4.890',
    changePercent: 5.3,
    subLabel: 'Avg transaction',
  },
];

function DashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 사이드바 — 데스크톱 */}
      {!isMobile && (
        <Sidebar />
      )}

      {/* 사이드바 — 모바일 Drawer */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 220, bgcolor: 'background.paper', border: 'none' },
        }}
      >
        <Sidebar onClose={() => setMobileOpen(false)} />
      </Drawer>

      {/* 메인 영역 */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* 탑바 */}
        <Box sx={{ position: 'relative' }}>
          {isMobile && (
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'text.secondary', zIndex: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <TopBar title='Analytics' />
        </Box>

        {/* 콘텐츠 */}
        <Box sx={{ flex: 1, p: { xs: '16px', md: '24px' }, overflow: 'auto' }}>
          <Grid container spacing={{ xs: '10px', md: '16px' }} sx={{ mb: { xs: '10px', md: '16px' } }}>
            {KPI_ITEMS.map((item) => (
              <Grid key={item.label} size={{ xs: 12, sm: 6, lg: 3 }}>
                <KpiCard {...item} />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={{ xs: '10px', md: '16px' }} sx={{ mb: { xs: '10px', md: '16px' } }}>
            {KPI_LG_ITEMS.map((item) => (
              <Grid key={item.label} size={{ xs: 12, sm: 6 }}>
                <KpiCardLg {...item} />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={{ xs: '10px', md: '16px' }} sx={{ mb: { xs: '10px', md: '16px' } }}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <SalesChart />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <ActivityChart />
            </Grid>
          </Grid>

          <OrderTable />
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardPage;
