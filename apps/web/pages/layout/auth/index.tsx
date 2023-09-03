import React from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from 'next/router';


import {LoginDTO, TokenResponse} from '@fixtrack/contracts';

const validate = (values : LoginDTO )=> {
  const errors :any = {};

  if (!values.email) {
    errors.email = "Campo requerido";
  }

  if (!values.password) {
    errors.password = "Campo requerido";
  }

  return errors;
};

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async values => {
      
      try {
        const response = await fetch("http://localhost:3333/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if(response.ok){
          const token: TokenResponse= await response.json();
          if (token) {
            router.push('/');
          }
        }else{
          console.error("Error en el inicio de sesión:", response);
        }
      } catch (error) {
        console.error("Error en el inicio de sesión:", error);
      }
    },
  });

  return (
    <Box p={8} maxWidth="500px" borderWidth={1} borderRadius="md">
      <form onSubmit={formik.handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...formik.getFieldProps("email")}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              {...formik.getFieldProps("password")}
            />
          </FormControl>

          <Button mt={4} colorScheme="teal" type="submit">
            Iniciar sesión
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
