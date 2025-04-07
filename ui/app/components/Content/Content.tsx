import { Box, Grid2 } from '@mui/material';

export default function Content() {
  return (
    <>
      <Box className='flex justify-between max-w-6xl mx-auto px-6 mt-[120px]'>
        <Box className='flex-1 text-4xl py-6 px-4 leading-tight'>Make <span className='font-bold'>Better</span> Decisions about your care with <span className='font-bold'>Verified</span> Practitioner & Directory Data</Box>
        <Box className='flex-1 text-lg py-6 px-4'>ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea</Box>
      </Box>
      <img src='https://place-hold.it/1000x600/eaeaea' className='block mx-auto mt-32'/>
      <Box className='bg-neutral-200 mt-[120px] h-[320px] text-center text-5xl flex flex-col justify-center'><h3>Bring Clarity and Confidence to Every Decision</h3></Box>
      <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className='max-w-5xl mx-auto mt-[120px]'>
        {Array.from(Array(6)).map((_, index) => (
          <Grid2 key={index} size={{ xs: 2, sm: 4, md: 4 }} className=''>
            <div className='text-center h-[300px] bg-neutral-300 flex flex-col justify-center rounded-lg'><p>{index + 1}</p></div>
          </Grid2>
        ))}
      </Grid2>
      </Box>
    </>
  );
}
