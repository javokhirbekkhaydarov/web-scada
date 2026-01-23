import { cloneElement } from 'react'

import { useTheme } from '@mui/material/styles'

import PerfectScrollbar from 'react-perfect-scrollbar'

import { Menu, MenuItem, SubMenu } from '@menu/vertical-menu'

import useVerticalNav from '@menu/hooks/useVerticalNav'

import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const DisabledSubMenu = ({ label, icon, suffix, children, ...props }) => {
  const clonedChildren = children.map((child, index) => {
    if (child && child.type && child.type.displayName === 'MenuItem') {
      return cloneElement(child, {
        ...child.props,
        disabled: true,
        key: child.key || index
      })
    }

    return child
  })

  return (
    <SubMenu label={label} icon={icon} suffix={suffix} {...props}>
      {clonedChildren}
    </SubMenu>
  )
}

const VerticalMenu = ({ scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()

  // Vars
  const { isBreakpointReached, transitionDuration, isOpen } = verticalNavOptions // isOpen holatini qo'shdik
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='text-xs tabler-circle' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >

        <MenuItem href='/dashboards' icon={<i className='tabler-smart-home' />}>
          Панель
        </MenuItem>

        <MenuItem href='/accounts' icon={<i className='tabler-users-group' />}>
          Аккаунты
        </MenuItem>
        <MenuItem
          href='#'
          icon={<i className='tabler-user-up' />}
          suffix={<i className='tabler-lock' />}
          disabled={true}
        >
          Прогрев Аккаунтов
        </MenuItem>

        {/*<SubMenu label='Получение' icon={<i className='tabler-truck-delivery' />}>*/}
        {/*  <MenuItem href='/receiving' icon={<i className='tabler-truck-delivery' />}>*/}
        {/*    Заказы*/}
        {/*  </MenuItem>*/}
        {/*  <MenuItem href='/receiving/tasks' icon={<i className='tabler-list-check' />}>*/}
        {/*    Задачи*/}
        {/*  </MenuItem>*/}

        {/*  <MenuItem href='/settings?tab=receive' icon={<i className='tabler-adjustments-horizontal' />}>*/}
        {/*    Настройки*/}
        {/*  </MenuItem>*/}
        {/*</SubMenu>*/}


        {/*<DisabledSubMenu label='Репутация' icon={<i className='tabler-award' />} suffix={<i className='tabler-lock' />}>*/}
        {/*  <MenuItem href='#' disabled icon={<i className='tabler-eye' />}>*/}
        {/*    Посещения*/}
        {/*  </MenuItem>*/}
        {/*  <MenuItem href='#' disabled icon={<i className='tabler-basket-star' />}>*/}
        {/*    Корзина*/}
        {/*  </MenuItem>*/}
        {/*  <MenuItem href='#' disabled icon={<i className='tabler-message-heart' />}>*/}
        {/*    Лайки на Отзывы*/}
        {/*  </MenuItem>*/}
        {/*  <MenuItem href='#' disabled icon={<i className='tabler-star' />}>*/}
        {/*    Избранное*/}
        {/*  </MenuItem>*/}
        {/*  <MenuItem href='#' disabled icon={<i className='tabler-heart' />}>*/}
        {/*    Любимый Бренд*/}
        {/*  </MenuItem>*/}
        {/*</DisabledSubMenu>*/}


      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
