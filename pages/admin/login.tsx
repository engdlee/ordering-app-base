import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post('http://localhost:3000/api/login', {
        username,
        password,
      });
      router.push('/admin');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="flex flex-col">
        <h1 className="font-bold text-4xl mb-5">Admin Dashboard</h1>
        <input
          placeholder="username"
          className="h-10 mb-5 px-2 border border-gray-400"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className="h-10 mb-5 px-2 border border-gray-400"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="h-10 mb-5 bg-teal-600 text-white font-semibold cursor-pointer"
        >
          Sign In
        </button>
        {error && (
          <span className="text-sm text-red-600">Wrong Credentials!</span>
        )}
      </div>
    </div>
  );
};

export default Login;
