import { Flex, NativeSelect } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormSubmitType } from "../SidebarMenu";

type TableRowsProps = {
  form: UseFormReturnType<Partial<FormSubmitType>>;
}

const AnalyzerPicker = ({form}: TableRowsProps ) => {
  return (
    <Flex direction="column" mx="xs" mb="sm">
      <NativeSelect
        data={['1 minute', '5 minutes']}
        key={form.key('analyzer')}
        {...form.getInputProps('analyzer')}
      />
    </Flex>
  )
}

export default AnalyzerPicker;