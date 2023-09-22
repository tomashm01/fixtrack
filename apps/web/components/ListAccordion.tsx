import React, { useContext, useState } from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Text,
  Input,
  Select,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Heading,
  TableContainer,
  Editable,
  EditableInput,
  EditablePreview
} from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import CreateButton, { CreateButtonProps } from './CreateButton';
import FiltrableSelect from './FiltrableSelect';
import { useUsers } from '../pages/user/hooks';
import { useDevices } from '../pages/device/hooks';
import { WorkOrderContext } from '../pages/order/hooks';

interface ListAccordionProps {
  title: string;
  createButton: CreateButtonProps;
  handleDelete: (id: string) => void;
  handleUpdate: (data: any) => void;
}

const statusColors = {
  PENDING: 'gray',
  REVIEWING: 'orange',
  CANCELLED: 'red',
  WAITING_CUSTOMER_APPROVAL: 'yellow',
  WAITING_STOCK: 'purple',
  REPAIRING: 'blue',
  WAITING_FOR_PICKUP: 'teal',
  FINISHED: 'green'
};

const statusTransitions = {
  PENDING: ['REVIEWING'],
  REVIEWING: ['CANCELLED', 'WAITING_CUSTOMER_APPROVAL'],
  WAITING_CUSTOMER_APPROVAL: ['WAITING_STOCK', 'REPAIRING'],
  WAITING_STOCK: ['REPAIRING'],
  REPAIRING: ['WAITING_FOR_PICKUP'],
  WAITING_FOR_PICKUP: ['FINISHED']
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const StatusMenu: React.FC<{
  currentStatus: string;
  transitions: string[];
  onChange: (newStatus: string) => void;
}> = ({ currentStatus, transitions, onChange }) => (
  <Menu>
    {({ isOpen }) => (
      <>
        <MenuButton
          as="div"
          role="button"
          cursor="pointer"
          tabIndex={0}
          style={{
            padding: '8px',
            borderWidth: '1px',
            borderRadius: '4px',
            borderColor:
              statusColors[currentStatus as keyof typeof statusColors] ||
              'black'
          }}
          _hover={{ bg: 'gray.200' }}
        >
          {currentStatus}
        </MenuButton>

        <MenuList>
          {transitions.map(status => (
            <MenuItem key={status} onClick={() => onChange(status)}>
              {currentStatus} → {status}
            </MenuItem>
          ))}
        </MenuList>
      </>
    )}
  </Menu>
);

const ListAccordion: React.FC<ListAccordionProps> = ({
  title,
  createButton,
  handleDelete,
  handleUpdate
}) => {
  const { workOrders, setWorkOrders, loading, error } =
    useContext(WorkOrderContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const { users } = useUsers();
  const { devices } = useDevices();

  const filteredData =
    workOrders?.filter(order =>
      Object.values(order).some(value =>
        value?.toString().toLowerCase().includes(filter.toLowerCase())
      )
    ) || [];

  const updateOrder = (orderId: string, field: string, value: any) => {
    if (!setWorkOrders) {
      console.error('setWorkOrders is not defined');
      return;
    }

    setWorkOrders((prevOrders = []) => {
      const updatedOrders = prevOrders.map(order =>
        order._id === orderId ? { ...order, [field]: value } : order
      );
      return updatedOrders;
    });
  };

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <Box p={4} maxWidth="80%" margin="auto">
      <Flex direction="column" gap={5}>
        <Heading display="flex" justifyContent="center">
          Lista de {title}
        </Heading>
        <Flex gap="4" justifyContent="center" alignItems="center">
          <CreateButton {...createButton} />
          <Input
            placeholder="Buscar"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            width={['80%', '60%', '40%', '20%']}
          />
          <Select
            onChange={e => setPageSize(Number(e.target.value))}
            value={pageSize}
            width={['80%', '60%', '40%', '20%']}
          >
            <option value={10}>10 por página</option>
            <option value={20}>20 por página</option>
            <option value={50}>50 por página</option>
          </Select>
        </Flex>
      </Flex>
      <Box>
        <Accordion allowToggle>
          {currentData.map((order, index) => (
            <AccordionItem key={index}>
              <AccordionButton as="div" role="button" cursor="pointer">
                <Flex
                  flex="1"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text>
                    #{index + 1} -
                    {` ${new Date(order.startDate).getDate()}/${
                      new Date(order.startDate).getMonth() + 1
                    }/${new Date(order.startDate).getFullYear()}`}
                    {order.endDate &&
                      ` - ${new Date(order.endDate).getDate()}/${
                        new Date(order.endDate).getMonth() + 1
                      }/${new Date(order.endDate).getFullYear()}`}
                  </Text>
                  <StatusMenu
                    currentStatus={order.status}
                    transitions={
                      statusTransitions[
                        order.status as keyof typeof statusTransitions
                      ] || []
                    }
                    onChange={newStatus =>
                      updateOrder(order._id, 'status', newStatus)
                    }
                  />
                  <Editable
                    defaultValue={`${order.price.toString()}€`}
                    onChange={value =>
                      updateOrder(
                        order._id,
                        'price',
                        Number.parseFloat(value.split('€')[0])
                      )
                    }
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Flex direction="column" gap="2">
                  <FiltrableSelect
                    options={users.map(user => ({
                      label: user.email,
                      value: user.id
                    }))}
                    value={order.idCustomer}
                    onChange={value =>
                      updateOrder(order._id, 'idCustomer', value)
                    }
                    placeholder="Seleccionar cliente"
                  />
                  <FiltrableSelect
                    options={devices.map(device => ({
                      label: `${device.type}-${device.brand}-${device.model}`,
                      value: device._id
                    }))}
                    value={order.idDevice}
                    onChange={value =>
                      updateOrder(order._id, 'idDevice', value)
                    }
                    placeholder="Seleccionar dispositivo"
                  />
                  <FiltrableSelect
                    options={users.map(user => ({
                      label: user.email,
                      value: user.id
                    }))}
                    value={order.idTechnician}
                    onChange={value =>
                      updateOrder(order._id, 'idTechnician', value)
                    }
                    placeholder="Seleccionar técnico"
                  />
                  <Editable
                    defaultValue={order.description}
                    onChange={value =>
                      updateOrder(order._id, 'description', value)
                    }
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>

                  <Flex
                    direction="row"
                    gap="2"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      size="md"
                      colorScheme="blue"
                      leftIcon={<FaEdit />}
                      onClick={() => handleUpdate(order)}
                    >
                      Actualizar
                    </Button>
                    <Button
                      size="md"
                      colorScheme="red"
                      leftIcon={<FaTrash />}
                      onClick={() => handleDelete(order._id)}
                    >
                      Eliminar
                    </Button>
                  </Flex>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
      <Flex
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        gap="5"
      >
        <Button
          isDisabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Anterior
        </Button>
        <Text>
          Página {currentPage} de {totalPages}
        </Text>
        <Button
          isDisabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Siguiente
        </Button>
      </Flex>
    </Box>
  );
};

export default ListAccordion;
