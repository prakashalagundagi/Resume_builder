import React, { useState } from 'react';
import {
  ChakraProvider,
  CSSReset,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Divider,
  useToast
} from '@chakra-ui/react';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      summary: ''
    },
    work: [
      { company: '', position: '', duration: '', description: '' }
    ],
    education: [
      { school: '', degree: '', year: '' }
    ]
  });

  const toast = useToast();

  const updatePersonal = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const updateWork = (index, field, value) => {
    const newWork = [...resumeData.work];
    newWork[index][field] = value;
    setResumeData(prev => ({ ...prev, work: newWork }));
  };

  const updateEducation = (index, field, value) => {
    const newEducation = [...resumeData.education];
    newEducation[index][field] = value;
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const addWork = () => {
    setResumeData(prev => ({
      ...prev,
      work: [...prev.work, { company: '', position: '', duration: '', description: '' }]
    }));
    toast({
      title: 'Work experience added',
      status: 'success',
      duration: 2000,
    });
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', year: '' }]
    }));
    toast({
      title: 'Education added',
      status: 'success',
      duration: 2000,
    });
  };

  const removeWork = (index) => {
    const newWork = resumeData.work.filter((_, i) => i !== index);
    setResumeData(prev => ({ ...prev, work: newWork }));
  };

  const removeEducation = (index) => {
    const newEducation = resumeData.education.filter((_, i) => i !== index);
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const downloadResume = () => {
    const resumeText = `
RESUME

${resumeData.personal.fullName}
${resumeData.personal.email} | ${resumeData.personal.phone}

SUMMARY
${resumeData.personal.summary}

WORK EXPERIENCE
${resumeData.work.map(w => `
${w.position} at ${w.company}
${w.duration}
${w.description}
`).join('\n')}

EDUCATION
${resumeData.education.map(e => `
${e.degree} from ${e.school}
${e.year}
`).join('\n')}
    `;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.txt';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Resume downloaded!',
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box minH="100vh" bg="gray.50">
        {/* Header */}
        <Box bg="white" shadow="sm" borderBottom="1px" borderColor="gray.200">
          <Container maxW="800px" py={4}>
            <HStack justify="space-between" align="center">
              <Heading as="h1" size="lg" color="blue.600">
                Resume Builder
              </Heading>
              <Button colorScheme="blue" onClick={downloadResume}>
                Download Resume
              </Button>
            </HStack>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxW="800px" py={8}>
          <Box bg="white" p={6} borderRadius="md" shadow="sm">
            <Tabs index={activeTab} onChange={setActiveTab}>
              <TabList>
                <Tab>Personal Info</Tab>
                <Tab>Work Experience</Tab>
                <Tab>Education</Tab>
                <Tab>Preview</Tab>
              </TabList>

              <TabPanels>
                {/* Personal Info */}
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Heading size="md" color="blue.600">Personal Information</Heading>
                    
                    <FormControl>
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        value={resumeData.personal.fullName}
                        onChange={(e) => updatePersonal('fullName', e.target.value)}
                        placeholder="John Doe"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        value={resumeData.personal.email}
                        onChange={(e) => updatePersonal('email', e.target.value)}
                        placeholder="john@example.com"
                        type="email"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Phone</FormLabel>
                      <Input
                        value={resumeData.personal.phone}
                        onChange={(e) => updatePersonal('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Professional Summary</FormLabel>
                      <Textarea
                        value={resumeData.personal.summary}
                        onChange={(e) => updatePersonal('summary', e.target.value)}
                        placeholder="Brief summary of your professional background..."
                        rows={4}
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>

                {/* Work Experience */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <HStack justify="space-between">
                      <Heading size="md" color="blue.600">Work Experience</Heading>
                      <Button colorScheme="blue" size="sm" onClick={addWork}>
                        Add Work
                      </Button>
                    </HStack>

                    {resumeData.work.map((work, index) => (
                      <Box key={index} p={4} bg="gray.50" borderRadius="md" border="1px" borderColor="gray.200">
                        <VStack spacing={3} align="stretch">
                          <HStack justify="space-between">
                            <Text fontWeight="medium">Work #{index + 1}</Text>
                            {resumeData.work.length > 1 && (
                              <Button
                                size="sm"
                                colorScheme="red"
                                variant="outline"
                                onClick={() => removeWork(index)}
                              >
                                Remove
                              </Button>
                            )}
                          </HStack>

                          <FormControl>
                            <FormLabel>Company</FormLabel>
                            <Input
                              value={work.company}
                              onChange={(e) => updateWork(index, 'company', e.target.value)}
                              placeholder="Company Name"
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Position</FormLabel>
                            <Input
                              value={work.position}
                              onChange={(e) => updateWork(index, 'position', e.target.value)}
                              placeholder="Job Title"
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Duration</FormLabel>
                            <Input
                              value={work.duration}
                              onChange={(e) => updateWork(index, 'duration', e.target.value)}
                              placeholder="Jan 2020 - Present"
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                              value={work.description}
                              onChange={(e) => updateWork(index, 'description', e.target.value)}
                              placeholder="Describe your responsibilities and achievements..."
                              rows={3}
                            />
                          </FormControl>
                        </VStack>
                      </Box>
                    ))}
                  </VStack>
                </TabPanel>

                {/* Education */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <HStack justify="space-between">
                      <Heading size="md" color="blue.600">Education</Heading>
                      <Button colorScheme="blue" size="sm" onClick={addEducation}>
                        Add Education
                      </Button>
                    </HStack>

                    {resumeData.education.map((edu, index) => (
                      <Box key={index} p={4} bg="gray.50" borderRadius="md" border="1px" borderColor="gray.200">
                        <VStack spacing={3} align="stretch">
                          <HStack justify="space-between">
                            <Text fontWeight="medium">Education #{index + 1}</Text>
                            {resumeData.education.length > 1 && (
                              <Button
                                size="sm"
                                colorScheme="red"
                                variant="outline"
                                onClick={() => removeEducation(index)}
                              >
                                Remove
                              </Button>
                            )}
                          </HStack>

                          <FormControl>
                            <FormLabel>School</FormLabel>
                            <Input
                              value={edu.school}
                              onChange={(e) => updateEducation(index, 'school', e.target.value)}
                              placeholder="School Name"
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Degree</FormLabel>
                            <Input
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                              placeholder="Bachelor of Science"
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Year</FormLabel>
                            <Input
                              value={edu.year}
                              onChange={(e) => updateEducation(index, 'year', e.target.value)}
                              placeholder="2020"
                            />
                          </FormControl>
                        </VStack>
                      </Box>
                    ))}
                  </VStack>
                </TabPanel>

                {/* Preview */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading size="md" color="blue.600">Resume Preview</Heading>
                    
                    <Box p={6} bg="white" borderRadius="md" border="1px" borderColor="gray.200">
                      <VStack spacing={4} align="stretch">
                        <Box textAlign="center">
                          <Heading size="xl" color="gray.800">
                            {resumeData.personal.fullName || 'Your Name'}
                          </Heading>
                          <Text color="gray.600">
                            {resumeData.personal.email || 'email@example.com'} | {resumeData.personal.phone || '+1 (555) 123-4567'}
                          </Text>
                        </Box>

                        <Divider />

                        {resumeData.personal.summary && (
                          <Box>
                            <Heading size="sm" color="blue.600" mb={2}>Summary</Heading>
                            <Text>{resumeData.personal.summary}</Text>
                          </Box>
                        )}

                        {resumeData.work.some(w => w.company || w.position) && (
                          <Box>
                            <Heading size="sm" color="blue.600" mb={3}>Work Experience</Heading>
                            {resumeData.work.filter(w => w.company || w.position).map((work, index) => (
                              <Box key={index} mb={3}>
                                <Text fontWeight="medium">{work.position} at {work.company}</Text>
                                <Text fontSize="sm" color="gray.600">{work.duration}</Text>
                                <Text fontSize="sm">{work.description}</Text>
                              </Box>
                            ))}
                          </Box>
                        )}

                        {resumeData.education.some(e => e.school || e.degree) && (
                          <Box>
                            <Heading size="sm" color="blue.600" mb={3}>Education</Heading>
                            {resumeData.education.filter(e => e.school || e.degree).map((edu, index) => (
                              <Box key={index} mb={2}>
                                <Text fontWeight="medium">{edu.degree} from {edu.school}</Text>
                                <Text fontSize="sm" color="gray.600">{edu.year}</Text>
                              </Box>
                            ))}
                          </Box>
                        )}
                      </VStack>
                    </Box>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
