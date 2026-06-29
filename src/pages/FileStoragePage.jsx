import { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloudIcon from '@mui/icons-material/Cloud';
import InboxIcon from '@mui/icons-material/Inbox';
import { supabase } from '../lib/supabase';
import Sidebar from '../components/common/Sidebar';
import TopBar from '../components/common/TopBar';
import UploadZone from '../components/ui/UploadZone';
import CategoryTabs from '../components/ui/CategoryTabs';
import FileCard from '../components/ui/FileCard';

function FileStoragePage() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const handleSelect = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedIds(new Set(filteredFiles.map((f) => f.id)));
  }, [filteredFiles]);

  const handleBulkDownload = useCallback(async () => {
    if (selectedIds.size === 0) return;
    const targets = filteredFiles.filter((f) => selectedIds.has(f.id));
    for (const file of targets) {
      try {
        const { data, error } = await supabase.storage.from('files').download(file.storage_path);
        if (error) throw error;
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.original_name;
        a.click();
        URL.revokeObjectURL(url);
        await new Promise((resolve) => setTimeout(resolve, 150));
      } catch (err) {
        console.error('다운로드 실패:', err);
      }
    }
  }, [filteredFiles, selectedIds]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const fetchFiles = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('file_uploads')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setFiles(data);
      setSelectedIds(new Set());
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const filteredFiles = useMemo(() => {
    if (activeTab === 'all') return files;
    return files.filter((f) => f.category === activeTab);
  }, [files, activeTab]);

  const counts = useMemo(() => ({
    all: files.length,
    document: files.filter((f) => f.category === 'document').length,
    image: files.filter((f) => f.category === 'image').length,
    archive: files.filter((f) => f.category === 'archive').length,
    other: files.filter((f) => f.category === 'other').length,
  }), [files]);

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 사이드바 — 데스크톱 */}
      {!isMobile && <Sidebar />}

      {/* 사이드바 — 모바일 Drawer */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 220, bgcolor: 'background.paper', border: 'none' },
        }}
      >
        <Sidebar onClose={() => setMobileOpen(false)} />
      </Drawer>

      {/* 메인 영역 */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* 탑바 */}
        <Box sx={{ position: 'relative' }}>
          {isMobile && (
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'text.secondary', zIndex: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <TopBar title='File Storage' />
        </Box>

        {/* 콘텐츠 */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Container maxWidth='lg' sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, md: 3 } }}>

            {/* 헤더 */}
            <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1.5 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    bgcolor: '#EAB50020',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CloudIcon sx={{ fontSize: 22, color: 'primary.main' }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: { xs: '1.375rem', md: '1.75rem' },
                    fontWeight: 700,
                    color: 'primary.main',
                    letterSpacing: '0.05em',
                  }}
                >
                  TENET Storage
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', maxWidth: 440, mx: 'auto' }}>
                파일을 업로드하고 공유하세요. 문서, 이미지, 압축파일 등 모든 형식을 지원합니다.
              </Typography>
            </Box>

            {/* 업로드 영역 */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <UploadZone onUploadComplete={fetchFiles} />
            </Box>

            {/* 파일 수 요약 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'text.primary' }}>
                업로드된 파일
              </Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>
                {isLoading ? '불러오는 중...' : `총 ${files.length}개`}
              </Typography>
            </Box>

            {/* 카테고리 탭 + 전체선택/다운로드 버튼 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
              <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} counts={counts} />
              <Box sx={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <Button
                  size='small'
                  onClick={handleSelectAll}
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    height: 32,
                    px: '12px',
                    border: '1px solid',
                    borderColor: '#3A2010',
                    color: 'text.secondary',
                    bgcolor: 'transparent',
                    '&:hover': { borderColor: 'primary.main', color: 'primary.main', bgcolor: '#EAB50010' },
                  }}
                >
                  전체 선택
                </Button>
                <Button
                  size='small'
                  onClick={handleBulkDownload}
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    height: 32,
                    px: '12px',
                    bgcolor: selectedIds.size > 0 ? 'primary.main' : '#1E0E04',
                    color: selectedIds.size > 0 ? '#180805' : '#5A3A20',
                    boxShadow: 'none',
                    cursor: selectedIds.size > 0 ? 'pointer' : 'default',
                    transition: 'background-color 0.2s, color 0.2s',
                    '&:hover': {
                      bgcolor: selectedIds.size > 0 ? '#F5C420' : '#1E0E04',
                      boxShadow: 'none',
                    },
                  }}
                >
                  다운로드
                </Button>
              </Box>
            </Box>

            {/* 파일 목록 */}
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress size={36} sx={{ color: 'primary.main' }} />
              </Box>
            ) : filteredFiles.length === 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, gap: 2 }}>
                <InboxIcon sx={{ fontSize: 56, color: '#3A2010' }} />
                <Typography sx={{ fontSize: '0.9375rem', color: 'text.secondary' }}>
                  {activeTab === 'all' ? '업로드된 파일이 없습니다.' : '해당 카테고리에 파일이 없습니다.'}
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={{ xs: '10px', md: '16px' }}>
                {filteredFiles.map((file) => (
                  <Grid key={file.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <FileCard
                      file={file}
                      onDelete={fetchFiles}
                      isSelected={selectedIds.has(file.id)}
                      onSelect={handleSelect}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default FileStoragePage;
