import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'flowbite';

const ResultPage = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [habitable, setHabitable] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate a calculation process with randomized progress
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    // Randomly determine if the planet is habitable
                    const isHabitable = Math.random() > 0.5;
                    setHabitable(isHabitable);
                    setLoading(false);
                    return 100;
                }
                // Randomize the increment and interval
                const increment = Math.random() * 5; // Random increment between 0 and 5
                const newProgress = prevProgress + increment;
                return newProgress > 100 ? 100 : newProgress;
            });
        }, Math.random() * 100 + 50); // Random interval between 100ms and 300ms

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary text-white">
            {loading ? (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Calculating...</h2>
                    <p>Please wait while we determine if your planet is habitable.</p>
                    <div className="w-full max-w-md mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="mt-2 text-sm">{Math.round(progress)}%</p>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        {habitable ? 'Congratulations!' : 'Sorry!'}
                    </h2>
                    <p>
                        {habitable
                            ? 'Your planet is habitable!'
                            : 'Your planet is not habitable.'}
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Go Back
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResultPage;