/**
 * TopBar 컴포넌트 — 대시보드 상단 헤더
 *
 * Props:
 * @param {string} title - 페이지 타이틀 [Required]
 *
 * Example usage:
 * <TopBar title="Analytics" />
 */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';

function TopBar({ title }) {
  return (
    <Box
      sx={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '24px',
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        gap: '16px',
        flexShrink: 0,
      }}
    >
      {/* 페이지 타이틀 */}
      <Typography
        sx={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'primary.main',
          letterSpacing: '0.05em',
        }}
      >
        {title}
      </Typography>

      {/* 우측 컨트롤 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* 날짜 범위 */}
        <Chip
          icon={<CalendarTodayIcon sx={{ fontSize: 12 }} />}
          label='Jun 1 – Jun 30, 2026'
          variant='outlined'
          size='small'
          sx={{
            height: 32,
            px: 1,
            fontSize: '0.75rem',
            fontWeight: 500,
            borderColor: 'divider',
            color: 'text.secondary',
            display: { xs: 'none', sm: 'flex' },
          }}
        />

        {/* 검색 */}
        <IconButton size='small' sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
          <SearchIcon fontSize='small' />
        </IconButton>

        {/* 알림 */}
        <IconButton size='small' sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
          <Box sx={{ position: 'relative' }}>
            <NotificationsNoneIcon fontSize='small' />
            <Box
              sx={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: 'primary.main',
              }}
            />
          </Box>
        </IconButton>

        {/* 아바타 */}
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'primary.dark',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: '#F0EAD8',
            cursor: 'pointer',
          }}
        >
          SH
        </Avatar>
      </Box>
    </Box>
  );
}

export default TopBar;
