import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const setToken = (token: string) => {
  Cookies.set('token', token);
};

export const getToken = () => {
  return Cookies.get('token');
};

export const getRole = async (token: string | undefined) => {
  const response = await fetch(`${apiUrl}/user/validate-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  });

  const roleResponse = await response.json();

  if (!roleResponse.role) return null;

  return roleResponse.role;
};

export const removeToken = () => {
  Cookies.remove('token');
};

export enum KnownRoles {
  CLIENTE = 'CLIENTE',
  TECNICO = 'TECNICO',
  ADMIN = 'ADMIN'
}

export enum Brand {
  APPLE = 'APPLE',
  SAMSUNG = 'SAMSUNG',
  XIAOMI = 'XIAOMI',
  ASUS = 'ASUS',
  SONY = 'SONY',
  LG = 'LG',
  HUAWEI = 'HUAWEI',
  LOGITECH = 'LOGITECH',
  HYPERX = 'HYPERX',
  OTHER = 'OTHER'
}

export enum Type {
  PHONE = 'PHONE',
  TABLET = 'TABLET',
  LAPTOP = 'LAPTOP',
  PC = 'PC',
  HEADPHONES = 'HEADPHONES',
  KEYBOARD = 'KEYBOARD',
  MOUSE = 'MOUSE',
  OTHER = 'OTHER'
}
