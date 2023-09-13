import { TokenResponse } from '@fixtrack/contracts';
import { setToken } from 'apps/web/services/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

const api = process.env.NEXT_PUBLIC_API_URL;

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch(`${api}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    if (response.ok) {
      const token: TokenResponse = await response.json();
      setToken(token.token);
      router.push('/dashboard');
    } else {
      const errorData = await response.json();
      setErrorMsg(errorData.message);
    }
  };

  return {
    email,
    password,
    errorMsg,
    setEmail,
    setPassword,
    handleLogin
  };
};

export default useLogin;
