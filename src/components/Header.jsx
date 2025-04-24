import React from 'react';

const Header = () => {
    return (
        <header className="bg-black text-white flex justify-between items-center p-4">
            <div className="text-2xl font-bold">Generación Privilegiada</div>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="/profile" className="hover:text-green-500">Profile</a></li>
                    <li><a href="/login" className="hover:text-green-500">Login</a></li>
                    <li><a href="/logout" className="hover:text-green-500">Logout</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;