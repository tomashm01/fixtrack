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
import FiltrableSelect from './FiltrableSelect';

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
  const [formData, setFormData] = useState<any>({ ...defaultValues });

  useEffect(() => {
    const defaultValues = Object.fromEntries(
      fields.map(field => {
        let defaultValue = '';
        if (field.type === 'filtrableSelect' || field.type === 'select') {
          const firstOption =
            field.options?.[0]?.id ||
            field.options?.[0]?._id ||
            field.options?.[0];
          defaultValue = firstOption || '';
        }
        return [field.fieldName, defaultValue];
      })
    );
    setFormData({ ...defaultValues });
  }, [fields]);

  const handleInputChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    const data = { ...formData, ...defaultValues, _id: uuidv4() };
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      console.log(await response.json());
      if (response.ok) {
        if (onCreated) onCreated(data);
        setIsOpen(false);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Ocurrió un error');
      }
    } catch (error) {
      console.log('Ocurrió un error al enviar el formulario:', error);
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
                {field.type === 'filtrableSelect' ? (
                  <FiltrableSelect
                    options={
                      field.options
                        ? field.options.map(option => ({
                            label: field.optionRenderer
                              ? field.optionRenderer(option)
                              : option,
                            value: option.id || option._id
                          }))
                        : []
                    }
                    value={formData[field.fieldName] || ''}
                    onChange={(value: any) =>
                      handleInputChange(field.fieldName, value)
                    }
                    placeholder={`Buscar ${field.label}`}
                  />
                ) : field.type === 'select' ? (
                  <Select
                    value={
                      formData[field.fieldName] ||
                      (field.options
                        ? field.options[0]?.id || field.options[0]?._id
                        : '')
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
