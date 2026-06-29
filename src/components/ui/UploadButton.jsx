import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { supabase } from '../../lib/supabase';

/**
 * UploadButton 컴포넌트
 *
 * Props:
 * @param {function} onUploadComplete - 업로드 완료 후 호출되는 콜백 [Required]
 *
 * Example usage:
 * <UploadButton onUploadComplete={refreshGallery} />
 */
function UploadButton({ onUploadComplete }) {
  const inputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    let successCount = 0;

    for (const file of files) {
      const storagePath = `${Date.now()}_${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(storagePath, file, { upsert: false });

      if (uploadError) {
        setSnackbar({ open: true, message: `업로드 실패: ${file.name}`, severity: 'error' });
        continue;
      }

      await supabase.from('image_files').insert({
        file_name: file.name,
        storage_path: storagePath,
        size: file.size,
        mime_type: file.type,
      });

      successCount++;
    }

    setIsUploading(false);
    if (inputRef.current) inputRef.current.value = '';

    if (successCount > 0) {
      setSnackbar({ open: true, message: `${successCount}개 파일 업로드 완료!`, severity: 'success' });
      onUploadComplete();
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        multiple
        hidden
        onChange={handleFileChange}
      />
      <Button
        variant='contained'
        startIcon={isUploading ? <CircularProgress size={18} color='inherit' /> : <UploadFileIcon />}
        onClick={() => !isUploading && inputRef.current?.click()}
        disabled={isUploading}
        sx={{ px: 3 }}
      >
        {isUploading ? '업로드 중...' : '이미지 업로드'}
      </Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default UploadButton;
