import { NativeSelect, Loader } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormSubmitType } from "../SidebarMenu";

import { useGetAllTcpAnalyzers } from "@/hooks/tcpAnalyzersHook";
import { TcpAnalyzerType } from "@/types/tcpAnalyzers";

type TableRowsProps = {
  form: UseFormReturnType<Partial<FormSubmitType>>;
}

const AnalyzerPicker = ({form}: TableRowsProps ) => {

  const analyzers = useGetAllTcpAnalyzers();

  if(analyzers.isLoading) {
    return (
      <Loader size="lg" />
    )
  }

  if(analyzers.isFetched) {
    const parameterData: TcpAnalyzerType[] = analyzers.data;
    const dataMenu = parameterData.map( (data) => {
      return {
        label: data.name,
        value: data.id.toString()
      }
    })

    return (
      <NativeSelect
        data={[{label:"Select Analyzer", value:"-999"}, ...dataMenu]}
        key={form.key('tcp_analyzer')}
        {...form.getInputProps('tcp_analyzer')}
      />
    )
  }

}

export default AnalyzerPicker;