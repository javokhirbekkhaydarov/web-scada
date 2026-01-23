'use client'
import { useEffect, useState } from 'react'

import InputAdornment from '@mui/material/InputAdornment'

// Third-party Imports
import classnames from 'classnames'

// Component Imports

import NavToggle from './NavToggle'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'

import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const NavbarContent = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className={classnames(verticalLayoutClasses.navbarContent, 'flex items-center justify-between gap-4 is-full')}>
      <div className='flex items-center gap-4 w-full'>
        <NavToggle />
        <div className='flex items-center justify-between flex-grow w-full '>
          <div className='flex-grow'>
            <CustomTextField
              id='input-with-icon-adornment'
              className='min-w-[200px] w-1/3'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <i className='tabler-search' />
                  </InputAdornment>
                )
              }}
            />
          </div>
          <ModeDropdown />
          <div className='flex items-center'>
            <UserDropdown />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarContent
