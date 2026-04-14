import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Text,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  IconButton,
  Wrap,
  WrapItem,
  Badge,
  useToast,
  Select
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

const Skills = ({ data, updateData }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Technical',
    level: 'Intermediate'
  });

  const categories = ['Technical', 'Soft Skills', 'Languages', 'Tools', 'Frameworks', 'Other'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (!formData.name) {
      toast({
        title: 'Missing required field',
        description: 'Please enter a skill name',
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
      name: '',
      category: 'Technical',
      level: 'Intermediate'
    });

    toast({
      title: editingIndex !== null ? 'Skill updated' : 'Skill added',
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
      title: 'Skill deleted',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({
      name: '',
      category: 'Technical',
      level: 'Intermediate'
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'gray';
      case 'Intermediate': return 'blue';
      case 'Advanced': return 'purple';
      case 'Expert': return 'green';
      default: return 'gray';
    }
  };

  const groupedSkills = data.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <Box>
      <Card>
        <CardBody>
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="lg" color="blue.600" mb={2}>
                Skills
              </Heading>
              <Text color="gray.600" fontSize="sm">
                Add your technical and soft skills
              </Text>
            </Box>

            <Divider />

            {/* Form */}
            <Card bg="gray.50">
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <HStack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Skill Name</FormLabel>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="JavaScript, Project Management, Spanish..."
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Category</FormLabel>
                      <Select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Level</FormLabel>
                      <Select
                        value={formData.level}
                        onChange={(e) => handleInputChange('level', e.target.value)}
                      >
                        {levels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </Select>
                    </FormControl>
                  </HStack>

                  <HStack spacing={2} justify="flex-end">
                    {editingIndex !== null && (
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    )}
                    <Button
                      colorScheme="blue"
                      leftIcon={<AddIcon />}
                      onClick={handleAddSkill}
                    >
                      {editingIndex !== null ? 'Update' : 'Add'} Skill
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Skills List */}
            {data.length > 0 && (
              <VStack spacing={6} align="stretch">
                <Heading size="md" color="gray.700">
                  Added Skills ({data.length})
                </Heading>

                {Object.entries(groupedSkills).map(([category, skills]) => (
                  <Box key={category}>
                    <Heading size="sm" color="gray.600" mb={3}>
                      {category}
                    </Heading>
                    <Wrap spacing={2}>
                      {skills.map((skill, index) => {
                        const originalIndex = data.findIndex(s => s === skill);
                        return (
                          <WrapItem key={originalIndex}>
                            <HStack>
                              <Badge
                                colorScheme={getLevelColor(skill.level)}
                                px={3}
                                py={1}
                                borderRadius="full"
                                fontSize="sm"
                                display="flex"
                                alignItems="center"
                                gap={2}
                              >
                                {skill.name}
                                <Text fontSize="xs" opacity={0.8}>
                                  ({skill.level})
                                </Text>
                              </Badge>
                              <IconButton
                                icon={<EditIcon />}
                                size="xs"
                                variant="ghost"
                                colorScheme="blue"
                                onClick={() => handleEdit(originalIndex)}
                                aria-label="Edit skill"
                              />
                              <IconButton
                                icon={<DeleteIcon />}
                                size="xs"
                                variant="ghost"
                                colorScheme="red"
                                onClick={() => handleDelete(originalIndex)}
                                aria-label="Delete skill"
                              />
                            </HStack>
                          </WrapItem>
                        );
                      })}
                    </Wrap>
                  </Box>
                ))}
              </VStack>
            )}
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Skills;
