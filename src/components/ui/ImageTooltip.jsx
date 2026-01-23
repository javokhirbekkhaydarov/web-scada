'use client'
import React from 'react'

import { Tooltip, Box } from '@mui/material'

const ImageTooltip = ({ src, alt = '', children, maxWidth = 400, maxHeight = 400, placement = 'top', ...props }) => {
  return (
    <Tooltip
      title={
        <Box
          component='img'
          src={src}
          alt={alt}
          sx={{
            maxWidth,
            maxHeight,
            objectFit: 'cover',
            borderRadius: 2
          }}
        />
      }
      placement={placement}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'background.paper',
            boxShadow: 3,
            border: '1px solid',
            borderColor: 'divider',
            p: 0
          }
        }
      }}
      {...props}
    >
      {children}
    </Tooltip>
  )
}

export default ImageTooltip
