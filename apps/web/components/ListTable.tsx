import { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Select,
  TableContainer,
  Flex,
  Heading,
  Text
} from '@chakra-ui/react';
import CreateButton, { CreateButtonProps } from './createButton';

interface TableProps {
  columns: Array<{ header: string; accessor: string }>;
  data: any[];
  title: string;
  createButton?: CreateButtonProps;
  onDelete?: (_id: string) => void;
}

const ListTable: React.FC<TableProps> = ({
  columns,
  data,
  title,
  onDelete,
  createButton
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const filteredData = data.filter(item => {
    return columns.some(column => {
      const value = item[column.accessor];
      return value && value.toString().toLowerCase().includes(filter);
    });
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box p={4}>
      <Flex direction="column" gap={5}>
        <Heading display="flex" justifyContent="center">
          Lista de {title}
        </Heading>
        <Flex gap="4" justifyContent="center" alignItems="center">
          {createButton && (
            <CreateButton
              fields={createButton.fields}
              apiUrl={createButton.apiUrl}
              title={createButton.title}
              onCreated={createButton.onCreated}
            />
          )}
          <Input
            placeholder="Buscar"
            name="filter"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            width={['80%', '60%', '40%', '20%']}
          />
          <Select
            name="pageSize"
            width={['80%', '60%', '40%', '20%']}
            onChange={e => setPageSize(Number(e.target.value))}
          >
            <option value={10}>10 por página</option>
            <option value={20}>20 por página</option>
            <option value={50}>50 por página</option>
          </Select>
        </Flex>
      </Flex>
      <Box maxWidth="80%" margin="auto">
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                {columns.map((column, index) => (
                  <Th key={index}>{column.header}</Th>
                ))}
                {onDelete && <Th>Acciones</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {currentData.map((item, index) => (
                <Tr key={item._id || item.id}>
                  <Td>{startIndex + index + 1}</Td>
                  {columns
                    .filter(column => column.accessor !== 'id')
                    .map(column => (
                      <Td key={`${item._id || item.id}-${column.accessor}`}>
                        {item[column.accessor]}
                      </Td>
                    ))}
                  {onDelete && (
                    <Td>
                      <Button
                        colorScheme="red"
                        onClick={() => onDelete(item._id || item.id)}
                      >
                        Eliminar
                      </Button>
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Flex
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        gap="5"
      >
        <Button isDisabled={currentPage === 1} onClick={handlePreviousPage}>
          Anterior
        </Button>
        <Text>
          Página {currentPage} de {totalPages}
        </Text>
        <Button
          isDisabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Siguiente
        </Button>
      </Flex>
    </Box>
  );
};

export default ListTable;
