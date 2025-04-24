import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar bg-black text-white w-64 h-full p-5">
            <h2 className="text-2xl font-bold mb-5">Generación Privilegiada</h2>
            <ul className="space-y-3">
                <li>
                    <Link to="/profile" className="hover:text-green-500">Profile</Link>
                </li>
                <li>
                    <Link to="/notices" className="hover:text-green-500">Notices</Link>
                </li>
                <li>
                    <Link to="/information" className="hover:text-green-500">Information</Link>
                </li>
                <li>
                    <Link to="/policies" className="hover:text-green-500">Policies</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;