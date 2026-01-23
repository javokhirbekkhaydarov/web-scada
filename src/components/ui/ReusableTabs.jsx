import React, { useState } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'

export const ReusableTabs = ({ tabLabels = [], onTabChange, initialTab = 0, width = 'auto', disabledTabs = [] }) => {
  const theme = useTheme()
  const [tab, setTab] = useState(initialTab)

  const handleChange = (event, newValue) => {
    setTab(newValue)

    if (onTabChange) {
      onTabChange(newValue)
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: '#7367F029',
        borderRadius: 2,
        p: '3px',
        width: width === 'auto' ? 'max-content' : width
      }}
    >
      <Tabs
        value={tab}
        onChange={handleChange}
        variant='fullWidth'
        aria-label='reusable tabs'
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
        {tabLabels.map((tabLabel, index) => (
          <Tab
            key={tabLabel}
            label={tabLabel}
            value={index}
            disableRipple
            disabled={disabledTabs[index] || false}
            sx={{
              color: disabledTabs[index] ? '#6B7280' : theme.palette.text.primary,
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
              opacity: disabledTabs[index] ? 0.5 : 1,
              cursor: disabledTabs[index] ? 'not-allowed' : 'pointer',
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
                marginTop: disabledTabs[index] ? '0' : '3px',
                backgroundColor: 'transparent',
                color: disabledTabs[index] ? '#6B7280' : theme.palette.text.primary,
                fontWeight: 400,
                border: 'none !important',
                borderBottom: 'none !important',
                boxShadow: 'none',
                padding: '0 12px',
                minHeight: 40
              },
              '&.Mui-disabled': {
                color: '#6B7280 !important',
                opacity: 0.5
              }
            }}
          />
        ))}
      </Tabs>
    </Box>
  )
}
