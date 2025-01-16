import { useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { FormSubmitType } from "../SidebarMenu";
import { DatePickerInput } from '@mantine/dates';

type TableRowsProps = {
  form: UseFormReturnType<Partial<FormSubmitType>>;
}

const DatePicker = ({form}: TableRowsProps ) => {

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <>
      <DatePickerInput
        placeholder="Pick Start Date"
        value={startDate}
        key={form.key('startDate')}
        onChange={(value) => {
          setStartDate(value)
          form.setFieldValue('startDate', value)
        }}
      />

      <DatePickerInput
        placeholder="Pick End Date"
        value={endDate}
        key={form.key('endDate')}
        onChange={(value) => {
          setEndDate(value)
          form.setFieldValue('endDate', value)
        }}
      />
    </>
  )

}

export default DatePicker;