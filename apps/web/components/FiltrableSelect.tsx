import { Box, Input, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface FiltrableSelectProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isDisabled?: boolean;
}

const FiltrableSelect: React.FC<FiltrableSelectProps> = ({
  options = [],
  value,
  onChange,
  placeholder,
  isDisabled = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const selectedOption = options.find(option => option.value === value);
    if (selectedOption) {
      setSearchTerm(selectedOption.label);
    }
  }, [value, options]);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = options
    ? options.filter((option: any) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <VStack align="stretch" spacing={1}>
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() => !isDisabled && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        readOnly={isDisabled}
      />
      {isOpen && (
        <Box
          as="ul"
          borderWidth="1px"
          borderRadius="md"
          p="1"
          maxH="200px"
          overflowY="auto"
        >
          {filteredOptions.map((option: any) => (
            <Box
              as="li"
              p="2"
              key={option.value}
              backgroundColor={option.value === value ? 'blue.100' : 'white'}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
                setSearchTerm(option.label);
              }}
            >
              {option.label}
            </Box>
          ))}
        </Box>
      )}
    </VStack>
  );
};

export default FiltrableSelect;
