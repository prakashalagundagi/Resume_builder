import React, { useState } from 'react';
import {
  ChakraProvider,
  CSSReset,
  Box,
  VStack,
  Heading,
  Input,
  Button,
  Text,
  HStack,
  Flex,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Textarea,
  Divider,
  useToast,
  IconButton,
  Tag,
  TagCloseButton,
  TagLabel
} from '@chakra-ui/react';
import { FaTrash, FaPlus, FaDownload } from 'react-icons/fa';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: 'Jhon Doe',
      role: 'Full Stack Web Developer',
      email: 'jhondoe@example.com',
      phone: '+1234567890',
      address: 'Pune, India',
      linkedin: 'linkedin.com/in/jhondoe'
    },
    education: [
      {
        id: 1,
        degree: 'B.Tech Computer Engineering',
        institution: 'College of Engineering Pune',
        year: '2014-2018',
        cgpa: '8.7'
      }
    ],
    skills: [
      'JavaScript', 'ReactJS', 'NodeJS', 'MongoDB', 'ExpressJS', 
      'PHP', '.Net', 'Java', 'RestAPI', 'jQuery', 'MySQL', 
      'Ajax', 'GitHub', 'HTML', 'CSS', 'TailwindCSS', 'Bootstrap'
    ],
    workExperience: [
      {
        id: 1,
        title: 'Full Stack Developer',
        company: 'XYZ Infotech Services',
        type: 'Full-time',
        duration: '2018-03 - 2021-12',
        description: 'Fixed bugs from existing websites and implemented enhancements that significantly improved web functionality and speed.'
      }
    ],
    projects: [
      {
        id: 1,
        name: 'Project Name',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing.'
      },
      {
        id: 2,
        name: 'Project Name',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing.'
      },
      {
        id: 3,
        name: 'Project Name',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing.'
      },
      {
        id: 4,
        name: 'Project Name',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing.'
      }
    ]
  });

  const toast = useToast();

  const handlePersonalInfoChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now(), degree: '', institution: '', year: '', cgpa: '' }
      ]
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addWorkExperience = () => {
    setResumeData(prev => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        { id: Date.now(), title: '', company: '', type: '', duration: '', description: '' }
      ]
    }));
  };

  const updateWorkExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(work => 
        work.id === id ? { ...work, [field]: value } : work
      )
    }));
  };

  const removeWorkExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(work => work.id !== id)
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: Date.now(), name: '', description: '' }
      ]
    }));
  };

  const updateProject = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const removeProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill = prompt('Enter new skill:');
    if (newSkill && newSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const downloadResume = () => {
    const resumeText = `
${resumeData.personalInfo.fullName}
${resumeData.personalInfo.role}
${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.address} | ${resumeData.personalInfo.linkedin}

EDUCATION
${resumeData.education.map(edu => `
${edu.degree} | ${edu.institution} | ${edu.year} | ${edu.cgpa ? edu.cgpa + ' CGPA' : ''}
`).join('\n')}

SKILLS
${resumeData.skills.join(', ')}

WORK EXPERIENCE
${resumeData.workExperience.map(work => `
${work.title} | ${work.company} | ${work.type}
${work.duration}
${work.description}
`).join('\n')}

PROJECTS
${resumeData.projects.map(project => `
${project.name}
${project.description}
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

  const tabs = ['About', 'Education', 'Skills', 'Work', 'Projects'];

  return (
    <ChakraProvider>
      <CSSReset />
      <Box minH="100vh" bg="gray.50">
        <Container maxW="1400px" py={4}>
          <HStack spacing={6} align="flex-start">
            {/* Left Column - Input Forms */}
            <Box flex={1} bg="white" borderRadius="lg" shadow="md" p={6}>
              <VStack spacing={4} align="stretch">
                {/* Theme Circles */}
                <HStack spacing={2} mb={4}>
                  <Box w="30px" h="30px" borderRadius="50%" bg="red.500" />
                  <Box w="30px" h="30px" borderRadius="50%" bg="blue.500" />
                  <Box w="30px" h="30px" borderRadius="50%" bg="green.500" />
                  <Box w="30px" h="30px" borderRadius="50%" bg="yellow.500" />
                  <Box w="30px" h="30px" borderRadius="50%" bg="purple.500" />
                </HStack>

                {/* Tabs */}
                <Tabs index={activeTab} onChange={setActiveTab}>
                  <TabList>
                    {tabs.map((tab, index) => (
                      <Tab key={index} fontWeight="medium">
                        {tab}
                      </Tab>
                    ))}
                  </TabList>

                  <TabPanels>
                    {/* About Tab */}
                    <TabPanel>
                      <VStack spacing={4} align="stretch">
                        <Heading size="md" color="purple.600" mb={4}>About</Heading>
                        
                        <FormControl>
                          <FormLabel>Full Name</FormLabel>
                          <Input
                            value={resumeData.personalInfo.fullName}
                            onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                            placeholder="Enter your full name"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Role</FormLabel>
                          <Input
                            value={resumeData.personalInfo.role}
                            onChange={(e) => handlePersonalInfoChange('role', e.target.value)}
                            placeholder="Enter your role"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Email</FormLabel>
                          <Input
                            value={resumeData.personalInfo.email}
                            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                            placeholder="Enter your email"
                            type="email"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Phone</FormLabel>
                          <Input
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                            placeholder="Enter your phone"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Address</FormLabel>
                          <Input
                            value={resumeData.personalInfo.address}
                            onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                            placeholder="Enter your address"
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>LinkedIn</FormLabel>
                          <Input
                            value={resumeData.personalInfo.linkedin}
                            onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                            placeholder="Enter your LinkedIn URL"
                          />
                        </FormControl>
                      </VStack>
                    </TabPanel>

                    {/* Education Tab */}
                    <TabPanel>
                      <VStack spacing={4} align="stretch">
                        <HStack justify="space-between" mb={4}>
                          <Heading size="md" color="purple.600">Education</Heading>
                          <Button
                            leftIcon={<FaPlus />}
                            colorScheme="purple"
                            size="sm"
                            onClick={addEducation}
                          >
                            Add Education
                          </Button>
                        </HStack>

                        {resumeData.education.map((edu) => (
                          <Box key={edu.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                            <VStack spacing={3} align="stretch">
                              <HStack justify="space-between">
                                <Text fontWeight="medium">Education Entry</Text>
                                <IconButton
                                  icon={<FaTrash />}
                                  size="sm"
                                  colorScheme="red"
                                  variant="ghost"
                                  onClick={() => removeEducation(edu.id)}
                                />
                              </HStack>

                              <FormControl>
                                <FormLabel>Degree</FormLabel>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                  placeholder="Enter degree"
                                />
                              </FormControl>

                              <FormControl>
                                <FormLabel>Institution</FormLabel>
                                <Input
                                  value={edu.institution}
                                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                  placeholder="Enter institution"
                                />
                              </FormControl>

                              <FormControl>
                                <FormLabel>Year</FormLabel>
                                <Input
                                  value={edu.year}
                                  onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                                  placeholder="Enter year"
                                />
                              </FormControl>

                              <FormControl>
                                <FormLabel>CGPA</FormLabel>
                                <Input
                                  value={edu.cgpa}
                                  onChange={(e) => updateEducation(edu.id, 'cgpa', e.target.value)}
                                  placeholder="Enter CGPA"
                                />
                              </FormControl>
                            </VStack>
                          </Box>
                        ))}
                      </VStack>
                    </TabPanel>

                    {/* Skills Tab */}
                    <TabPanel>
                      <VStack spacing={4} align="stretch">
                        <HStack justify="space-between" mb={4}>
                          <Heading size="md" color="purple.600">Skills</Heading>
                          <Button
                            leftIcon={<FaPlus />}
                            colorScheme="purple"
                            size="sm"
                            onClick={addSkill}
                          >
                            Add Skill
                          </Button>
                        </HStack>

                        <Box>
                          <Flex wrap="wrap" gap={2}>
                            {resumeData.skills.map((skill, index) => (
                              <Tag
                                key={index}
                                size="md"
                                variant="solid"
                                colorScheme="purple"
                                borderRadius="full"
                              >
                                <TagLabel>{skill}</TagLabel>
                                <TagCloseButton
                                  onClick={() => removeSkill(skill)}
                                />
                              </Tag>
                            ))}
                          </Flex>
                        </Box>
                      </VStack>
                    </TabPanel>

                    {/* Work Tab */}
                    <TabPanel>
                      <VStack spacing={4} align="stretch">
                        <HStack justify="space-between" mb={4}>
                          <Heading size="md" color="purple.600">Work</Heading>
                          <Button
                            leftIcon={<FaPlus />}
                            colorScheme="purple"
                            size="sm"
                            onClick={addWorkExperience}
                          >
                            Add Work
                          </Button>
                        </HStack>

                        {resumeData.workExperience.map((work) => (
                          <Box key={work.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                            <VStack spacing={3} align="stretch">
                              <HStack justify="space-between">
                                <Text fontWeight="medium">Work Entry</Text>
                                <IconButton
                                  icon={<FaTrash />}
                                  size="sm"
                                  colorScheme="red"
                                  variant="ghost"
                                  onClick={() => removeWorkExperience(work.id)}
                                />
                              </HStack>

                              <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input
                                  value={work.title}
                                  onChange={(e) => updateWorkExperience(work.id, 'title', e.target.value)}
                                  placeholder="Enter job title"
                                />
                              </FormControl>

                              <FormControl>
                                <FormLabel>Company</FormLabel>
                                <Input
                                  value={work.company}
                                  onChange={(e) => updateWorkExperience(work.id, 'company', e.target.value)}
                                  placeholder="Enter company name"
                                />
                              </FormControl>

                              <FormControl>
                                <FormLabel>Type</FormLabel>
                                <Input
                                  value={work.type}
                                  onChange={(e) => updateWorkExperience(work.id, 'type', e.target.value)}
                                  placeholder="Enter employment type"
                                />
                              </FormControl>

                              <FormControl>
                                <FormLabel>Duration</FormLabel>
                                <Input
                                  value={work.duration}
                                  onChange={(e) => updateWorkExperience(work.id, 'duration', e.target.value)}
                                  placeholder="Enter duration"
                                />
                              </FormControl>

                              <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                  value={work.description}
                                  onChange={(e) => updateWorkExperience(work.id, 'description', e.target.value)}
                                  placeholder="Enter job description"
                                  rows={3}
                                />
                              </FormControl>
                            </VStack>
                          </Box>
                        ))}
                      </VStack>
                    </TabPanel>

                    {/* Projects Tab */}
                    <TabPanel>
                      <VStack spacing={4} align="stretch">
                        <HStack justify="space-between" mb={4}>
                          <Heading size="md" color="purple.600">Projects</Heading>
                          <Button
                            leftIcon={<FaPlus />}
                            colorScheme="purple"
                            size="sm"
                            onClick={addProject}
                          >
                            Add Project
                          </Button>
                        </HStack>

                        {resumeData.projects.map((project) => (
                          <Box key={project.id} p={4} border="1px" borderColor="gray.200" borderRadius="md">
                            <VStack spacing={3} align="stretch">
                              <HStack justify="space-between">
                                <Text fontWeight="medium">Project Entry</Text>
                                <IconButton
                                  icon={<FaTrash />}
                                  size="sm"
                                  colorScheme="red"
                                  variant="ghost"
                                  onClick={() => removeProject(project.id)}
                                />
                              </HStack>

                              <FormControl>
                                <FormLabel>Project Name</FormLabel>
                                <Input
                                  value={project.name}
                                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                  placeholder="Enter project name"
                                />
                              </FormControl>

                              <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                  value={project.description}
                                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                  placeholder="Enter project description"
                                  rows={3}
                                />
                              </FormControl>
                            </VStack>
                          </Box>
                        ))}
                      </VStack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </VStack>
            </Box>

            {/* Right Column - Resume Preview */}
            <Box flex={1} bg="white" borderRadius="lg" shadow="md" p={6}>
              <VStack spacing={6} align="stretch">
                {/* Download Button */}
                <HStack justify="flex-end">
                  <Button
                    leftIcon={<FaDownload />}
                    colorScheme="purple"
                    onClick={downloadResume}
                  >
                    Download
                  </Button>
                </HStack>

                {/* Resume Content */}
                <Box>
                  {/* Header */}
                  <VStack spacing={2} align="center" mb={6}>
                    <Heading size="2xl" color="gray.800">
                      {resumeData.personalInfo.fullName}
                    </Heading>
                    <Text fontSize="xl" color="gray.600">
                      {resumeData.personalInfo.role}
                    </Text>
                    <HStack spacing={4} color="gray.600" fontSize="sm">
                      <Text>{resumeData.personalInfo.email}</Text>
                      <Text>|</Text>
                      <Text>{resumeData.personalInfo.phone}</Text>
                      <Text>|</Text>
                      <Text>{resumeData.personalInfo.address}</Text>
                      <Text>|</Text>
                      <Text>{resumeData.personalInfo.linkedin}</Text>
                    </HStack>
                  </VStack>

                  <Divider />

                  {/* Education Section */}
                  {resumeData.education.length > 0 && (
                    <Box mb={6}>
                      <Heading size="lg" color="purple.600" mb={4}>EDUCATION</Heading>
                      {resumeData.education.map((edu, index) => (
                        <Box key={index} mb={3}>
                          <Text fontWeight="bold" color="gray.800">
                            {edu.degree} | {edu.institution} | {edu.year}
                          </Text>
                          {edu.cgpa && (
                            <Text color="gray.600" fontSize="sm">
                              {edu.cgpa} CGPA
                            </Text>
                          )}
                        </Box>
                      ))}
                    </Box>
                  )}

                  {/* Skills Section */}
                  {resumeData.skills.length > 0 && (
                    <Box mb={6}>
                      <Heading size="lg" color="purple.600" mb={4}>SKILLS</Heading>
                      <Flex wrap="wrap" gap={2}>
                        {resumeData.skills.map((skill, index) => (
                          <Tag
                            key={index}
                            size="md"
                            variant="solid"
                            colorScheme="purple"
                            borderRadius="full"
                          >
                            {skill}
                          </Tag>
                        ))}
                      </Flex>
                    </Box>
                  )}

                  {/* Work Experience Section */}
                  {resumeData.workExperience.length > 0 && (
                    <Box mb={6}>
                      <Heading size="lg" color="purple.600" mb={4}>WORK EXPERIENCE</Heading>
                      {resumeData.workExperience.map((work, index) => (
                        <Box key={index} mb={4}>
                          <Text fontWeight="bold" color="gray.800" mb={2}>
                            {work.title} | {work.company} | {work.type}
                          </Text>
                          <Text color="gray.600" fontSize="sm" mb={2}>
                            {work.duration}
                          </Text>
                          <Text color="gray.700">
                            {work.description}
                          </Text>
                        </Box>
                      ))}
                    </Box>
                  )}

                  {/* Projects Section */}
                  {resumeData.projects.length > 0 && (
                    <Box>
                      <Heading size="lg" color="purple.600" mb={4}>PROJECTS</Heading>
                      {resumeData.projects.map((project, index) => (
                        <Box key={index} mb={3}>
                          <Text fontWeight="bold" color="gray.800">
                            {project.name}
                          </Text>
                          <Text color="gray.700">
                            {project.description}
                          </Text>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </VStack>
            </Box>
          </HStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
