import React, { useRef } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Button,
  Card,
  CardHeader,
  CardBody,
  useToast,
  SimpleGrid,
  Badge,
  Container
} from '@chakra-ui/react';
import { DownloadIcon, PrintIcon } from '@chakra-ui/icons';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumePreview = ({ resumeData }) => {
  const componentRef = useRef();
  const toast = useToast();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${resumeData.personal.fullName || 'Resume'}`,
    onAfterPrint: () => {
      toast({
        title: 'Resume printed successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const handleDownloadPDF = async () => {
    try {
      toast({
        title: 'Generating PDF...',
        status: 'info',
        duration: 1000,
        isClosable: true,
      });

      const element = componentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resumeData.personal.fullName || 'resume'}.pdf`);

      toast({
        title: 'PDF downloaded successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Error generating PDF',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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

  const groupedSkills = resumeData.skills.reduce((acc, skill) => {
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
            <HStack justify="space-between" align="center">
              <Box>
                <Heading size="lg" color="blue.600" mb={2}>
                  Resume Preview
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  This is how your resume will look when printed or downloaded
                </Text>
              </Box>
              <HStack spacing={2}>
                <Button
                  leftIcon={<PrintIcon />}
                  colorScheme="blue"
                  variant="outline"
                  onClick={handlePrint}
                >
                  Print
                </Button>
                <Button
                  leftIcon={<DownloadIcon />}
                  colorScheme="blue"
                  onClick={handleDownloadPDF}
                >
                  Download PDF
                </Button>
              </HStack>
            </HStack>

            <Divider />

            {/* Resume Content */}
            <Box
              ref={componentRef}
              bg="white"
              p={8}
              borderRadius="md"
              boxShadow="sm"
              minH="842px" // A4 height in pixels at 96 DPI
            >
              {/* Header */}
              <VStack spacing={4} align="center" mb={6}>
                <Heading size="2xl" color="gray.800" textAlign="center">
                  {resumeData.personal.fullName || 'Your Name'}
                </Heading>
                <HStack spacing={4} fontSize="sm" color="gray.600" wrap="wrap" justify="center">
                  {resumeData.personal.email && (
                    <Text>{resumeData.personal.email}</Text>
                  )}
                  {resumeData.personal.phone && (
                    <Text>• {resumeData.personal.phone}</Text>
                  )}
                  {resumeData.personal.address && (
                    <Text>• {resumeData.personal.address}</Text>
                  )}
                </HStack>
                <HStack spacing={4} fontSize="sm" color="blue.600" wrap="wrap" justify="center">
                  {resumeData.personal.linkedin && (
                    <Text>{resumeData.personal.linkedin}</Text>
                  )}
                  {resumeData.personal.github && (
                    <Text>• {resumeData.personal.github}</Text>
                  )}
                </HStack>
              </VStack>

              {/* Summary */}
              {resumeData.personal.summary && (
                <Box mb={6}>
                  <Heading size="md" color="gray.800" mb={2}>
                    Professional Summary
                  </Heading>
                  <Text color="gray.700" lineHeight="1.6">
                    {resumeData.personal.summary}
                  </Text>
                </Box>
              )}

              {/* Work Experience */}
              {resumeData.workExperience.length > 0 && (
                <Box mb={6}>
                  <Heading size="md" color="gray.800" mb={4}>
                    Work Experience
                  </Heading>
                  <VStack spacing={4} align="stretch">
                    {resumeData.workExperience.map((exp, index) => (
                      <Box key={index}>
                        <HStack justify="space-between" align="start" mb={2}>
                          <VStack align="start" spacing={1}>
                            <Heading size="sm" color="blue.600">
                              {exp.position}
                            </Heading>
                            <Text fontWeight="medium">{exp.company}</Text>
                          </VStack>
                          <VStack align="end" spacing={1}>
                            <Text fontSize="sm" color="gray.600">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </Text>
                            {exp.location && (
                              <Text fontSize="sm" color="gray.600">
                                {exp.location}
                              </Text>
                            )}
                          </VStack>
                        </HStack>
                        {exp.description && (
                          <Text color="gray.700" fontSize="sm" lineHeight="1.6">
                            {exp.description}
                          </Text>
                        )}
                      </Box>
                    ))}
                  </VStack>
                </Box>
              )}

              {/* Education */}
              {resumeData.education.length > 0 && (
                <Box mb={6}>
                  <Heading size="md" color="gray.800" mb={4}>
                    Education
                  </Heading>
                  <VStack spacing={4} align="stretch">
                    {resumeData.education.map((edu, index) => (
                      <Box key={index}>
                        <HStack justify="space-between" align="start" mb={2}>
                          <VStack align="start" spacing={1}>
                            <Heading size="sm" color="blue.600">
                              {edu.degree}
                            </Heading>
                            <Text fontWeight="medium">{edu.institution}</Text>
                            {edu.field && (
                              <Text fontSize="sm" color="gray.600">
                                {edu.field}
                              </Text>
                            )}
                          </VStack>
                          <VStack align="end" spacing={1}>
                            <Text fontSize="sm" color="gray.600">
                              {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                            </Text>
                            {edu.gpa && (
                              <Text fontSize="sm" color="gray.600">
                                GPA: {edu.gpa}
                              </Text>
                            )}
                          </VStack>
                        </HStack>
                        {edu.achievements && (
                          <Text color="gray.700" fontSize="sm" lineHeight="1.6">
                            {edu.achievements}
                          </Text>
                        )}
                      </Box>
                    ))}
                  </VStack>
                </Box>
              )}

              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <Box>
                  <Heading size="md" color="gray.800" mb={4}>
                    Skills
                  </Heading>
                  <VStack spacing={3} align="stretch">
                    {Object.entries(groupedSkills).map(([category, skills]) => (
                      <Box key={category}>
                        <Text fontWeight="medium" color="gray.700" mb={2}>
                          {category}:
                        </Text>
                        <HStack spacing={2} wrap="wrap">
                          {skills.map((skill, index) => (
                            <Badge
                              key={index}
                              colorScheme={getLevelColor(skill.level)}
                              fontSize="sm"
                              px={2}
                              py={1}
                              borderRadius="md"
                            >
                              {skill.name}
                            </Badge>
                          ))}
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              )}
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ResumePreview;
