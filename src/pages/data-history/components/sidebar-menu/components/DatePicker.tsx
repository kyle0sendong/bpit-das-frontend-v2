import { useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { FormSubmitType } from "../SidebarMenu";
import { DatePickerInput } from '@mantine/dates';

import { convertDateToString } from "@/utils/dates";

type TableRowsProps = {
  form: UseFormReturnType<Partial<FormSubmitType>>;
}

const DatePicker = ({form}: TableRowsProps ) => {
  const dateToday = new Date();

  const [from, setFrom] = useState<Date | null>(dateToday);
  const [to, setTo] = useState<Date | null>(null);

  return (
    <>
      <DatePickerInput
        placeholder="Pick Start Date"
        value={from}
        key={form.key('from')}
        onChange={(value) => {
          setFrom(value)
          form.setFieldValue('from', convertDateToString(value))
        }}
      />

      <DatePickerInput
        placeholder="Pick End Date (Optional)"
        value={to}
        key={form.key('to')}
        onChange={(value) => {
          setTo(value)
          form.setFieldValue('to', convertDateToString(value))
        }}
      />
    </>
  )

}

export default DatePicker;