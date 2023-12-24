import { Box, Container, Heading, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

const KPI = ({ label, value, helpText }:any) => (
  <Stat p={5} shadow="md" border="1px" borderColor="gray.200">
    <StatLabel>{label}</StatLabel>
    <StatNumber>{value}</StatNumber>
    <StatHelpText>{helpText}</StatHelpText>
  </Stat>
);
const AdminDashboard = () => {
  return (
    <Container maxW="container.xl">
      <Heading as="h1" size="xl" my={5}>
        Dashboard de admin
      </Heading>
      <Box display="flex" justifyContent="space-around">
        <KPI
          label="Ingresos al Mes"
          value="₹50,000" // Sustituye esto por tus datos
          helpText="Comparado al mes pasado"
        />
        <KPI
          label="Tiempo Medio de Reparación"
          value="2 horas"
          helpText="Tiempo promedio este mes"
        />
        <KPI
          label="Clientes Nuevos al Mes"
          value="35"
          helpText="20% más que el mes pasado"
        />
      </Box>
    </Container>
  );
};

export default AdminDashboard;
