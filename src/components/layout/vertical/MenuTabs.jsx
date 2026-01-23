import React, { useState } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'

const tabLabels = ['WB', 'OZ', 'YM']
const marketplaceValues = ['wb', 'oz', 'ym']

export const MenuTabs = ({ onMarketplaceChange }) => {
  const [tab, setTab] = useState(0)
  const theme = useTheme()

  const handleChange = (event, newValue) => {
    setTab(newValue)
    onMarketplaceChange(marketplaceValues[newValue]) 
  }

  return (
    <Box
      sx={{
        backgroundColor: '#7367F029',
        borderRadius: 2,
        p: '3px'
      }}
    >
      <Tabs
        value={tab}
        onChange={handleChange}
        variant='fullWidth'
        aria-label='add buyout tabs'
        TabIndicatorProps={{
          style: {
            background: '#7367F0',
            borderRadius: 12,
            height: 40,
            zIndex: 1,
            transition: 'all 0.3s cubic-bezier(.47,1.64,.41,.8)'
          }
        }}
        sx={{
          minHeight: 40,
          borderRadius: 2,
          p: '3px',
          border: 'none',
          boxShadow: 'none',
          '& .MuiTabs-indicator': {},
          '& .MuiTabs-flexContainer': {
            border: 'none',
            height: 40
          }
        }}
      >
        {tabLabels.map((label, index) => (
          <Tab
            key={label}
            label={label}
            disableRipple
            sx={{
              color: theme.palette.text.primary,
              zIndex: 2,
              fontWeight: 400,
              lineHeight: 1.2,
              height: 40,
              minHeight: 40,
              padding: '0 12px',
              minWidth: 'max-content',
              textTransform: 'none',
              borderRadius: 2,
              backgroundColor: 'transparent',
              border: 'none !important',
              borderBottom: 'none !important',
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&.Mui-selected': {
                color: 'white !important',
                backgroundColor: '#7367F0',
                fontWeight: 400,
                border: 'none !important',
                borderBottom: 'none !important',
                boxShadow: '0px 2px 6px 0px #7367F04D',
                padding: '0 12px',
                minHeight: 40
              },
              '&:hover': {
                marginTop: '3px',
                backgroundColor: 'transparent',
                color: theme.palette.text.primary,
                fontWeight: 400,
                border: 'none !important',
                borderBottom: 'none !important',
                boxShadow: 'none',
                padding: '0 12px',
                minHeight: 40
              }
            }}
          />
        ))}
      </Tabs>
    </Box>
  )
}
