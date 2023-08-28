import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import { TFunction } from "i18next";

export function DirectMeasureForm({
  t,
  register,
  errors,
  className,
  prefix = "",
}: {
  t: TFunction;
  register: Function;
  errors: Record<string, any>;
  className?: string;
  prefix?: string;
}) {
  return (
    <Box className={className} pl={0.5}>
      <Heading size="sm" mb={4} className="font-normal">
        {t("emission-factors-values")}{" "}
        <Tooltip
          hasArrow
          label={t("value-types-tooltip")}
          placement="bottom-start"
        >
          <InfoOutlineIcon mt={-0.5} color="content.tertiary" />
        </Tooltip>
      </Heading>
      <HStack spacing={4} mb={12} className="items-start">
        <FormControl isInvalid={!!errors.directCo2Emissions}>
          <FormLabel color="content.tertiary">
            {t("co2-emissions-value")}
          </FormLabel>
          <InputGroup>
            <NumberInput defaultValue={0}>
              <NumberInputField
                borderRightRadius={0}
                {...register(prefix + "co2Emissions", { required: t("value-required") })}
              />
            </NumberInput>
            <InputRightAddon
              bgColor="base.light"
              color="content.tertiary"
            >
              tCO2e
            </InputRightAddon>
          </InputGroup>
          <FormErrorMessage>{errors.directCo2Emissions?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.directCh4Emissions}>
          <FormLabel color="content.tertiary">
            {t("ch4-emissions-value")}
          </FormLabel>
          <InputGroup>
            <NumberInput defaultValue={0}>
              <NumberInputField
                borderRightRadius={0}
                {...register(prefix + "ch4Emissions", { required: t("value-required") })}
              />
            </NumberInput>
            <InputRightAddon
              bgColor="base.light"
              color="content.tertiary"
            >
              tCH4e
            </InputRightAddon>
          </InputGroup>
          <FormErrorMessage>{errors.directCh4Emissions?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.directN2oEmissions}>
          <FormLabel color="content.tertiary">
            {t("n2o-emissions-value")}
          </FormLabel>
          <InputGroup>
            <NumberInput defaultValue={0}>
              <NumberInputField
                borderRightRadius={0}
                {...register(prefix + "n2oEmissions", { required: t("value-required") })}
              />
            </NumberInput>
            <InputRightAddon
              bgColor="base.light"
              color="content.tertiary"
            >
              tN2Oe
            </InputRightAddon>
          </InputGroup>
          <FormErrorMessage>{errors.directN2oEmissions?.message}</FormErrorMessage>
        </FormControl>
      </HStack>
      <FormControl isInvalid={!!errors.directDataQuality} mb={12}>
        <FormLabel>{t("data-quality")}</FormLabel>
        <Select placeholder={t("data-quality-placeholder")} {...register(prefix + "dataQuality", {required: t("option-required")})}>
          <option value="high">{t("detailed-emissions-data")}</option>
          <option value="medium">{t("modeled-emissions-data")}</option>
          <option value="low">{t("highly-modeled-uncertain-emissions-data")}</option>
        </Select>
        <FormErrorMessage>{errors.directDataQuality?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.directSourceReference}>
        <FormLabel>{t("source-reference")}</FormLabel>
        <Textarea placeholder={t("source-reference-placeholder")} {...register(prefix + "sourceReference", { required: t("source-reference-required") })} />
        <FormErrorMessage>{errors.directSourceReference?.message}</FormErrorMessage> 
      </FormControl>
    </Box>
  );
}
