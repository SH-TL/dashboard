/**
 * SalesChart 컴포넌트 — Sales Dynamics 바 차트 카드
 *
 * Props: 없음 (내부 더미 데이터 사용)
 *
 * Example usage:
 * <SalesChart />
 */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const SALES_DATA = [
  { month: 'Jan', value: 65 },
  { month: 'Feb', value: 78 },
  { month: 'Mar', value: 52 },
  { month: 'Apr', value: 90 },
  { month: 'May', value: 71 },
  { month: 'Jun', value: 85 },
  { month: 'Jul', value: 60 },
  { month: 'Aug', value: 95 },
  { month: 'Sep', value: 73 },
  { month: 'Oct', value: 88 },
  { month: 'Nov', value: 67 },
  { month: 'Dec', value: 82 },
];

const CHART_H = 120;
const MAX_VAL = 100;

function SalesChart() {
  return (
    <Card sx={{ p: '20px', height: '100%' }}>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '16px' }}>
        <Box>
          <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'text.primary' }}>
            Sales Dynamics
          </Typography>
          <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary', mt: '2px' }}>
            Monthly revenue trend
          </Typography>
        </Box>
        <Box
          sx={{
            height: 28,
            px: '12px',
            borderRadius: '10px',
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.6875rem',
            color: 'text.secondary',
            cursor: 'pointer',
            '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
          }}
        >
          2026
        </Box>
      </Box>

      {/* 바 차트 (SVG) */}
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <svg
          width='100%'
          height={CHART_H + 28}
          viewBox={`0 0 ${SALES_DATA.length * 28} ${CHART_H + 28}`}
          preserveAspectRatio='xMidYMid meet'
        >
          {SALES_DATA.map((d, i) => {
            const barH = (d.value / MAX_VAL) * CHART_H;
            const x = i * 28 + 4;
            const y = CHART_H - barH;

            return (
              <g key={d.month}>
                <rect
                  x={x}
                  y={y}
                  width={18}
                  height={barH}
                  rx={4}
                  fill={d.value === Math.max(...SALES_DATA.map((s) => s.value)) ? '#EAB500' : '#3A2010'}
                />
                <text
                  x={x + 9}
                  y={CHART_H + 18}
                  textAnchor='middle'
                  fontSize={9}
                  fill='#7A6030'
                  fontFamily="'Inter', sans-serif"
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
      </Box>

      {/* 범례 */}
      <Box sx={{ display: 'flex', gap: '16px', mt: '8px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
          <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary' }}>Peak</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3A2010' }} />
          <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary' }}>Normal</Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default SalesChart;
