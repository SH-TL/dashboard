import { useCallback, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CollectionsIcon from '@mui/icons-material/Collections';
import { supabase } from '../lib/supabase';
import UploadButton from '../components/ui/UploadButton';
import GalleryGrid from '../components/ui/GalleryGrid';

function DashboardPage() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from('image_files')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      setIsLoading(false);
      return;
    }

    const imagesWithUrl = data.map((row) => {
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(row.storage_path);
      return { ...row, publicUrl: urlData?.publicUrl ?? null };
    });

    setImages(imagesWithUrl);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth='xl' sx={{ py: { xs: 3, md: 5 } }}>
        {/* 헤더 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <CollectionsIcon color='primary' sx={{ fontSize: 32 }} />
            <Box>
              <Typography variant='h5' fontWeight={700} lineHeight={1.2}>
                이미지 갤러리
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {isLoading ? '불러오는 중...' : `총 ${images.length}개`}
              </Typography>
            </Box>
          </Box>
          <UploadButton onUploadComplete={fetchImages} />
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* 갤러리 */}
        <GalleryGrid images={images} isLoading={isLoading} />
      </Container>
    </Box>
  );
}

export default DashboardPage;
