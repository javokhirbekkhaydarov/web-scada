'use client'

// React Imports
import { useEffect, useRef } from 'react'

// Third-party Imports
import Link from 'next/link'

import styled from '@emotion/styled'

// Component Imports
import VuexyLogo from '@core/svg/Logo'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'

const LogoText = styled.span`
  color: ${({ color }) => color ?? 'var(--mui-palette-text-primary)'};
  font-size: 1.375rem;
  line-height: 1.09091;
  font-weight: 700;
  letter-spacing: 0.25px;
  transition: ${({ transitionDuration }) =>
    `margin-inline-start ${transitionDuration}ms ease-in-out, opacity ${transitionDuration}ms ease-in-out`};

  ${({ isHovered, isCollapsed, isBreakpointReached }) =>
    !isBreakpointReached && isCollapsed && !isHovered
      ? 'opacity: 0; margin-inline-start: 0;'
      : 'opacity: 1; margin-inline-start: 12px;'}
`

const Logo = ({ color }) => {
  // Refs
  const logoTextRef = useRef(null)

  // Hooks
  const { isHovered, transitionDuration, isBreakpointReached } = useVerticalNav()
  const { settings } = useSettings()

  // Vars
  const { layout } = settings

  useEffect(() => {
    if (layout !== 'collapsed') {
      return
    }

    if (logoTextRef && logoTextRef.current) {
      if (!isBreakpointReached && layout === 'collapsed' && !isHovered) {
        logoTextRef.current?.classList.add('hidden')
      } else {
        logoTextRef.current.classList.remove('hidden')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, layout, isBreakpointReached])

  return (
    <div className='flex items-center w-full'>
      <Link href={'/'} className='flex items-center'>
        <div className='flex items-center'>
          {/*<VuexyLogo className='text-2xl text-primary' />*/}
          <LogoText
            color={color}
            ref={logoTextRef}
            isHovered={isHovered}
            isCollapsed={layout === 'collapsed'}
            transitionDuration={transitionDuration}
            isBreakpointReached={isBreakpointReached}
          >
            {themeConfig.templateName}
          </LogoText>
        </div>
      </Link>

      {/*{layout !== 'collapsed' && (*/}
      {/*  <div className={'ml-8 relative'}>*/}
      {/*    <i className='tabler-bell z-0  relative' />*/}
      {/*    <span className='absolute w-2 h-2 rounded-full bg-[#FF4C51] border border-[#25293C] top-1 right-1'></span>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}

export default Logo
