import React from 'react'
import Link from 'next/link'
import ThemeToggle from '@/app/components/ThemeToggle'

const Header = () => {
    return (
        <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-10">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Country Dashboard</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><ThemeToggle /></li>
                </ul>
            </div>
        </div>
    )
}

export default Header