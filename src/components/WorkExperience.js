import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Text,
  Card,
  Divider,
  Button,
  IconButton,
  useToast
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

const WorkExperience = ({ data, updateData }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const toast = useToast();

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddExperience = () => {
    if (!formData.company || !formData.position || !formData.startDate) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in company, position, and start date',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (editingIndex !== null) {
      const updatedData = [...data];
      updatedData[editingIndex] = formData;
      updateData(updatedData);
      setEditingIndex(null);
    } else {
      updateData([...data, formData]);
    }

    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });

    toast({
      title: editingIndex !== null ? 'Experience updated' : 'Experience added',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEdit = (index) => {
    setFormData(data[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    updateData(updatedData);
    toast({
      title: 'Experience deleted',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };

  return (
    <Box>
      <Card p={6}>
        <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="lg" color="blue.600" mb={2}>
                Work Experience
              </Heading>
              <Text color="gray.600" fontSize="sm">
                Add your professional work experience
              </Text>
            </Box>

            <Divider />

            {/* Form */}
            <Card bg="gray.50" p={4}>
                <VStack spacing={4} align="stretch">
                  <HStack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Company</FormLabel>
                      <Input
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Google"
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Position</FormLabel>
                      <Input
                        value={formData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </FormControl>
                  </HStack>

                  <HStack spacing={4}>
                    <FormControl>
                      <FormLabel>Location</FormLabel>
                      <Input
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="San Francisco, CA"
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Start Date</FormLabel>
                      <Input
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        placeholder="Jan 2020"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>End Date</FormLabel>
                      <Input
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                        placeholder="Dec 2021"
                        disabled={formData.current}
                      />
                    </FormControl>
                  </HStack>

                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                      rows={4}
                      resize="vertical"
                    />
                  </FormControl>

                  <HStack spacing={2} justify="flex-end">
                    {editingIndex !== null && (
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    )}
                    <Button
                      colorScheme="blue"
                      leftIcon={<AddIcon />}
                      onClick={handleAddExperience}
                    >
                      {editingIndex !== null ? 'Update' : 'Add'} Experience
                    </Button>
                  </HStack>
                </VStack>
            </Card>

            {/* Experience List */}
            {data.length > 0 && (
              <VStack spacing={4} align="stretch">
                <Heading size="md" color="gray.700">
                  Added Experience ({data.length})
                </Heading>
                {data.map((exp, index) => (
                  <Card key={index} variant="outline" p={4}>
                      <HStack justify="space-between" align="start">
                        <VStack align="start" spacing={2} flex={1}>
                          <HStack>
                            <Heading size="sm" color="blue.600">
                              {exp.position}
                            </Heading>
                            <Text color="gray.500">at</Text>
                            <Text fontWeight="medium">{exp.company}</Text>
                          </HStack>
                          <Text color="gray.600" fontSize="sm">
                            {exp.location && `${exp.location} • `}
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </Text>
                          {exp.description && (
                            <Text color="gray.700" fontSize="sm">
                              {exp.description}
                            </Text>
                          )}
                        </VStack>
                        <HStack>
                          <IconButton
                            icon={<EditIcon />}
                            size="sm"
                            variant="ghost"
                            colorScheme="blue"
                            onClick={() => handleEdit(index)}
                            aria-label="Edit experience"
                          />
                          <IconButton
                            icon={<DeleteIcon />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => handleDelete(index)}
                            aria-label="Delete experience"
                          />
                        </HStack>
                      </HStack>
                    </Card>
                ))}
              </VStack>
            )}
          </VStack>
        </Card>
      </Box>
  );
};

export default WorkExperience;
