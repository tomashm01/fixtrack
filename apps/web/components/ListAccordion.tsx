import React, { useState } from 'react';
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
  Button,
  Heading,
  TableContainer
} from '@chakra-ui/react';
import CreateButton, { CreateButtonProps } from './CreateButton';
import { WorkOrderDTO } from '../services/auth';

interface ListAccordionProps {
  data: WorkOrderDTO[];
  title: string;
  createButton: CreateButtonProps;
}

const ListAccordion: React.FC<ListAccordionProps> = ({
  data,
  title,
  createButton
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const filteredData = data.filter(order => {
    return Object.values(order).some(value =>
      value?.toString().toLowerCase().includes(filter.toLowerCase())
    );
  });

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
      <TableContainer>
        <Accordion allowToggle>
          {currentData.map((order, index) => (
            <AccordionItem key={order._id}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  ID: {order._id} - Estado: {order.status} - Precio:{' '}
                  {order.price} - Fecha: {order.startDate.toString()}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Text>Cliente: {order.idCustomer}</Text>
                <Text>Dispositivo: {order.idDevice}</Text>
                <Text>Técnico: {order.idTechnician}</Text>
                <Text>Descripción: {order.description}</Text>
                {order.endDate && (
                  <Text>Fecha de Finalización: {order.endDate.toString()}</Text>
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </TableContainer>
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
