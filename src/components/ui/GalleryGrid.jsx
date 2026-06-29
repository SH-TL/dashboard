import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageCard from './ImageCard';

/**
 * GalleryGrid 컴포넌트
 *
 * Props:
 * @param {Array} images - 이미지 데이터 배열 [Required]
 * @param {boolean} isLoading - 로딩 상태 [Optional, 기본값: false]
 *
 * Example usage:
 * <GalleryGrid images={imageList} isLoading={false} />
 */
function GalleryGrid({ images, isLoading = false }) {
  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Skeleton variant='rectangular' height={180} sx={{ borderRadius: 1 }} />
            <Skeleton width='60%' sx={{ mt: 1 }} />
            <Skeleton width='40%' />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!images.length) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 10,
          color: 'text.secondary',
        }}
      >
        <Typography variant='h6' gutterBottom>
          업로드된 이미지가 없습니다
        </Typography>
        <Typography variant='body2'>위의 버튼을 눌러 이미지를 업로드해보세요.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {images.map((img) => (
        <Grid key={img.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ImageCard
            fileName={img.file_name}
            publicUrl={img.publicUrl}
            size={img.size}
            createdAt={img.created_at}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default GalleryGrid;
