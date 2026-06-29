/**
 * ActivityChart 컴포넌트 — Overall User Activity 라인 차트 카드
 *
 * Props: 없음 (내부 더미 데이터 사용)
 *
 * Example usage:
 * <ActivityChart />
 */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const ACTIVITY_DATA = [30, 45, 38, 62, 44, 70, 55, 80, 65, 88, 72, 95];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const W = 300;
const H = 120;
const MAX_VAL = 100;
const PADDING = { left: 10, right: 10, top: 10, bottom: 10 };

function buildPath(data) {
  const innerW = W - PADDING.left - PADDING.right;
  const innerH = H - PADDING.top - PADDING.bottom;
  const step = innerW / (data.length - 1);

  const points = data.map((v, i) => ({
    x: PADDING.left + i * step,
    y: PADDING.top + innerH - (v / MAX_VAL) * innerH,
  }));

  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  const areaD =
    `M${points[0].x},${H - PADDING.bottom} ` +
    points.map((p) => `L${p.x},${p.y}`).join(' ') +
    ` L${points[points.length - 1].x},${H - PADDING.bottom} Z`;

  return { linePath: d, areaPath: areaD, points };
}

function ActivityChart() {
  const { linePath, areaPath, points } = buildPath(ACTIVITY_DATA);

  return (
    <Card sx={{ p: '20px', height: '100%' }}>
      {/* 헤더 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '16px' }}>
        <Box>
          <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'text.primary' }}>
            User Activity
          </Typography>
          <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary', mt: '2px' }}>
            Overall engagement trend
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
            '&:hover': { borderColor: 'secondary.main', color: 'secondary.main' },
          }}
        >
          2026
        </Box>
      </Box>

      {/* 라인 차트 (SVG) */}
      <Box sx={{ width: '100%' }}>
        <svg
          width='100%'
          height={H + 20}
          viewBox={`0 0 ${W} ${H + 20}`}
          preserveAspectRatio='xMidYMid meet'
        >
          <defs>
            <linearGradient id='activityGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#6070C8' stopOpacity={0.35} />
              <stop offset='100%' stopColor='#6070C8' stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* 격자 */}
          {[25, 50, 75].map((v) => {
            const y = PADDING.top + (H - PADDING.top - PADDING.bottom) - (v / MAX_VAL) * (H - PADDING.top - PADDING.bottom);
            return (
              <line
                key={v}
                x1={PADDING.left}
                y1={y}
                x2={W - PADDING.right}
                y2={y}
                stroke='#3A2010'
                strokeWidth={1}
                strokeDasharray='4 4'
              />
            );
          })}

          {/* 면적 */}
          <path d={areaPath} fill='url(#activityGradient)' />

          {/* 라인 */}
          <path d={linePath} fill='none' stroke='#6070C8' strokeWidth={2} strokeLinejoin='round' />

          {/* 포인트 */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={3} fill='#6070C8' stroke='#0D0402' strokeWidth={1.5} />
          ))}

          {/* X축 레이블 */}
          {MONTHS.map((m, i) => {
            const x = PADDING.left + (i / (ACTIVITY_DATA.length - 1)) * (W - PADDING.left - PADDING.right);
            return (
              <text
                key={m}
                x={x}
                y={H + 15}
                textAnchor='middle'
                fontSize={8}
                fill='#7A6030'
                fontFamily="'Inter', sans-serif"
              >
                {m}
              </text>
            );
          })}
        </svg>
      </Box>

      {/* 하단 수치 요약 */}
      <Box sx={{ display: 'flex', gap: '20px', mt: '8px' }}>
        <Box>
          <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary' }}>Peak</Typography>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: 'secondary.main' }}>95</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary' }}>Avg</Typography>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: 'text.primary' }}>
            {Math.round(ACTIVITY_DATA.reduce((a, b) => a + b, 0) / ACTIVITY_DATA.length)}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary' }}>Growth</Typography>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: 'success.main' }}>+216%</Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default ActivityChart;
