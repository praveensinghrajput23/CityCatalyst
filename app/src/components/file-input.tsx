import { Box, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";
import React, { useState, DragEvent, ChangeEvent } from "react";
import { FiUpload } from "react-icons/fi";

interface FileUploadProps {
  onFileSelect: (file: File) => void; // Define a type for the onFileSelect prop
}

const FileInput: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [dragging, setDragging] = useState<boolean>(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!dragging) {
      setDragging(true);
    }
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <VStack
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderWidth={2}
      borderRadius="md"
      borderColor={dragging ? "content.link" : "background.overlay"}
      h="206px"
      backgroundColor="background.transparentGrey"
      borderStyle="dashed"
      w="100%"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Input
        type="file"
        onChange={handleChange}
        size="lg"
        display="none"
        id="file-upload"
      />
      <FormLabel cursor="pointer" htmlFor="file-upload">
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          gap=""
        >
          <Box
            color="base.light"
            h="48px"
            w="48px"
            bg="content.link"
            borderRadius="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb="12px"
          >
            <FiUpload size="20px" />
          </Box>
          <Box display="flex">
            <Text
              size="title.md"
              fontFamily="heading"
              color="content.link"
              textDecoration="underline"
              fontWeight="semibold"
            >
              Click to upload
            </Text>{" "}
            <Text size="title.md" fontWeight="semibold" fontFamily="heading">
              &nbsp;or drag and drop file
            </Text>
          </Box>
          <Text fontSize="body.sm" mt="4px">
            CSV or JSON (max 2MB)
          </Text>
        </Box>
      </FormLabel>
    </VStack>
  );
};

export default FileInput;
