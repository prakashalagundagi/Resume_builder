import React from 'react';
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
  Divider
} from '@chakra-ui/react';

const PersonalInfo = ({ data, updateData }) => {
  const handleInputChange = (field, value) => {
    updateData({ [field]: value });
  };

  return (
    <Box>
      <Card p={6}>
        <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="lg" color="blue.600" mb={2}>
                Personal Information
              </Heading>
              <Text color="gray.600" fontSize="sm">
                Add your personal details to appear on your resume
              </Text>
            </Box>

            <Divider />

            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  value={data.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="John Doe"
                  size="lg"
                />
              </FormControl>

              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={data.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john.doe@example.com"
                    type="email"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    value={data.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    type="tel"
                  />
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  value={data.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="New York, NY 10001"
                />
              </FormControl>

              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>LinkedIn</FormLabel>
                  <Input
                    value={data.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>GitHub</FormLabel>
                  <Input
                    value={data.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    placeholder="github.com/johndoe"
                  />
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>Professional Summary</FormLabel>
                <Textarea
                  value={data.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  placeholder="A brief summary of your professional background and career objectives..."
                  rows={4}
                  resize="vertical"
                />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  2-3 sentences highlighting your key qualifications and career goals
                </Text>
              </FormControl>
            </VStack>
          </VStack>
      </Card>
    </Box>
  );
};

export default PersonalInfo;
