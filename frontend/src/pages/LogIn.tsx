import React, { useState, useEffect } from 'react';
import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { useLocalFlairContext } from '../context/LocalFlairContext';

const Login: React.FC = () => {
    const { user, setUser } = useLocalFlairContext();
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                try {
                    const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                        },
                    });
                    setProfile(userInfo.data);
                } catch (error) {
                    console.error('Failed to fetch user info:', error);
                }
            };

            fetchProfile();
        }
    }, [user]);

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            console.log('Login Success:', response);
            const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
                headers: {
                    Authorization: `Bearer ${response.access_token}`,
                },
            });
            console.log('User Info:', userInfo.data);
            setProfile(userInfo.data);
            setUser(response);

            // Send user info to backend
            try {
                const backendResponse = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                    email: userInfo.data.email,
                    name: userInfo.data.name,
                    location: "Unknown", // or prompt user for location
                    picture: userInfo.data.picture,
                    biography: "Biography",
                });
                console.log('Backend Response:', backendResponse.data);
            } catch (error) {
                console.error('Failed to send user info to backend:', error);
            }
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    const handleLogout = () => {
        googleLogout();
        setUser(null);
        setProfile(null);
        console.log('User logged out');
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6">Welcome to LocalFlair</h2>
                {!user ? (
                    <>
                        <p className="mb-6">Please sign in to continue</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => login()}
                        >
                            Sign in with Google
                        </button>
                    </>
                ) : (
                    profile && (
                        <>
                            <div className="mb-6">
                                <img
                                    src={profile.picture}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full mx-auto mb-4"
                                />
                                <p className="text-xl font-semibold">{profile.name}</p>
                                <p className="text-gray-500">{profile.email}</p>
                            </div>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={handleLogout}
                            >
                                Sign Out
                            </button>
                        </>
                    )
                )}
            </div>
        </div>
    );
};

export default Login;
