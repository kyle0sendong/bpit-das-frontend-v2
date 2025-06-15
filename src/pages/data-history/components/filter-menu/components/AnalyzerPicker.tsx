import { NativeSelect, Loader } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useMemo } from "react";
import { TcpAnalyzerType } from "@/types/tcpAnalyzers";
import { SerialAnalyzerType } from "@/types/serialAnalyzers";
import { UseQueryResult } from "@tanstack/react-query";

type AnalyzerPickerProps = {
  form: UseFormReturnType<any>;
  analyzers: UseQueryResult<TcpAnalyzerType[]> | UseQueryResult<SerialAnalyzerType[]>;
  type: "tcp" | "serial";
};

const AnalyzerPicker = ({ form, analyzers, type }: AnalyzerPickerProps) => {

  const analyzerOptions = useMemo(() => {
    if (analyzers.isFetched && analyzers.data) {
      return analyzers.data.map((a) => ({
        label: a.name,
        value: `${type}-${a.id}`,
      }));
    }
    return [];
  }, [analyzers, type]);

  if (analyzers.isLoading) {
    return <Loader size="lg" />;
  }

  return (
    <NativeSelect
      data={[{ label: "Select Analyzer", value: "" }, ...analyzerOptions]}
      value={form.values.analyzer}
      key={form.key("analyzer")}
      {...form.getInputProps("analyzer")}
      onChange={(event) => {
        const value = event.currentTarget.value;
        const [selectedType] = value.split("-");

        // Set new analyzer
        form.setFieldValue("analyzer", value);
        form.setFieldValue("virtualChannel", "");

        // Clear if switching analyzer types
        if (selectedType !== type) {
          form.setFieldValue("analyzer", value);
        }
      }}
    />
  );
};

export default AnalyzerPicker;
