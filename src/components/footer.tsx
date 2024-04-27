"use client";
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';


export default function CustomFooter() {
  const [color, setColor] = React.useState<ColorPaletteProp>('primary');
  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        flexGrow: 1,
        display: 'flex',
        bgcolor: color === 'primary' ? '#042449' : undefined,
        p: { xs: '36px', md: '70px' },
        pt: { xs: '24px', md: '60px' },
        overflow: 'hidden',
        '& button': { borderRadius: 'xl' },
        color:'white'
      }}
    >
      <Box sx={{ zIndex: 1, position: 'relative' }}>
        <Typography level="h2" sx={{ color:'white'}}>PDF-QR Generator</Typography>
        <Typography sx={{ mt: 0.5, mb: 2, color:'white' }}>
          A Dynamic platform where you can generate a QR code from your PDF.
        </Typography>
        <Typography sx={{ color:'white'}}>Created By Emon | Copyright owner &copy; Emon</Typography>
      </Box>
      <Box
        component="img"
        alt=""
        src="https://storage.googleapis.com/cms-storage-bucket/72521e62275b24d3c37d.png"
        sx={{ position: 'absolute', height: '100%', top: 0, right: 0 }}
      />
    </Sheet>
  );
}
