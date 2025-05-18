import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Auth: React.FC = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', username: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const  { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                await axios.post('http://localhost:5000/api/auth/register', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                });
                setIsRegistering(false); // Redirect to login form
            } else {
                const res = await axios.post('http://localhost:5000/api/auth/login', {
                    email: formData.email,
                    password: formData.password,
                });

                login(res.data.token);
                navigate('/home'); // Redirect to protected home

            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="auth-container flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-semibold mb-6 text-center">{isRegistering ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {isRegistering && (
                        <input
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded"
                        />
                    )}
                    <input
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        {isRegistering ? 'Register' : 'Login'}
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-blue-600 cursor-pointer" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? 'Already have an account? Login' : 'No account? Register'}
                </p>
            </div>
        </div>
    );
};

export default Auth;
