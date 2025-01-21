import { useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import { FormSubmitType } from "../SidebarMenu";
import { DatePickerInput } from '@mantine/dates';
import { DateValue } from "@mantine/dates";

import { useSearchParams } from "react-router-dom";

import { getCurrentDate } from "@/utils/dates";

const convertDateToString = (date: DateValue) => {
  const month = date?.getMonth() ?? 1;
  const convertedDate = `${date?.getFullYear()}-${month + 1}-${date?.getDate()}`
  return convertedDate;
}

type TableRowsProps = {
  form: UseFormReturnType<Partial<FormSubmitType>>;
}

const DatePicker = ({form}: TableRowsProps ) => {
  const [searchParams] = useSearchParams();

  const paramsFrom = searchParams.get("from") ?? getCurrentDate();
  const paramsTo = searchParams.get("to");

  const [from, setFrom] = useState<Date | null>(new Date(paramsFrom));
  const [to, setTo] = useState<Date | null>(paramsTo ? new Date(paramsTo) : null);

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