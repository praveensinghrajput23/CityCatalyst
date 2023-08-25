import { RadioButton } from "@/components/radio-button";
import { ArrowBackIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  Tooltip,
  useRadioGroup,
} from "@chakra-ui/react";
import { RefObject, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Trans } from "react-i18next/TransWithoutContext";
import { TFunction } from "i18next";

type Inputs = {
  valueType: string;
  methodology: string;
  activityDataAmount?: number;
  activityDataUnit: string;
  emissionFactorType: string;
  co2EmissionFactor: number;
  n2oEmissionFactor: number;
  ch4EmissionFactor: number;
  sourceReference: string;
};

const defaultValues: Inputs = {
  valueType: "",
  methodology: "",
  activityDataAmount: undefined,
  activityDataUnit: "kWh",
  emissionFactorType: "Local",
  co2EmissionFactor: 10,
  n2oEmissionFactor: 10,
  ch4EmissionFactor: 10,
  sourceReference: "",
};

const activityDataUnits = ["kWh", "Unit1", "Unit2", "Unit3"];
const emissionFactorTypes = [
  "Local",
  "Regional",
  "National",
  "IPCC",
  "Add custom",
];

function FuelCombustionTab({
  t,
  register,
  errors,
}: {
  t: TFunction;
  register: Function;
  errors: Record<string, any>;
}) {
  return (
    <TabPanel px={0.5}>
      <HStack spacing={4} mb={12} className="items-start">
        <FormControl isInvalid={!!errors.activityDataAmount}>
          <FormLabel>
            {t("activity-data-amount")}{" "}
            <Tooltip
              hasArrow
              label={t("value-types-tooltip")}
              placement="bottom-start"
            >
              <InfoOutlineIcon mt={-0.5} color="contentTertiary" />
            </Tooltip>
          </FormLabel>
          <InputGroup>
            <NumberInput defaultValue={0} min={0} w="full">
              <NumberInputField
                placeholder={t("activity-data-amount-placeholder")}
                borderRightRadius={0}
                {...register("activityDataAmount", {
                  required: t("activity-data-amount-required"),
                })}
              />
            </NumberInput>
            <InputRightAddon className="border-l-2" pl={4} pr={0} bgColor="white">
              <Select variant="unstyled" {...register("activityDataUnit")}>
                {activityDataUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </Select>
            </InputRightAddon>
          </InputGroup>
          <FormErrorMessage>
            {errors.activityDataAmount?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>{t("emission-factor-type")}</FormLabel>
          <Select {...register("emissionFactorType")}>
            {emissionFactorTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormControl>
      </HStack>
      <Heading size="sm" mb={4} className="font-normal">
        {t("emission-factors-values")}{" "}
        <Tooltip
          hasArrow
          label={t("value-types-tooltip")}
          placement="bottom-start"
        >
          <InfoOutlineIcon mt={-0.5} color="contentTertiary" />
        </Tooltip>
      </Heading>
      <HStack spacing={4} mb={5}>
        <FormControl>
          <FormLabel color="contentTertiary">
            {t("co2-emission-factor")}
          </FormLabel>
          <InputGroup>
            <NumberInput defaultValue={0} min={0}>
              <NumberInputField
                borderRightRadius={0}
                {...register("co2EmissionFactor")}
                bgColor="backgroundNeutral"
              />
            </NumberInput>
            <InputRightAddon
              bgColor="backgroundNeutral"
              color="contentTertiary"
            >
              CO2/kWh
            </InputRightAddon>
          </InputGroup>
          <FormHelperText>&nbsp;</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel color="contentTertiary">
            {t("n2o-emission-factor")}
          </FormLabel>
          <InputGroup>
            <NumberInput defaultValue={0} min={0}>
              <NumberInputField
                borderRightRadius={0}
                {...register("n2oEmissionFactor")}
                bgColor="backgroundNeutral"
              />
            </NumberInput>
            <InputRightAddon
              bgColor="backgroundNeutral"
              color="contentTertiary"
            >
              N2O/kWh
            </InputRightAddon>
          </InputGroup>
          <FormHelperText color="contentTertiary">
            {t("optional")}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel color="contentTertiary">
            {t("ch4-emission-factor")}
          </FormLabel>
          <InputGroup>
            <NumberInput defaultValue={0} min={0}>
              <NumberInputField
                borderRightRadius={0}
                {...register("ch4EmissionFactor")}
                bgColor="backgroundNeutral"
              />
            </NumberInput>
            <InputRightAddon
              bgColor="backgroundNeutral"
              color="contentTertiary"
            >
              CH4/kWh
            </InputRightAddon>
          </InputGroup>
          <FormHelperText color="contentTertiary">
            {t("optional")}
          </FormHelperText>
        </FormControl>
      </HStack>
      <HStack className="items-start" mb={5}>
        <InfoOutlineIcon mt={1} color="contentLink" />
        <Text color="contentTertiary">{t("emissions-factor-details")}</Text>
      </HStack>
      <FormControl isInvalid={!!errors.sourceReference} mb={12}>
        <FormLabel>{t("source-reference")}</FormLabel>
        <Textarea
          placeholder={t("source-reference-placeholder")}
          {...register("sourceReference", {
            required: t("source-reference-required"),
          })}
        />
        <FormErrorMessage>{errors.sourceReference?.message}</FormErrorMessage>
      </FormControl>
      <HStack className="items-start" mb={13}>
        <InfoOutlineIcon mt={1} color="contentLink" />
        <Text color="contentTertiary">
          <Trans
            t={t}
            i18nKey="calculations-details"
            values={{ gwpValue: 1337 }}
          >
            All calculations consider a <b>GWP value of X</b>.
          </Trans>
        </Text>
      </HStack>
    </TabPanel>
  );
}

function GridEnergyTab({
  t,
  register,
  errors,
}: {
  t: TFunction;
  register: Function;
  errors: Record<string, any>;
}) {
  return <TabPanel px={0.5}>Two</TabPanel>;
}

export function SubsectorDrawer({
  subsector,
  isOpen,
  onClose,
  finalFocusRef,
  onSave,
  t,
}: {
  subsector?: SubSector;
  isOpen: boolean;
  onClose: () => void;
  onSave: (subsector: SubSector) => void;
  finalFocusRef?: RefObject<any>;
  t: TFunction;
}) {
  const [isSaving, setSaving] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("Sector data", data);
    setSaving(true);
    onSave(subsector!);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSaving(false);
    onClose();
  };

  const {
    getRootProps: getValueTypeRootProps,
    getRadioProps: getValueTypeRadioProps,
    value: valueType,
    setValue: setValueType,
  } = useRadioGroup({
    name: "valueType",
    onChange: console.log, // TODO change section after radio using this
  });
  const valueTypeGroup = getValueTypeRootProps();

  const {
    getRootProps: getMethodologyRootProps,
    getRadioProps: getMethodologyRadioProps,
    value: methodology,
    setValue: setMethodology,
  } = useRadioGroup({
    name: "methodology",
    onChange: console.log,
  });
  const methodologyGroup = getMethodologyRootProps();

  // reset form values when choosing another subsector
  useEffect(() => {
    reset(defaultValues);
    setMethodology("");
    setValueType("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subsector]);

  const isSubmitEnabled = !!valueType && !!methodology;

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="xl"
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent px={0} py={0} className="overflow-auto">
        <Box h="full" px={16} py={12}>
          <Button
            variant="ghost"
            leftIcon={<ArrowBackIcon boxSize={6} />}
            onClick={onClose}
            px={6}
            py={4}
            mb={6}
          >
            {t("go-back")}
          </Button>
          {subsector && (
            <DrawerBody className="space-y-6" p={0}>
              <Heading size="sm">
                {t("sector")} - {t(subsector.sectorName)}
              </Heading>
              <Heading size="lg">{t(subsector.title)}</Heading>
              <Text color="contentTertiary">
                {t(subsector.title + "-description")}
              </Text>
              <Heading size="md">{t("enter-subsector-data")}</Heading>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Heading size="sm">
                  {t("value-types")}{" "}
                  <Tooltip
                    hasArrow
                    label={t("value-types-tooltip")}
                    placement="bottom-start"
                  >
                    <InfoOutlineIcon mt={-1} color="contentTertiary" />
                  </Tooltip>
                </Heading>
                <HStack
                  spacing={4}
                  {...valueTypeGroup}
                  {...register("valueType")}
                >
                  <RadioButton
                    {...getValueTypeRadioProps({ value: "one-value" })}
                  >
                    {t("one-value")}
                  </RadioButton>
                  <RadioButton
                    {...getValueTypeRadioProps({ value: "subcategory-values" })}
                  >
                    {t("subcategory-values")}
                  </RadioButton>
                </HStack>
                <Box
                  className={`${valueType ? undefined : "invisible"} space-y-6`}
                >
                  <Heading size="sm">
                    {t("select-methodology")}{" "}
                    <Tooltip
                      hasArrow
                      label={t("methodology-tooltip")}
                      bg="contentSecondary"
                      color="baseLight"
                      placement="bottom-start"
                    >
                      <InfoOutlineIcon mt={-1} color="contentTertiary" />
                    </Tooltip>
                  </Heading>
                  <HStack
                    spacing={4}
                    {...methodologyGroup}
                    {...register("methodology")}
                  >
                    <RadioButton
                      {...getMethodologyRadioProps({ value: "activity-data" })}
                    >
                      {t("activity-data")}
                    </RadioButton>
                    <RadioButton
                      {...getMethodologyRadioProps({ value: "direct-measure" })}
                    >
                      {t("direct-measure")}
                    </RadioButton>
                  </HStack>
                  <Tabs className={methodology ? undefined : "invisible"}>
                    <TabList>
                      <Tab>{t("fuel-combustion")}</Tab>
                      <Tab>{t("grid-supplied-energy")}</Tab>
                    </TabList>
                    <TabPanels>
                      <FuelCombustionTab
                        t={t}
                        register={register}
                        errors={errors}
                      />
                      <GridEnergyTab
                        t={t}
                        register={register}
                        errors={errors}
                      />
                    </TabPanels>
                  </Tabs>
                </Box>
              </form>
            </DrawerBody>
          )}
          <Stack w="full" py={6} className="drop-shadow-top border-t-2">
            <Button
              onClick={handleSubmit(onSubmit)}
              isDisabled={!isSubmitEnabled}
              isLoading={isSaving}
              type="submit"
              formNoValidate
              w="full"
              h={16}
            >
              {t("add-data")}
            </Button>
          </Stack>
        </Box>
      </DrawerContent>
    </Drawer>
  );
}
