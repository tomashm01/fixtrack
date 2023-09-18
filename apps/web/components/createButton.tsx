import { useState, useEffect, FC } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Text,
  Input,
  Select,
  Textarea,
  ModalCloseButton
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

export interface CreateButtonProps {
  fields: Array<{
    label: string;
    type: string;
    fieldName: string;
    options?: any[];
    optionRenderer?: (option: any) => string;
  }>;
  apiUrl: string;
  title: string;
  defaultValues?: { [key: string]: any };
  onCreated?: (newItem: any) => void;
}

const CreateButton: FC<CreateButtonProps> = ({
  fields,
  apiUrl,
  title,
  onCreated,
  defaultValues
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    ...Object.fromEntries(
      fields.map(field => [
        field.fieldName,
        field.options ? field.options[0] : ''
      ])
    ),
    ...defaultValues
  });

  useEffect(() => {
    const defaultSelectValues = Object.fromEntries(
      fields
        .filter(field => field.type === 'select' && field.options)
        .map(field => {
          const firstOption = field.options?.[0];
          return [
            field.fieldName,
            firstOption ? firstOption.id || firstOption._id : ''
          ];
        })
    );
    setFormData((prevFormData: typeof formData) => ({
      ...prevFormData,
      ...defaultSelectValues
    }));
  }, [fields]);

  const handleInputChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    const data = { ...formData, _id: uuidv4() };
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        if (onCreated) onCreated(data);
        setIsOpen(false);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Ocurrió un error');
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error al enviar el formulario');
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
          <ModalHeader>Crear nuevo {title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {errorMessage && <Text color="red.500">{errorMessage}</Text>}
            {fields.map((field, index) => (
              <FormControl key={index}>
                <FormLabel>{field.label}</FormLabel>
                {field.type === 'select' ? (
                  <Select
                    value={
                      formData[field.fieldName] ||
                      (field.options ? field.options[0] : '')
                    }
                    onChange={e =>
                      handleInputChange(field.fieldName, e.target.value)
                    }
                  >
                    {field.options?.map((option, idx) => (
                      <option key={idx} value={option.id || option._id}>
                        {field.optionRenderer
                          ? field.optionRenderer(option)
                          : option}
                      </option>
                    ))}
                  </Select>
                ) : field.type === 'textarea' ? (
                  <Textarea
                    placeholder={field.label}
                    onChange={e =>
                      handleInputChange(field.fieldName, e.target.value)
                    }
                  />
                ) : (
                  <Input
                    type={field.type}
                    placeholder={field.label}
                    onChange={e =>
                      handleInputChange(field.fieldName, e.target.value)
                    }
                  />
                )}
              </FormControl>
            ))}
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center" gap="4">
            <Button colorScheme="blue" onClick={handleSubmit}>
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
