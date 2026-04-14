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
  useToast,
  Select
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

const Education = ({ data, updateData }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const toast = useToast();

  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: '',
    achievements: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddEducation = () => {
    if (!formData.institution || !formData.degree || !formData.startDate) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in institution, degree, and start date',
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
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      achievements: ''
    });

    toast({
      title: editingIndex !== null ? 'Education updated' : 'Education added',
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
      title: 'Education deleted',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      achievements: ''
    });
  };

  return (
    <Box>
      <Card p={6}>
        <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="lg" color="blue.600" mb={2}>
                Education
              </Heading>
              <Text color="gray.600" fontSize="sm">
                Add your educational background
              </Text>
            </Box>

            <Divider />

            {/* Form */}
            <Card bg="gray.50" p={4}>
                <VStack spacing={4} align="stretch">
                  <HStack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Institution</FormLabel>
                      <Input
                        value={formData.institution}
                        onChange={(e) => handleInputChange('institution', e.target.value)}
                        placeholder="Stanford University"
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Degree</FormLabel>
                      <Input
                        value={formData.degree}
                        onChange={(e) => handleInputChange('degree', e.target.value)}
                        placeholder="Bachelor of Science"
                      />
                    </FormControl>
                  </HStack>

                  <HStack spacing={4}>
                    <FormControl>
                      <FormLabel>Field of Study</FormLabel>
                      <Input
                        value={formData.field}
                        onChange={(e) => handleInputChange('field', e.target.value)}
                        placeholder="Computer Science"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Location</FormLabel>
                      <Input
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Stanford, CA"
                      />
                    </FormControl>
                  </HStack>

                  <HStack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Start Date</FormLabel>
                      <Input
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        placeholder="Sep 2018"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>End Date</FormLabel>
                      <Input
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                        placeholder="Jun 2022"
                        disabled={formData.current}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>GPA</FormLabel>
                      <Input
                        value={formData.gpa}
                        onChange={(e) => handleInputChange('gpa', e.target.value)}
                        placeholder="3.8"
                      />
                    </FormControl>
                  </HStack>

                  <FormControl>
                    <FormLabel>Achievements & Activities</FormLabel>
                    <Textarea
                      value={formData.achievements}
                      onChange={(e) => handleInputChange('achievements', e.target.value)}
                      placeholder="Dean's List, Honor Society, relevant coursework, extracurricular activities..."
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
                      onClick={handleAddEducation}
                    >
                      {editingIndex !== null ? 'Update' : 'Add'} Education
                    </Button>
                  </HStack>
                </VStack>
            </Card>

            {/* Education List */}
            {data.length > 0 && (
              <VStack spacing={4} align="stretch">
                <Heading size="md" color="gray.700">
                  Added Education ({data.length})
                </Heading>
                {data.map((edu, index) => (
                  <Card key={index} variant="outline" p={4}>
                      <HStack justify="space-between" align="start">
                        <VStack align="start" spacing={2} flex={1}>
                          <HStack>
                            <Heading size="sm" color="blue.600">
                              {edu.degree}
                            </Heading>
                            <Text color="gray.500">in</Text>
                            <Text fontWeight="medium">{edu.field}</Text>
                          </HStack>
                          <Text fontWeight="medium">{edu.institution}</Text>
                          <Text color="gray.600" fontSize="sm">
                            {edu.location && `${edu.location} • `}
                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                            {edu.gpa && ` • GPA: ${edu.gpa}`}
                          </Text>
                          {edu.achievements && (
                            <Text color="gray.700" fontSize="sm">
                              {edu.achievements}
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
                            aria-label="Edit education"
                          />
                          <IconButton
                            icon={<DeleteIcon />}
                        </HStack>
                        <Text fontWeight="medium">{edu.institution}</Text>
                        <Text color="gray.600" fontSize="sm">
                          {edu.location && `${edu.location} • `}
                          {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                          {edu.gpa && ` • GPA: ${edu.gpa}`}
                        </Text>
                        {edu.achievements && (
                          <Text color="gray.700" fontSize="sm">
                            {edu.achievements}
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
                          aria-label="Edit education"
                        />
                        <IconButton
                          icon={<DeleteIcon />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleDelete(index)}
                          aria-label="Delete education"
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
  }
};

export default Education;
