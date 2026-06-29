/**
 * Sidebar 컴포넌트 — 사이드바 네비게이션
 *
 * Props:
 * @param {function} onClose - 모바일 Drawer 닫기 콜백 [Optional]
 *
 * Example usage:
 * <Sidebar onClose={() => setMobileOpen(false)} />
 */
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useLocation, useNavigate } from 'react-router-dom';
import CloudIcon from '@mui/icons-material/Cloud';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SettingsIcon from '@mui/icons-material/Settings';
import BoltIcon from '@mui/icons-material/Bolt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const NAV_ITEMS = [
  { path: '/', label: 'File Storage', icon: <CloudIcon fontSize='small' /> },
  { path: '/analytics', label: 'Analytics', icon: <ShowChartIcon fontSize='small' /> },
];

const BOTTOM_ITEMS = [
  { path: '/settings', label: 'Settings', icon: <SettingsIcon fontSize='small' /> },
];

function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
    onClose?.();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        width: 220,
        minWidth: 220,
        height: '100vh',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        py: '20px',
        px: '16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* 브랜드 로고 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 8 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BoltIcon sx={{ color: '#180805', fontSize: 20 }} />
        </Box>
        <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: 'primary.main', letterSpacing: '0.05em' }}>
          TENET
        </Typography>
      </Box>

      {/* 메인 네비게이션 */}
      <List disablePadding sx={{ flex: 1 }}>
        {NAV_ITEMS.map((item) => (
          <ListItemButton
            key={item.path}
            selected={isActive(item.path)}
            onClick={() => handleNav(item.path)}
            sx={{ height: 40, px: '16px', gap: '12px' }}
          >
            <ListItemIcon sx={{ minWidth: 0, color: 'text.secondary' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2, borderColor: 'divider' }} />

      {/* 하단 메뉴 */}
      <List disablePadding>
        {BOTTOM_ITEMS.map((item) => (
          <ListItemButton
            key={item.path}
            selected={isActive(item.path)}
            onClick={() => handleNav(item.path)}
            sx={{ height: 40, px: '16px', gap: '12px' }}
          >
            <ListItemIcon sx={{ minWidth: 0, color: 'text.secondary' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500 }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* 하단 서포트 카드 */}
      <Box
        sx={{
          mt: 3,
          borderRadius: '14px',
          border: '1px solid',
          borderColor: 'primary.dark',
          p: '16px',
          bgcolor: '#180805',
        }}
      >
        <SupportAgentIcon sx={{ color: 'primary.main', fontSize: 20, mb: 1 }} />
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'primary.main', mb: 0.5 }}>
          Support Center
        </Typography>
        <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary', lineHeight: 1.5 }}>
          Help docs & live chat available
        </Typography>
      </Box>
    </Box>
  );
}

export default Sidebar;
