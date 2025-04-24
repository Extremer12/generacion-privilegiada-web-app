import React from 'react';

const Home = () => {
    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold mt-10">Welcome to Generación Privilegiada</h1>
            <input 
                type="text" 
                placeholder="Search for songs..." 
                className="mt-5 p-2 rounded bg-gray-800 text-white placeholder-gray-500"
            />
            <div className="mt-5 flex flex-wrap justify-center">
                <button className="m-2 p-2 bg-green-500 rounded">Category 1</button>
                <button className="m-2 p-2 bg-purple-500 rounded">Category 2</button>
                <button className="m-2 p-2 bg-gold-500 rounded">Category 3</button>
            </div>
            <div className="mt-10 w-full max-w-4xl">
                <h2 className="text-2xl font-semibold">Available Songs</h2>
                <ul className="mt-5">
                    {/* Example song list */}
                    <li className="p-2 bg-gray-800 rounded mb-2">Song Title 1</li>
                    <li className="p-2 bg-gray-800 rounded mb-2">Song Title 2</li>
                    <li className="p-2 bg-gray-800 rounded mb-2">Song Title 3</li>
                </ul>
            </div>
        </div>
    );
};

export default Home;