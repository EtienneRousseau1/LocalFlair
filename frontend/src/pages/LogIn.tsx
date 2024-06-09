import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

const Login: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = (credentialResponse: any) => {
        setIsLoggedIn(true);
        console.log('Login Successful:', credentialResponse);
    };

    const handleLogout = () => {
        googleLogout();
        setIsLoggedIn(false);
        console.log('User logged out');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6">Welcome to LocalFlair</h2>
                {!isLoggedIn ? (
                    <>
                        <p className="mb-6">Please sign in to continue</p>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </>
                ) : (
                    <>
                        <p className="mb-6">You are logged in!</p>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={handleLogout}
                        >
                            Sign Out
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
