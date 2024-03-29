'use client'

import Container from '@/app/components/Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

import { SafeUser } from '@/app/types'
import Categories from './Categories'

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div
        className='
          py-4
          border-b-[1px]
        '
      >
        <Container>
          <div
            className='
              flex
              flex-row
              items-center
              justify-between
              gap-3
              md:gap-0
            '
          >
            <div className='flex-1'>
              <Logo />
            </div>
            <Search />
            <div className='flex-1'>
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar
