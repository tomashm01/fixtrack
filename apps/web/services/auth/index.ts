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

export enum Status {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  CANCELLED = 'CANCELLED',
  WAITING_CUSTOMER_APPROVAL = 'WAITING_CUSTOMER_APPROVAL',
  WAITING_STOCK = 'WAITING_STOCK',
  REPAIRING = 'REPAIRING',
  WAITING_FOR_PICKUP = 'WAITING_FOR_PICKUP',
  FINISHED = 'FINISHED'
}

export class UserDTO {
  constructor(props: any) {
    this.id = props._id || props.id;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
  }

  id: string;
  email: string;
  password: string;
  role: string;
}

export class WorkOrderDTO {
  constructor(props: any) {
    this._id = props._id;
    this.idCustomer = props.idCustomer;
    this.idDevice = props.idDevice;
    this.idTechnician = props.idTechnician;
    this.status = props.status;
    this.startDate = props.startDate;
    this.price = props.price;
    this.description = props.description;
    this.endDate = props.endDate;
  }
  _id: string;
  idCustomer: string;
  idDevice: string;
  idTechnician: string;
  status: string;
  startDate: Date;
  price: number;
  description: string;
  endDate?: Date;
}

export class DeviceDTO {
  constructor(props: any) {
    this._id = props._id;
    this.brand = props.brand;
    this.model = props.model;
    this.type = props.type;
    this.description = props.description;
  }
  _id: string;
  brand: string;
  model: string;
  type: string;
  description: string;
}
