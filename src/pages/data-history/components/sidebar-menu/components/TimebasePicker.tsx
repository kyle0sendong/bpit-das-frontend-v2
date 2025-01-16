import { NativeSelect } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormSubmitType } from "../SidebarMenu";
import { useGetAllTimebases } from "@/hooks/timebasesHook";
import { TimebasesType } from "@/types/timebases";

type TableRowsProps = {
  form: UseFormReturnType<Partial<FormSubmitType>>;
}

const TimebasePicker = ({form}: TableRowsProps ) => {

  const timebases = useGetAllTimebases();

  if(timebases.isFetched) {

    const timebaseData: TimebasesType[] = timebases.data;
    const dataMenu = timebaseData.map( (data) => {
      const suffix = data.timebase < 60 ? 'minute/s' : data.timebase >= 60 ? 'hour/s' : 'day/s'
      return {
        label: `${data.timebase} ${suffix}`,
        value: data.id.toString()
      }
    })
    return (
      <NativeSelect
        data={dataMenu}
        key={form.key('timebase')}
        {...form.getInputProps('timebase')}
      />
    )

  }

}

export default TimebasePicker;