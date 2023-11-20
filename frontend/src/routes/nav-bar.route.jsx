import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Outlet } from 'react-router-dom'
import Logo from '../../public/logo.svg'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = () => {
    return (
        <Fragment>
            <div className="min-h-full">
                <nav class="border-gray-200 py-4">
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
                        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src={Logo} class="h-32" alt="Blogs Logo" />
                            <span class="self-center text-5xl font-extrabold whitespace-nowrap">Blogs</span>
                        </a>
                    </div>
                </nav>
                <main className='px-36 pt-10'>
                    <Outlet/>
                </main>
            </div>
            
            
        </Fragment>      
        
    );
}

export default NavBar;