import { useEffect, useState, createContext } from 'react';

import { WorkOrderDTO } from '@fixtrack/contracts';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

interface WorkOrderContextProps {
  workOrders?: WorkOrderDTO[];
  setWorkOrders?: React.Dispatch<React.SetStateAction<WorkOrderDTO[]>>;
  loading?: boolean;
  error?: any;
}

export const WorkOrderContext = createContext<WorkOrderContextProps>({
  workOrders: [],
  setWorkOrders: () => {},
  loading: true,
  error: null
});

export const useWorkOrders = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrderDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkOrders = async () => {
      try {
        const response = await fetch(`${apiURL}/workorder`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`Error fetching work orders: ${response.statusText}`);
        }
        const data = await response.json();
        setWorkOrders(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkOrders();
  }, []);

  return { workOrders, setWorkOrders, loading, error };
};
