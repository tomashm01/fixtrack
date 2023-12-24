import { Box, Container, Heading, Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

const KPI = ({ label, value, helpText }:any) => (
  <Stat p={5} shadow="md" border="1px" borderColor="gray.200">
    <StatLabel>{label}</StatLabel>
    <StatNumber>{value}</StatNumber>
    <StatHelpText>{helpText}</StatHelpText>
  </Stat>
);
const TechDashboard = () => {
  return (
    <Container maxW="container.xl">
      <Heading as="h1" size="xl" my={5}>
        Dashboard de técnico
      </Heading>
      <Box display="flex" justifyContent="space-around">
        <KPI
          label="Tiempo Medio de Reparación"
          value="1.5 horas"
          helpText="Tiempo promedio este mes"
        />
        <KPI
          label="Número de reparaciones al Mes"
          value="20"
          helpText="20% más que el mes pasado"
        />
      </Box>
    </Container>
  );
};

export default TechDashboard;
