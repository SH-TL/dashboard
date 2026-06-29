/**
 * CategoryTabs 컴포넌트 — 파일 카테고리 필터 탭
 *
 * Props:
 * @param {string} activeTab - 현재 활성 탭 키 [Required]
 * @param {function} onTabChange - 탭 변경 핸들러 [Required]
 * @param {object} counts - 카테고리별 파일 수 { all, document, image, archive, other } [Optional]
 *
 * Example usage:
 * <CategoryTabs activeTab="all" onTabChange={setTab} counts={{ all: 10 }} />
 */
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import ArchiveIcon from '@mui/icons-material/Archive';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const TABS = [
  { key: 'all', label: '전체', icon: <FolderIcon fontSize='small' /> },
  { key: 'document', label: '문서', icon: <ArticleIcon fontSize='small' /> },
  { key: 'image', label: '이미지', icon: <ImageIcon fontSize='small' /> },
  { key: 'archive', label: '압축파일', icon: <ArchiveIcon fontSize='small' /> },
  { key: 'other', label: '기타', icon: <InsertDriveFileIcon fontSize='small' /> },
];

function CategoryTabs({ activeTab, onTabChange, counts = {} }) {
  return (
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        mb: 3,
      }}
    >
      <Tabs
        value={activeTab}
        onChange={(_, v) => onTabChange(v)}
        variant='scrollable'
        scrollButtons='auto'
        sx={{
          '& .MuiTabs-indicator': { bgcolor: 'primary.main', height: 2 },
          '& .MuiTab-root': {
            color: 'text.secondary',
            fontSize: '0.875rem',
            fontWeight: 500,
            textTransform: 'none',
            minHeight: 48,
            gap: '6px',
            '&.Mui-selected': { color: 'primary.main' },
          },
        }}
      >
        {TABS.map((tab) => (
          <Tab
            key={tab.key}
            value={tab.key}
            icon={tab.icon}
            iconPosition='start'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {tab.label}
                {counts[tab.key] !== undefined && counts[tab.key] > 0 && (
                  <Chip
                    label={counts[tab.key]}
                    size='small'
                    sx={{
                      height: 18,
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      bgcolor: activeTab === tab.key ? '#EAB50025' : '#3A2010',
                      color: activeTab === tab.key ? 'primary.main' : 'text.secondary',
                      '& .MuiChip-label': { px: '6px' },
                    }}
                  />
                )}
              </Box>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default CategoryTabs;
