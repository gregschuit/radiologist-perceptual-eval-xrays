import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './style.css';

export default function LoadingSpinner() {
  return (
    <Box className='spinner-container'>
      <CircularProgress />
    </Box>
  );
}
