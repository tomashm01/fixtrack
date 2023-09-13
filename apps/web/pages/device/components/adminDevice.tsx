import { useContext } from "react";

import CreateButton, { CreateButtonProps } from "apps/web/components/createButton";
import { DeviceContext, useDevices } from "../hooks";
import ListTable from "apps/web/components/ListTable";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

const AdminDevice = () => {
  
  const { devices, setDevices, loading, error } = useContext(DeviceContext); 

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/device/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const updatedDevices = devices ? devices.filter((device) => device._id !== id) : [];
        if(setDevices) setDevices(updatedDevices);
      } else {
        console.log("No se pudo eliminar el usuario");
      }
    } catch (error) {
      console.log("Ocurrió un error al eliminar el usuario:", error);
    }
  };

  const handleDeviceCreated = (newDevice: any) => {
    if (setDevices && devices) {
      setDevices([...devices, newDevice]);
    }
  };
  
  const columnsTable = [
    { header: "ID", accessor: "id" },
    { header: "TIPO", accessor: "type" },
    { header: "MARCA", accessor: "brand" },
    { header: "MODELO", accessor: "model" },
  ];

  const createFields = [
    { label: "Tipo", type: "text", fieldName: "type" },
    { label: "Marca", type: "text", fieldName: "brand" },
    { label: "Modelo", type: "text", fieldName: "model" },
  ];

  const createButtonProps: CreateButtonProps = {
    fields: createFields,
    apiUrl: `${apiUrl}/device`,
    title: "dispositivo",
    onCreated: handleDeviceCreated,
  };
  

  return (
    <>
      <ListTable 
        data={devices || []}
        columns={columnsTable}
        title="dispositivos"
        onDelete={handleDelete}
        createButton={createButtonProps}
      />
    </>
  );
}

export default AdminDevice;