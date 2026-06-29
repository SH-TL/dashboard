import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DownloadIcon from '@mui/icons-material/Download';
import ImageIcon from '@mui/icons-material/Image';
import Box from '@mui/material/Box';

/**
 * ImageCard 컴포넌트
 *
 * Props:
 * @param {string} fileName - 파일명 [Required]
 * @param {string} publicUrl - 이미지 공개 URL [Required]
 * @param {number} size - 파일 크기(bytes) [Optional]
 * @param {string} createdAt - 업로드 일시 ISO 문자열 [Optional]
 *
 * Example usage:
 * <ImageCard fileName="photo.jpg" publicUrl="https://..." size={204800} createdAt="2026-06-24T00:00:00Z" />
 */
function ImageCard({ fileName, publicUrl, size, createdAt }) {
  const formatSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleDownload = async () => {
    const res = await fetch(publicUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 6 },
      }}
    >
      {publicUrl ? (
        <CardMedia
          component='img'
          image={publicUrl}
          alt={fileName}
          sx={{ height: 180, objectFit: 'cover' }}
        />
      ) : (
        <Box
          sx={{
            height: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
          }}
        >
          <ImageIcon sx={{ fontSize: 48, color: 'grey.400' }} />
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1, pb: 0 }}>
        <Typography
          variant='body2'
          fontWeight={600}
          noWrap
          title={fileName}
          sx={{ mb: 0.5 }}
        >
          {fileName}
        </Typography>
        <Typography variant='caption' color='text.secondary'>
          {[formatSize(size), formatDate(createdAt)].filter(Boolean).join(' · ')}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <Tooltip title='다운로드'>
          <IconButton size='small' onClick={handleDownload} color='primary'>
            <DownloadIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default ImageCard;
