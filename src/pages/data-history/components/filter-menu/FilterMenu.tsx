import classes from "./FilterMenu.module.css";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Button, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";

import DatePicker from "./components/DatePicker";
import TimebasePicker from "./components/TimebasePicker";
import AnalyzerPicker from "./components/AnalyzerPicker";
import VirtualChannelPicker from "./components/VirtualChannelPicker";

import { useGetAllTcpAnalyzers } from "@/hooks/tcpAnalyzersHook";
import { useGetAllSerialAnalyzers } from "@/hooks/serialAnalyzersHook";

import { getCurrentDate } from "@/utils/dates";

export type FormSubmitType = {
  timebase?: string;
  analyzer?: string;
  virtualChannel?: string;
  from?: string;
  to?: string;
};

const SidebarMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFrom = searchParams.get("from");
  const queryTo = searchParams.get("to");
  const queryTimebase = searchParams.get("timebase");

  const tcpAnalyzers = useGetAllTcpAnalyzers(true);
  const serialAnalyzers = useGetAllSerialAnalyzers(true);

  const validateInputs = (values: Partial<FormSubmitType>) =>
    (!values.analyzer || values.analyzer.trim() === "") &&
    (!values.virtualChannel || values.virtualChannel.trim() === "");

    
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      timebase: queryTimebase || "1",
      from: queryFrom || getCurrentDate(),
      to: queryTo || undefined,
    },

    
    validate: (values) => ({
      from: !values.from ? (
        <p style={{ color: "red", textAlign: "center" }}>Please select a date.</p>
      ) : null,
      analyzer: validateInputs(values)
        ? <p style={{ color: "red", textAlign: "center" }}>Please select an analyzer.</p>
        : null,
      virtualChannel: validateInputs(values)
        ? <p style={{ color: "red", textAlign: "center" }}>Please select an analyzer.</p>
        : null,
    }),
  });
  const queryAnalyzerType = searchParams.get("analyzerType");
  const queryAnalyzerId = searchParams.get("analyzerId");
    console.log(queryAnalyzerId)
    // Set initial analyzer value on mount
    useEffect(() => {
      console.log(queryAnalyzerId, queryAnalyzerType)
      if (queryAnalyzerType && queryAnalyzerId) {
        form.setFieldValue("analyzer", `${queryAnalyzerType}-${queryAnalyzerId}`);
      }
    }, [queryAnalyzerId, queryAnalyzerType]);

  const formOnSubmit = (values: FormSubmitType, view: "table" | "graph") => {
    if (validateInputs(values) || !values.from) {
      return; // prevent submission if validation fails
    }

    const [type, id] = values.analyzer ? values.analyzer.split("-") : [undefined, undefined];

    setSearchParams({
      ...(values.timebase && { timebase: values.timebase }),
      ...(values.from && { from: values.from }),
      ...(values.to && { to: values.to }),
      ...(values.analyzer && { analyzerId: id, analyzerType: type }),
      ...(values.virtualChannel && { virtualChannel: values.virtualChannel }),
      view,
    });

  };

  return (
    <nav className={classes.navbar}>
      <form onSubmit={form.onSubmit((values) => formOnSubmit(values, "table"))}>
        <Flex direction="column" className={classes.input_container}>
          <Flex direction="column" mx="xs" mb="xs">
            <p>View Type</p>
            <Flex direction="row" gap="xs" justify="center" className={classes.button_container}>
              <Button
                color="black"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  form.onSubmit((values) => formOnSubmit(values, "table"))();
                }}
              >
                Table View
              </Button>
              <Button
                color="black"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  form.onSubmit((values) => formOnSubmit(values, "graph"))();
                }}
              >
                Graph View
              </Button>
            </Flex>
          </Flex>

          <Flex direction="column" mx="xs" mb="xs">
            <p>Date</p>
            <DatePicker form={form} />
          </Flex>

          <Flex direction="column" mx="xs" mb="xs">
            <p>Timebase</p>
            <TimebasePicker form={form} />
          </Flex>

          <Flex direction="column" mx="xs" mb="xs">
            <p>Modbus TCP Analyzers</p>
            <AnalyzerPicker form={form} analyzers={tcpAnalyzers} type="tcp" />
          </Flex>

          <Flex direction="column" mx="xs" mb="xs">
            <p>Serial Analyzers</p>
            <AnalyzerPicker form={form} analyzers={serialAnalyzers} type="serial" />
          </Flex>

          <Flex direction="column" mx="xs" mb="xs">
            <p>Virtual Channels</p>
            <VirtualChannelPicker form={form} />
          </Flex>
        </Flex>
      </form>
    </nav>
  );
};

export default SidebarMenu;
