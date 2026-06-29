/**
 * KpiCard 컴포넌트 — 소형 KPI 지표 카드
 *
 * Props:
 * @param {React.ReactNode} icon - 카드 아이콘 [Required]
 * @param {string} iconBgColor - 아이콘 배경 색상 [Optional, 기본값: 'primary.dark']
 * @param {string} label - KPI 라벨 텍스트 [Required]
 * @param {string|number} value - KPI 수치 [Required]
 * @param {number} changePercent - 변화율 (양수=상승, 음수=하락) [Optional]
 * @param {string} changeLabel - 변화율 보조 텍스트 [Optional, 기본값: 'vs last month']
 * @param {React.ReactNode} chart - 우측 도넛/미니 차트 [Optional]
 *
 * Example usage:
 * <KpiCard icon={<OrdersIcon />} label="Orders" value="201" changePercent={7.5} />
 */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function KpiCard({ icon, iconBgColor = 'primary.dark', label, value, changePercent, changeLabel = 'vs last month', chart }) {
  const isPositive = changePercent >= 0;

  return (
    <Card
      sx={{
        p: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          {/* 아이콘 */}
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              bgcolor: iconBgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: '8px',
            }}
          >
            {icon}
          </Box>

          {/* 라벨 */}
          <Typography
            sx={{ fontSize: '0.75rem', fontWeight: 500, color: 'text.secondary', mb: '4px' }}
          >
            {label}
          </Typography>

          {/* 수치 */}
          <Typography
            sx={{
              fontSize: { xs: '1.25rem', md: '2rem' },
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'primary.main',
            }}
          >
            {value}
          </Typography>
        </Box>

        {/* 미니 차트 (도넛 등) */}
        {chart && <Box>{chart}</Box>}
      </Box>

      {/* 변화율 */}
      {changePercent !== undefined && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {isPositive ? (
            <TrendingUpIcon sx={{ fontSize: 14, color: 'success.main' }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 14, color: 'error.main' }} />
          )}
          <Typography
            sx={{
              fontSize: '0.6875rem',
              fontWeight: 500,
              color: isPositive ? 'success.main' : 'error.main',
            }}
          >
            {isPositive ? '+' : ''}{changePercent}%
          </Typography>
          <Typography sx={{ fontSize: '0.6875rem', color: 'text.disabled' }}>
            {changeLabel}
          </Typography>
        </Box>
      )}
    </Card>
  );
}

export default KpiCard;
