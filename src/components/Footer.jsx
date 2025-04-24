import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-4">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Generación Privilegiada. All rights reserved.
                </p>
                <div className="mt-2">
                    <a href="/about" className="text-green-500 hover:text-green-300 mx-2">About</a>
                    <a href="/contact" className="text-green-500 hover:text-green-300 mx-2">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;