import { NativeSelect, Loader } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

import { TcpAnalyzerType } from "@/types/tcpAnalyzers";
import { SerialAnalyzerType } from "@/types/serialAnalyzers";
import { UseQueryResult } from "@tanstack/react-query";

type TableRowsProps = {
  form: UseFormReturnType<any>;
  analyzers: UseQueryResult<TcpAnalyzerType[]> | UseQueryResult<SerialAnalyzerType[]>
  type: string
}

const AnalyzerPicker = ({form, analyzers, type}: TableRowsProps ) => {

  if(analyzers.isLoading) {
    return (
      <Loader size="lg" />
    )
  }

  if(analyzers.isFetched) {
    const analyzerData = analyzers.data;
    if(analyzerData) {
      const dataMenu = analyzerData.map( (data) => {
        return {
          label: data.name,
          value: `${type}-${data.id.toString()}`
        }
      })
  
      return (
        <NativeSelect
          data={[{label:"Select Analyzer", value:"0"}, ...dataMenu]}
          key={form.key(`analyzer`)}
          {...form.getInputProps(`analyzer`)}
        />
      )
    } else {
      <NativeSelect
        data={[{label:"No Analyzer Detected", value:"0"}]}
        key={form.key(`analyzer`)}
        {...form.getInputProps(`analyzer`)}
      />
    }

  }

}

export default AnalyzerPicker;