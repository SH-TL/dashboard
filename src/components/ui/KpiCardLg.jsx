/**
 * KpiCardLg 컴포넌트 — 대형 KPI 카드 (Month Total, Revenue 등)
 *
 * Props:
 * @param {React.ReactNode} icon - 카드 아이콘 [Required]
 * @param {string} iconBgColor - 아이콘 배경 색상 [Optional]
 * @param {string} label - 카드 라벨 [Required]
 * @param {string|number} value - 메인 수치 [Required]
 * @param {number} changePercent - 변화율 [Optional]
 * @param {string} subLabel - 보조 설명 텍스트 [Optional]
 * @param {React.ReactNode} chart - 우측 차트 영역 [Optional]
 *
 * Example usage:
 * <KpiCardLg icon={<MoneyIcon />} label="Month Total" value="$30,256.23" changePercent={12.5} />
 */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function KpiCardLg({ icon, iconBgColor = 'secondary.dark', label, value, changePercent, subLabel, chart }) {
  const isPositive = !changePercent || changePercent >= 0;

  return (
    <Card
      sx={{
        p: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1 }}>
          {/* 아이콘 + 라벨 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mb: '12px' }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                bgcolor: iconBgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </Box>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 500, color: 'text.secondary' }}>
              {label}
            </Typography>
          </Box>

          {/* 수치 */}
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'primary.main',
              mb: '4px',
            }}
          >
            {value}
          </Typography>

          {/* 변화율 */}
          {changePercent !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {isPositive ? (
                <TrendingUpIcon sx={{ fontSize: 13, color: 'success.main' }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: 13, color: 'error.main' }} />
              )}
              <Typography
                sx={{ fontSize: '0.6875rem', fontWeight: 500, color: isPositive ? 'success.main' : 'error.main' }}
              >
                {isPositive ? '+' : ''}{changePercent}%
              </Typography>
            </Box>
          )}

          {subLabel && (
            <Typography sx={{ fontSize: '0.6875rem', color: 'text.disabled', mt: '4px' }}>
              {subLabel}
            </Typography>
          )}
        </Box>

        {chart && <Box sx={{ flexShrink: 0 }}>{chart}</Box>}
      </Box>
    </Card>
  );
}

export default KpiCardLg;
