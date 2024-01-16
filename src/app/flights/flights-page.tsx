// ======= mui ======= //
import { Stack } from '@mui/material';

// ======= components ======= //
import FlightsSearch from './components/flights-search';
import PathsList from './components/Paths-list';

export default function FlightsPage() {

  return (
    <Stack className='page-stack'>
      <FlightsSearch />
      <PathsList />
    </Stack>
  );
}