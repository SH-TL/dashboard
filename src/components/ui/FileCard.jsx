/**
 * FileCard 컴포넌트 — 업로드된 파일 카드
 *
 * Props:
 * @param {object} file - 파일 메타데이터 객체 [Required]
 * @param {function} onDelete - 삭제 완료 후 목록 갱신 콜백 [Required]
 * @param {boolean} isSelected - 체크박스 선택 여부 [Optional, 기본값: false]
 * @param {function} onSelect - 체크박스 클릭 핸들러 (id) => void [Optional]
 *
 * Example usage:
 * <FileCard file={fileObj} onDelete={fetchFiles} isSelected={false} onSelect={(id) => toggle(id)} />
 */
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import ArchiveIcon from '@mui/icons-material/Archive';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import { supabase } from '../../lib/supabase';
import { formatFileSize, formatDate } from '../../lib/fileUtils';

const CATEGORY_ICON = {
  document: <ArticleIcon sx={{ fontSize: 28, color: '#EAB500' }} />,
  image: <ImageIcon sx={{ fontSize: 28, color: '#8090E0' }} />,
  archive: <ArchiveIcon sx={{ fontSize: 28, color: '#10B981' }} />,
  other: <InsertDriveFileIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />,
};

const CATEGORY_LABEL = {
  document: '문서',
  image: '이미지',
  archive: '압축파일',
  other: '기타',
};

const CATEGORY_COLOR = {
  document: { bg: '#EAB50015', color: '#EAB500' },
  image: { bg: '#6070C820', color: '#8090E0' },
  archive: { bg: '#10B98120', color: '#10B981' },
  other: { bg: '#9CA3AF20', color: '#9CA3AF' },
};

function FileCard({ file, onDelete, isSelected = false, onSelect }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const icon = file.extension === 'pdf'
    ? <DescriptionIcon sx={{ fontSize: 28, color: '#EF4444' }} />
    : CATEGORY_ICON[file.category] || CATEGORY_ICON.other;

  const catColor = CATEGORY_COLOR[file.category] || CATEGORY_COLOR.other;

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const { data, error } = await supabase.storage.from('files').download(file.storage_path);
      if (error) throw error;
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.original_name;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('다운로드 실패:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await supabase.storage.from('files').remove([file.storage_path]);
      await supabase.from('file_uploads').delete().eq('id', file.id);
      onDelete();
    } catch (err) {
      console.error('삭제 실패:', err);
      setIsDeleting(false);
    }
  };

  return (
    <Card
      sx={{
        p: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        height: '100%',
        transition: 'border-color 0.15s',
        borderColor: isSelected ? 'primary.main' : undefined,
        '&:hover': { borderColor: isSelected ? 'primary.light' : '#C49200' },
      }}
    >
      {/* 상단: 체크박스 + 아이콘 + 카테고리 태그 */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox
            checked={isSelected}
            onChange={() => onSelect?.(file.id)}
            size='small'
            sx={{
              p: 0,
              color: '#3A2010',
              '&.Mui-checked': { color: 'primary.main' },
              '&:hover': { bgcolor: 'transparent' },
            }}
          />
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '10px',
              bgcolor: catColor.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
        <Chip
          label={CATEGORY_LABEL[file.category] || '기타'}
          size='small'
          sx={{
            height: 20,
            fontSize: '0.625rem',
            fontWeight: 600,
            bgcolor: catColor.bg,
            color: catColor.color,
            borderRadius: '999px',
            '& .MuiChip-label': { px: '8px' },
          }}
        />
      </Box>

      {/* 파일명 */}
      <Box sx={{ flex: 1 }}>
        <Tooltip title={file.original_name} placement='top'>
          <Typography
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              mb: '4px',
            }}
          >
            {file.original_name}
          </Typography>
        </Tooltip>
        <Typography sx={{ fontSize: '0.6875rem', color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          .{file.extension || '—'}
        </Typography>
      </Box>

      {/* 메타 정보 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'primary.main' }}>
            {formatFileSize(file.file_size)}
          </Typography>
          <Typography sx={{ fontSize: '0.6875rem', color: 'text.disabled', mt: '2px' }}>
            {formatDate(file.created_at)}
          </Typography>
        </Box>

        {/* 액션 버튼 */}
        <Box sx={{ display: 'flex', gap: '4px' }}>
          <Tooltip title='다운로드'>
            <IconButton
              size='small'
              onClick={handleDownload}
              disabled={isDownloading}
              sx={{
                color: 'primary.main',
                bgcolor: '#EAB50015',
                '&:hover': { bgcolor: '#EAB50025' },
                width: 32,
                height: 32,
              }}
            >
              <DownloadIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Tooltip title='삭제'>
            <IconButton
              size='small'
              onClick={handleDelete}
              disabled={isDeleting}
              sx={{
                color: 'error.main',
                bgcolor: '#EF444415',
                '&:hover': { bgcolor: '#EF444425' },
                width: 32,
                height: 32,
              }}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
}

export default FileCard;
