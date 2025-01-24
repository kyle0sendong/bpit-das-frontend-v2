import { Paper } from "@mantine/core";
import DatePickerMenu from "./components/DatePickerMenu";

export type FormSubmitType = {
  from: string,
  to: string
}

const ToolboxMenu = () => {

  return (
    <>
      <Paper shadow="xs">
        <DatePickerMenu/>
      </Paper>
    </>
  )
}

export default ToolboxMenu