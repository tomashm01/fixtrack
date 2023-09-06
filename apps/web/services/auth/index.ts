import Cookies from 'js-cookie';
import cookie from 'cookie';

import { GetServerSideProps } from 'next';

const apiUrl= process.env.NEXT_PUBLIC_API_URL;

export const setToken = (token: string) => {
  Cookies.set("token",token);
};

export const getToken = () => {
  return Cookies.get("token");
};

export const getRole = async (token:string|undefined) => {

  const response = await fetch(`${apiUrl}/user/validate-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token}),
  });

  const roleResponse = await response.json();

  if (!roleResponse.role) return null;
  
  return roleResponse.role;
  
};

