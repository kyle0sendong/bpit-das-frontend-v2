import { NativeSelect, Loader } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useGetAllVirtualChannels } from "@/hooks/virtualChannelsHook";
// import { VirtualChannelsType } from "@/types/virtualChannels";

type TableRowsProps = {
  form: UseFormReturnType<any>;
}

const VirtualChannelPicker = ({form}: TableRowsProps ) => {

  const virtualChannels = useGetAllVirtualChannels(true);

  if(virtualChannels.isLoading) {
    return (
      <Loader size="lg" />
    )
  }

  if(virtualChannels.isFetched) {
    // const virtualChannelsData: VirtualChannelsType[] = virtualChannels.data;
    
    // const dataMenu = virtualChannelsData.map((data) => {
    //   return {
    //     label: data.name,
    //     value: data.id.toString()
    //   }
    // })

    return (
      <NativeSelect
        data={[
          {label:"Select Virtual Channel", value:"-999"}, 
          {label:"All Virtual Channels", value:"all"}, 
        ]}
        key={form.key('virtualChannel')}
        {...form.getInputProps('virtualChannel')}
      />
    )
  }

}

export default VirtualChannelPicker;