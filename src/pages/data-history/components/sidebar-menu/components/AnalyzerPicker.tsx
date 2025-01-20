import { NativeSelect, Loader } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormSubmitType } from "../SidebarMenu";

import { useGetAllParameters } from "@/hooks/parametersHook";
import { ParametersType } from "@/types/parameters";

type TableRowsProps = {
  form: UseFormReturnType<Partial<FormSubmitType>>;
}

const AnalyzerPicker = ({form}: TableRowsProps ) => {

  const parameters = useGetAllParameters();

  if(parameters.isLoading) {
    return (
      <Loader size="lg" />
    )
  }

  if(parameters.isFetched) {
    const parameterData: ParametersType[] = parameters.data;
    const dataMenu = parameterData.map( (data) => {
      return {
        label: data.name,
        value: data.id.toString()
      }
    })

    return (
      <NativeSelect
        data={[{label:"Select Analyzer", value:"-999"}, ...dataMenu]}
        key={form.key('analyzer')}
        {...form.getInputProps('analyzer')}
      />
    )
  }

}

export default AnalyzerPicker;