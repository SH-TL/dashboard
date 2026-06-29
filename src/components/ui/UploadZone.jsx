/**
 * UploadZone 컴포넌트 — 드래그 앤 드롭 파일 업로드 영역
 *
 * Props:
 * @param {function} onUploadComplete - 업로드 완료 후 목록 갱신 콜백 [Required]
 *
 * Example usage:
 * <UploadZone onUploadComplete={fetchFiles} />
 */
import { useRef, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { supabase } from '../../lib/supabase';
import { getExtension, getCategory, buildStoragePath } from '../../lib/fileUtils';

const STATUS = { IDLE: 'idle', UPLOADING: 'uploading', SUCCESS: 'success', ERROR: 'error' };

function UploadZone({ onUploadComplete }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');

  const uploadFile = useCallback(async (file) => {
    setStatus(STATUS.UPLOADING);
    setProgress(10);
    setStatusMessage(`"${file.name}" 업로드 중...`);

    try {
      const ext = getExtension(file.name);
      const category = getCategory(ext);
      const storagePath = buildStoragePath(file.name);

      setProgress(30);

      const { error: storageError } = await supabase.storage
        .from('files')
        .upload(storagePath, file, { upsert: false });

      if (storageError) throw storageError;

      setProgress(70);

      const { error: dbError } = await supabase.from('file_uploads').insert({
        original_name: file.name,
        storage_path: storagePath,
        file_size: file.size,
        mime_type: file.type || null,
        extension: ext,
        category,
      });

      if (dbError) throw dbError;

      setProgress(100);
      setStatus(STATUS.SUCCESS);
      setStatusMessage(`"${file.name}" 업로드 완료!`);
      onUploadComplete();

      setTimeout(() => {
        setStatus(STATUS.IDLE);
        setProgress(0);
        setStatusMessage('');
      }, 2500);
    } catch (err) {
      setStatus(STATUS.ERROR);
      setStatusMessage(`업로드 실패: ${err.message}`);
      setTimeout(() => {
        setStatus(STATUS.IDLE);
        setProgress(0);
        setStatusMessage('');
      }, 3000);
    }
  }, [onUploadComplete]);

  const handleFiles = useCallback((files) => {
    if (!files?.length || status === STATUS.UPLOADING) return;
    uploadFile(files[0]);
  }, [status, uploadFile]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    if (status !== STATUS.UPLOADING) inputRef.current?.click();
  };

  const isUploading = status === STATUS.UPLOADING;
  const isSuccess = status === STATUS.SUCCESS;
  const isError = status === STATUS.ERROR;

  return (
    <Box
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: '2px dashed',
        borderColor: isDragging ? 'primary.main' : isError ? 'error.main' : isSuccess ? 'success.main' : '#C49200',
        borderRadius: '14px',
        p: { xs: 4, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        cursor: isUploading ? 'not-allowed' : 'pointer',
        bgcolor: isDragging ? '#EAB50008' : '#0D040280',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: isUploading ? undefined : 'primary.main',
          bgcolor: isUploading ? undefined : '#EAB50008',
        },
        minHeight: 200,
      }}
    >
      <input
        ref={inputRef}
        type='file'
        style={{ display: 'none' }}
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* 아이콘 */}
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          bgcolor: isSuccess ? '#10B98120' : isError ? '#EF444420' : '#EAB50015',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isSuccess ? (
          <CheckCircleIcon sx={{ fontSize: 32, color: 'success.main' }} />
        ) : isError ? (
          <ErrorIcon sx={{ fontSize: 32, color: 'error.main' }} />
        ) : (
          <CloudUploadIcon sx={{ fontSize: 32, color: 'primary.main' }} />
        )}
      </Box>

      {/* 텍스트 */}
      {!isUploading && !isSuccess && !isError && (
        <>
          <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'text.primary', textAlign: 'center' }}>
            파일을 드래그하거나 클릭해서 업로드
          </Typography>
          <Typography sx={{ fontSize: '0.8125rem', color: 'text.secondary', textAlign: 'center' }}>
            모든 파일 형식 지원 · 최대 100MB
          </Typography>
        </>
      )}

      {isUploading && (
        <>
          <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: 'primary.main', textAlign: 'center' }}>
            {statusMessage}
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 320 }}>
            <LinearProgress
              variant='determinate'
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: '#3A2010',
                '& .MuiLinearProgress-bar': { bgcolor: 'primary.main', borderRadius: 3 },
              }}
            />
          </Box>
          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{progress}%</Typography>
        </>
      )}

      {(isSuccess || isError) && (
        <Typography
          sx={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: isSuccess ? 'success.main' : 'error.main',
            textAlign: 'center',
          }}
        >
          {statusMessage}
        </Typography>
      )}
    </Box>
  );
}

export default UploadZone;
