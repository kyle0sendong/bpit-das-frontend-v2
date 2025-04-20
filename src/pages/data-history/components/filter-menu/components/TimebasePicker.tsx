import { NativeSelect } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useGetAllTimebases } from "@/hooks/timebasesHook";
import { TimebasesType } from "@/types/timebases";

type TableRowsProps = {
  form: UseFormReturnType<any>;
}

const TimebasePicker = ({form}: TableRowsProps ) => {

  const timebases = useGetAllTimebases();

  if(timebases.isFetched) {

    const timebaseData: TimebasesType[] = timebases.data;

    const dataMenu: {label: string, value: string}[] = [];

    for(const data of timebaseData) {
      if(data.timebase > 0) {
        const timebase = data.timebase < 60 ? data.timebase : data.timebase >= 60 && data.timebase < 1440 ? data.timebase/60 : data.timebase/1440
        const suffix = data.timebase < 60 ? 'min.' : data.timebase >= 60 && data.timebase < 1440 ? 'hr.' : 'day/s'

        dataMenu.push({
          label: `${timebase} ${suffix}`,
          value: data.timebase.toString()
        })
      }
    }

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