/**
 * OrderTable 컴포넌트 — Customer Order 데이터 테이블
 *
 * Props: 없음 (내부 더미 데이터 사용)
 *
 * Example usage:
 * <OrderTable />
 */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

const ORDERS = [
  { id: '#ORD-8821', name: 'Kim Soo-hyun', avatar: 'KS', date: '2026-06-25', amount: '$412.00', status: 'Delivered' },
  { id: '#ORD-8820', name: 'Park Ji-woo', avatar: 'PJ', date: '2026-06-24', amount: '$890.50', status: 'Processed' },
  { id: '#ORD-8819', name: 'Lee Min-jun', avatar: 'LM', date: '2026-06-24', amount: '$55.00', status: 'Cancelled' },
  { id: '#ORD-8818', name: 'Choi Ye-rin', avatar: 'CY', date: '2026-06-23', amount: '$1,230.00', status: 'Delivered' },
  { id: '#ORD-8817', name: 'Jung Hae-in', avatar: 'JH', date: '2026-06-22', amount: '$330.75', status: 'Processed' },
  { id: '#ORD-8816', name: 'Oh Se-jin', avatar: 'OS', date: '2026-06-21', amount: '$78.20', status: 'Delivered' },
];

const STATUS_STYLE = {
  Delivered: { bgcolor: '#10B98120', color: '#10B981' },
  Processed: { bgcolor: '#6070C820', color: '#8090E0' },
  Cancelled: { bgcolor: '#EF444420', color: '#EF4444' },
};

function OrderTable() {
  return (
    <Card sx={{ p: 0, overflow: 'hidden' }}>
      {/* 헤더 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: '20px',
          pt: '20px',
          pb: '12px',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'text.primary' }}>
            Customer Orders
          </Typography>
          <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary', mt: '2px' }}>
            Recent {ORDERS.length} transactions
          </Typography>
        </Box>
        <Box
          sx={{
            height: 28,
            px: '12px',
            borderRadius: '10px',
            border: '1px solid',
            borderColor: 'primary.dark',
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.6875rem',
            fontWeight: 600,
            color: 'primary.main',
            cursor: 'pointer',
            '&:hover': { bgcolor: '#EAB50010' },
          }}
        >
          View All
        </Box>
      </Box>

      {/* 테이블 */}
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Date</TableCell>
              <TableCell align='right'>Amount</TableCell>
              <TableCell align='center'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ORDERS.map((row) => {
              const badgeStyle = STATUS_STYLE[row.status] || STATUS_STYLE.Processed;
              return (
                <TableRow
                  key={row.id}
                  hover
                  sx={{ '&:last-child td': { borderBottom: 0 }, '&:hover': { bgcolor: '#3A201015' } }}
                >
                  {/* 고객 */}
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          bgcolor: 'primary.dark',
                          color: '#F0EAD8',
                        }}
                      >
                        {row.avatar}
                      </Avatar>
                      <Typography sx={{ fontSize: '0.8125rem', fontWeight: 500, color: 'text.primary' }}>
                        {row.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* 주문 ID */}
                  <TableCell>
                    <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', fontFamily: 'monospace' }}>
                      {row.id}
                    </Typography>
                  </TableCell>

                  {/* 날짜 */}
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <Typography sx={{ fontSize: '0.75rem', color: 'text.disabled' }}>
                      {row.date}
                    </Typography>
                  </TableCell>

                  {/* 금액 */}
                  <TableCell align='right'>
                    <Typography sx={{ fontSize: '0.8125rem', fontWeight: 600, color: 'primary.main' }}>
                      {row.amount}
                    </Typography>
                  </TableCell>

                  {/* 상태 뱃지 */}
                  <TableCell align='center'>
                    <Chip
                      label={row.status}
                      size='small'
                      sx={{
                        bgcolor: badgeStyle.bgcolor,
                        color: badgeStyle.color,
                        borderRadius: '999px',
                        fontWeight: 600,
                        fontSize: '0.6875rem',
                        height: 24,
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default OrderTable;
