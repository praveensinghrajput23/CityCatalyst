"use client";

import { CircleIcon, DataAlertIcon } from "@/components/icons";
import WizardSteps from "@/components/wizard-steps";
import { useTranslation } from "@/i18n/client";
import { ArrowBackIcon, WarningIcon } from "@chakra-ui/icons";
import { Center, Link, Spinner } from "@chakra-ui/react";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  IconButton,
  Progress,
  SimpleGrid,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useDisclosure,
  useSteps,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiTarget, FiTrash2, FiTruck } from "react-icons/fi";
import {
  MdAdd,
  MdArrowDropDown,
  MdArrowDropUp,
  MdCheckCircle,
  MdHomeWork,
  MdOutlineCheckCircle,
  MdOutlineEdit,
  MdOutlineFactory,
  MdOutlineHomeWork,
  MdOutlineHouse,
  MdOutlineSkipNext,
  MdPlaylistAddCheck,
} from "react-icons/md";
import { SourceDrawer } from "./SourceDrawer";
import { SubsectorDrawer } from "./SubsectorDrawer";
import subSectorData from "./subsectors.json";
import { SegmentedProgress } from "@/components/SegmentedProgress";
import { api } from "@/services/api";
import { SectorProgress } from "@/util/types";
import { ScopeAttributes } from "@/models/Scope";

// export default async function ServerWrapper({params}: {params: any}) {
//   const session = await getServerSession(authOptions);
//   const user = await getUserInfo(session?.user.id);
//   return AddDataSteps({params, session});
// }

export default function AddDataSteps({
  params: { lng, step },
}: {
  params: { lng: string; step: string };
}) {
  const { t } = useTranslation(lng, "data");
  const router = useRouter();

  const { data: userInfo, isLoading: isUserInfoLoading } =
    api.useGetUserInfoQuery();
  const locode = userInfo?.defaultCityLocode;
  const year = userInfo?.defaultInventoryYear;

  const { data: inventoryProgress, isLoading: isInventoryProgressLoading } =
    api.useGetInventoryProgressQuery(
      { locode: locode!, year: year! },
      { skip: !locode || !year },
    );

  const { data: dataSources, isLoading: areDataSourcesLoading } =
    api.useGetAllDataSourcesQuery(
      { inventoryId: inventoryProgress?.inventoryId! },
      { skip: !inventoryProgress },
    );

  const steps = [
    {
      title: t("stationary-energy"),
      details: t("stationary-energy-details"),
      icon: MdOutlineHomeWork,
      connectedProgress: 0,
      addedProgress: 0,
      referenceNumber: "I",
    },
    {
      title: t("transportation"),
      details: t("transportation-details"),
      icon: FiTruck,
      connectedProgress: 0,
      addedProgress: 0,
      referenceNumber: "II",
    },
    {
      title: t("waste"),
      details: t("waste-details"),
      icon: FiTrash2,
      connectedProgress: 0,
      addedProgress: 0,
      referenceNumber: "III",
    },
  ];
  if (inventoryProgress != null) {
    const progress = inventoryProgress.sectorProgress;
    for (const step of steps) {
      const sectorProgress: SectorProgress | undefined = progress.find(
        (p) => p.sector.referenceNumber === step.referenceNumber,
      );
      if (!sectorProgress) {
        console.error(
          "No progress entry found for sector",
          step.referenceNumber,
        );
        continue;
      }
      if (sectorProgress.total === 0) {
        continue;
      }
      step.connectedProgress = sectorProgress.thirdParty / sectorProgress.total;
      step.addedProgress = sectorProgress.uploaded / sectorProgress.total;
    }
  }

  const { activeStep, goToNext, setActiveStep } = useSteps({
    index: Number(step) - 1,
    count: steps.length,
  });
  const onStepSelected = (selectedStep: number) => {
    setActiveStep(selectedStep);
  };
  useEffect(() => {
    // change step param in URL without reloading
    const newPath = location.pathname.replace(
      /\/[0-9]+$/,
      `/${activeStep + 1}`,
    );
    history.replaceState("", "", newPath);
  }, [activeStep]);
  const currentStep = steps[activeStep];
  const totalStepCompletion =
    currentStep.connectedProgress + currentStep.addedProgress;
  const formatPercentage = (percentage: number) =>
    Math.round(percentage * 1000) / 10;

  const [selectedSource, setSelectedSource] = useState<DataSource>();
  const {
    isOpen: isSourceDrawerOpen,
    onClose: onSourceDrawerClose,
    onOpen: onSourceDrawerOpen,
  } = useDisclosure();
  const onSourceClick = (source: DataSource) => {
    setSelectedSource(source);
    onSourceDrawerOpen();
  };

  const onConnectClick = (source: DataSource) => {
    console.log("Connect source", source);
    onSourceDrawerClose();
  };

  const [selectedSubsector, setSelectedSubsector] = useState<SubSector>();
  const {
    isOpen: isSubsectorDrawerOpen,
    onClose: onSubsectorDrawerClose,
    onOpen: onSubsectorDrawerOpen,
  } = useDisclosure();
  const subSectors: SubSector[] = subSectorData[activeStep];
  const onSubsectorClick = (subsector: SubSector) => {
    console.log(subsector);
    setSelectedSubsector(subsector);
    onSubsectorDrawerOpen();
  };
  const onSubsectorSave = (subsector: SubSector) => {
    console.log("Save subsector", subsector);
  };

  const [isConfirming, setConfirming] = useState(false);
  const onConfirm = async () => {
    setConfirming(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setConfirming(false);
    if (activeStep >= steps.length - 1) {
      router.push("/"); // go back to dashboard until there is a confirmation page
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      goToNext();
    }
  };

  const onSkip = () => {
    if (activeStep >= steps.length - 1) {
      router.push("/"); // go back to dashboard until there is a confirmation page
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      goToNext();
    }
  };

  const [isDataSectionExpanded, setDataSectionExpanded] = useState(false);

  return (
    <div className="pt-16 w-[1090px] max-w-full mx-auto px-4">
      <Button
        variant="ghost"
        leftIcon={<ArrowBackIcon boxSize={6} />}
        onClick={() => router.back()}
      >
        {t("go-back")}
      </Button>
      <div className="w-full flex md:justify-center mb-8">
        <div className="lg:w-[900px] max-w-full">
          <WizardSteps
            currentStep={activeStep}
            steps={steps}
            onSelect={onStepSelected}
          />
        </div>
      </div>
      {/*** Sector summary section ***/}
      <Card mb={12}>
        <Flex direction="row">
          <Icon
            as={currentStep.icon}
            boxSize={8}
            color="brand.secondary"
            mr={4}
          />
          <div className="space-y-4 w-full">
            <Heading size="lg" mb={2}>
              {currentStep.title}
            </Heading>
            <Text color="content.tertiary">{currentStep.details}</Text>
            <Flex direction="row">
              <SegmentedProgress
                values={[
                  currentStep.connectedProgress,
                  currentStep.addedProgress,
                ]}
                height={4}
              />
              <Heading size="sm" ml={6} className="whitespace-nowrap -mt-1">
                {t("completion-percent", {
                  progress: formatPercentage(totalStepCompletion),
                })}
              </Heading>
            </Flex>
            <Tag mr={4}>
              <TagLeftIcon
                as={CircleIcon}
                boxSize={6}
                color="interactive.quaternary"
              />
              <TagLabel>
                {t("data-connected-percent", {
                  progress: formatPercentage(currentStep.connectedProgress),
                })}
              </TagLabel>
            </Tag>
            <Tag>
              <TagLeftIcon
                as={CircleIcon}
                boxSize={6}
                color="interactive.tertiary"
              />
              <TagLabel>
                {t("data-added-percent", {
                  progress: formatPercentage(currentStep.addedProgress),
                })}
              </TagLabel>
            </Tag>
          </div>
        </Flex>
      </Card>
      {/*** Third party data source section ***/}
      <Card mb={12}>
        <Heading size="lg" mb={2}>
          {t("check-data-heading")}
        </Heading>
        <Text color="content.tertiary" mb={12}>
          {t("check-data-details")}
        </Text>
        <SimpleGrid minChildWidth="250px" spacing={4}>
          {areDataSourcesLoading ? (
            <Center>
              <Spinner size="lg" />
            </Center>
          ) : !dataSources ? (
            <Center>
              <WarningIcon boxSize={8} color="semantic.danger" />
            </Center>
          ) : (
            dataSources
              .slice(0, isDataSectionExpanded ? dataSources.length : 6)
              .map((source) => (
                <Card
                  key={source.datasourceId}
                  onClick={() => onSourceClick(source)}
                  variant="outline"
                  borderColor={
                    (source.isConnected && "interactive.tertiary") || undefined
                  }
                  borderWidth={2}
                  className="shadow-none hover:drop-shadow-xl transition-shadow"
                >
                  {/* TODO add icon to DataSource */}
                  <Icon as={MdHomeWork} boxSize={9} mb={6} />
                  <Heading size="sm" noOfLines={2}>
                    {source.name}
                  </Heading>
                  <Flex direction="row" my={4}>
                    <Tag mr={1}>
                      <TagLeftIcon
                        as={MdPlaylistAddCheck}
                        boxSize={4}
                        color="content.tertiary"
                      />
                      <TagLabel fontSize={12}>
                        {t("data-quality")}:{" "}
                        {t("quality-" + source.dataQuality)}
                      </TagLabel>
                    </Tag>
                    <Tag>
                      <TagLeftIcon
                        as={FiTarget}
                        boxSize={4}
                        color="content.tertiary"
                      />
                      <TagLabel fontSize={12}>
                        {t("scope")}:{" "}
                        {source.scopes
                          .map((s: ScopeAttributes) => s.scopeName)
                          .join(", ")}
                      </TagLabel>
                    </Tag>
                  </Flex>
                  <Text color="content.tertiary" noOfLines={5}>
                    {source.description}
                  </Text>
                  <Link className="underline" mt={4} mb={6}>
                    {t("see-more-details")}
                  </Link>
                  {source.isConnected ? (
                    <Button
                      variant="solidPrimary"
                      px={6}
                      py={4}
                      leftIcon={<Icon as={MdCheckCircle} />}
                    >
                      {t("data-connected")}
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      bgColor="background.neutral"
                      onClick={() => onConnectClick(source)}
                    >
                      {t("connect-data")}
                    </Button>
                  )}
                </Card>
              ))
          )}
        </SimpleGrid>
        {dataSources && dataSources.length > 6 && (
          <Button
            variant="ghost"
            color="content.tertiary"
            onClick={() => setDataSectionExpanded(!isDataSectionExpanded)}
            mt={8}
            fontWeight="normal"
            rightIcon={
              <Icon
                boxSize={6}
                as={isDataSectionExpanded ? MdArrowDropUp : MdArrowDropDown}
              />
            }
          >
            {t(isDataSectionExpanded ? "less-datasets" : "more-datasets")}
          </Button>
        )}
      </Card>
      {/*** Manual data entry section for subsectors ***/}
      <Card mb={48}>
        <Heading size="lg" mb={2}>
          {t("add-data-heading")}
        </Heading>
        <Text color="content.tertiary" mb={12}>
          {t("add-data-details")}
        </Text>
        <Heading size="sm" mb={4}>
          {t("select-subsector")}
        </Heading>
        <SimpleGrid minChildWidth="250px" spacing={4}>
          {subSectors.map((subSector) => (
            <Card
              maxHeight="120px"
              height="120px"
              w="full"
              className="hover:drop-shadow-xl transition-shadow"
              onClick={() => onSubsectorClick(subSector)}
              key={subSector.id}
            >
              <Flex direction="row" className="space-x-4 items-center h-full">
                <Icon
                  as={subSector.isAdded ? MdOutlineCheckCircle : DataAlertIcon}
                  boxSize={8}
                  color={
                    subSector.isAdded
                      ? "interactive.tertiary"
                      : "sentiment.warningDefault"
                  }
                />
                <Stack w="full">
                  <Heading size="xs" noOfLines={3} maxWidth="200px">
                    {t(subSector.title)}
                  </Heading>
                  <Text color="content.tertiary">
                    {t("scope")}: {subSector.scopes.join(", ")}
                  </Text>
                </Stack>
                <IconButton
                  aria-label={t("edit-subsector")}
                  variant="solidIcon"
                  icon={
                    <Icon
                      as={subSector.isAdded ? MdOutlineEdit : MdAdd}
                      boxSize={6}
                    />
                  }
                />
              </Flex>
            </Card>
          ))}
        </SimpleGrid>
      </Card>
      {/*** Bottom bar ***/}
      <div className="bg-white w-full fixed bottom-0 left-0 border-t-4 border-brand py-4 px-4 drop-shadow-2xl hover:drop-shadow-4xl transition-all">
        <Box className="w-[1090px] max-w-full mx-auto flex flex-row flex-wrap gap-y-2">
          <Box className="grow w-full md:w-0">
            <Text fontSize="sm">Step {activeStep + 1}</Text>
            <Text fontSize="2xl" as="b">
              {steps[activeStep]?.title}
            </Text>
          </Box>
          <Button
            h={16}
            onClick={onSkip}
            variant="ghost"
            leftIcon={<Icon as={MdOutlineSkipNext} boxSize={6} />}
            size="sm"
            px={8}
            mr={4}
          >
            {t("skip-step-button")}
          </Button>
          <Button
            h={16}
            isLoading={isConfirming}
            px={8}
            onClick={onConfirm}
            size="sm"
          >
            {t("save-continue-button")}
          </Button>
        </Box>
      </div>
      {/*** Drawers ***/}
      <SourceDrawer
        source={selectedSource}
        isOpen={isSourceDrawerOpen}
        onClose={onSourceDrawerClose}
        onConnectClick={() => onConnectClick(selectedSource!)}
        t={t}
      />
      <SubsectorDrawer
        subsector={selectedSubsector}
        isOpen={isSubsectorDrawerOpen}
        onClose={onSubsectorDrawerClose}
        onSave={onSubsectorSave}
        t={t}
      />
    </div>
  );
}
