/**
 * DonutChart 컴포넌트 — SVG 미니 도넛 차트
 *
 * Props:
 * @param {number} percent - 채워진 비율 (0~100) [Required]
 * @param {string} color - 채워진 색상 [Optional, 기본값: '#EAB500']
 * @param {number} size - SVG 크기(px) [Optional, 기본값: 60]
 *
 * Example usage:
 * <DonutChart percent={72} color="#EAB500" size={60} />
 */
function DonutChart({ percent, color = '#EAB500', size = 60 }) {
  const r = (size - 10) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill='none' stroke='#3A2010' strokeWidth={6} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill='none'
        stroke={color}
        strokeWidth={6}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap='round'
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text
        x={cx}
        y={cy + 1}
        textAnchor='middle'
        dominantBaseline='middle'
        fontSize={11}
        fontWeight={700}
        fill={color}
        fontFamily="'Inter', sans-serif"
      >
        {percent}%
      </text>
    </svg>
  );
}

export default DonutChart;
