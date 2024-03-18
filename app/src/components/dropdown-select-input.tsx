import React, { useState } from "react";
import {
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  Checkbox,
  List,
  ListItem,
  Text,
  Input,
} from "@chakra-ui/react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { SubSectorWithRelations } from "@/app/[lng]/data/[step]/types";
import { UseFormRegister, UseFormSetValue, useForm } from "react-hook-form";
import { FileData } from "./Modals/add-file-data-modal";

interface DropdownSelectProps {
  subsectors: SubSectorWithRelations[] | null;
  setValue: UseFormSetValue<FileData>;
}

const DropdownSelectInput: React.FC<DropdownSelectProps> = ({
  subsectors,
  setValue,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== value));
    }
  };

  const handleRemoveItem = (item: string) => {
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem !== item),
    );
  };

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const handleShowdropDown = () => {
    setShowDropdown((prev) => !prev);
  };

  const subsectorValues = selectedItems.slice().join(",");
  setValue("subsectors", subsectorValues.length ? subsectorValues : "");

  return (
    <Box className="w-full">
      <Box
        borderWidth="1px"
        borderColor={showDropdown ? "interactive.secondary" : "border.neutral"}
        borderRadius="4px"
        w="full"
        minH="48px"
        display="flex"
        alignItems="center"
        px="16px"
        onClick={handleShowdropDown}
        py={selectedItems.length > 2 ? "12px" : "0px"}
      >
        <Box w="full">
          {selectedItems.length ? (
            ""
          ) : (
            <Text
              w="full"
              pos="relative"
              lineHeight="24px"
              fontWeight="400"
              color="content.tertiary"
              letterSpacing="wide"
            >
              Select the sub-sectors included in this file
            </Text>
          )}
          {selectedItems.map((item) => (
            <Tag
              key={item}
              mt={2}
              mr={2}
              size="md"
              borderRadius="full"
              variant="solid"
              color="content.alternative"
              bg="background.neutral"
              maxW="150px"
            >
              <TagLabel>{item}</TagLabel>
              <TagCloseButton
                onClick={() => handleRemoveItem(item)}
                color="content.alternative"
              />
            </Tag>
          ))}
          <Box w="full"></Box>
        </Box>
        <Box h="24px" w="24px">
          {!showDropdown ? (
            <MdArrowDropDown size="24px" />
          ) : (
            <MdArrowDropUp size="24px" />
          )}
        </Box>
      </Box>
      {showDropdown && (
        <Box
          w="full"
          h="300px"
          pos="absolute"
          bg="white"
          overflow="scroll"
          borderRadius="8px"
          shadow="2dp"
          py="16px"
          zIndex="50"
        >
          <List>
            {subsectors?.map((subsector) => (
              <ListItem
                key={subsector.subsectorId}
                display="flex"
                p="16px"
                alignItems="center"
                gap="16px"
                _hover={{
                  color: "white",
                  bg: "content.link",
                  cursor: "pointer",
                }}
              >
                <Checkbox
                  top={2}
                  pos="relative"
                  onChange={(e) =>
                    handleCheckboxChange(e, subsector.subsectorName!)
                  }
                />
                <Text>{subsector.subsectorName}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default DropdownSelectInput;
