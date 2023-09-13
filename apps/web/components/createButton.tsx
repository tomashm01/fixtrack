import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';

export interface CreateButtonProps {
  fields: Array<{ label: string; type: string; fieldName:string; }>;
  apiUrl: string;
  title:string;
  onCreated?: (newItem:any) => void;
}

const CreateButton: React.FC<CreateButtonProps> = ({ fields, apiUrl, title, onCreated }) => {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  
  const handleSubmit = async () => {
    const data = {...formData, _id: uuidv4()};
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Creado con éxito");
        if(onCreated) onCreated(data);
        setIsOpen(false);
      } else {
        const errorData = await response.json();
        console.log(errorData)
        setErrorMessage(errorData.message || "Ocurrió un error");
      }
    } catch (error) {
      console.log("Ocurrió un error:", error);
      setErrorMessage("Ocurrió un error al enviar el formulario");
    }
  };

  return (
    <>
      <Button colorScheme="teal" onClick={() => setIsOpen(true)}>
        Crear {title}
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display='flex' justifyContent='center'>Crear nuevo {title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {errorMessage && (
              <ModalHeader color="red.500" display='flex' justifyContent='center'>
                <Text>{errorMessage}</Text>
              </ModalHeader>
            )}
            {fields.map((field, index) => (
              <FormControl key={index}>
                <FormLabel>{field.label}</FormLabel>
                <Input
                  type={field.type}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.fieldName]: e.target.value })
                  }
                />
              </FormControl>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Crear
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateButton;
