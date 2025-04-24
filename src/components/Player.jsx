import React from 'react';

const Player = ({ song }) => {
    return (
        <div className="player-container bg-black text-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{song.title}</h2>
            <h3 className="text-xl mb-4">{song.artist}</h3>
            <div className="lyrics bg-gray-800 p-4 rounded-md overflow-auto">
                <h4 className="text-lg font-semibold mb-2">Lyrics:</h4>
                <pre className="whitespace-pre-wrap">{song.lyrics}</pre>
            </div>
            <div className="chords mt-4">
                <h4 className="text-lg font-semibold mb-2">Chords:</h4>
                <pre className="whitespace-pre-wrap">{song.chords}</pre>
            </div>
            <div className="resources mt-4">
                <h4 className="text-lg font-semibold mb-2">Resources:</h4>
                <ul className="list-disc pl-5">
                    {song.resources.map((resource, index) => (
                        <li key={index}>
                            <a href={resource.link} className="text-green-500 hover:underline">
                                {resource.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Player;