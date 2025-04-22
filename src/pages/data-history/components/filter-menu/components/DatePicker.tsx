import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { DatePickerInput } from '@mantine/dates';
import { UseFormReturnType } from "@mantine/form";

import { getCurrentDate, convertDateToStringMantineDates } from "@/utils/dates";
import classes from '../FilterMenu.module.css';

type TableRowsProps = {
  form: UseFormReturnType<any>;
}

const DatePicker = ({form}: TableRowsProps ) => {
  const [searchParams] = useSearchParams();

  const paramsFrom = searchParams.get("from") ?? getCurrentDate();
  const paramsTo = searchParams.get("to") ?? getCurrentDate();

  const [value, setValue] = useState<[Date | null, Date | null]>([new Date(paramsFrom), new Date(paramsTo)]);

  // Update search params whenever `value` changes
  useEffect(() => {
    if (value[0] && value[1]) {
      form.setFieldValue('from', convertDateToStringMantineDates(value[0]))
      form.setFieldValue('to', convertDateToStringMantineDates(value[1]))
    }
  }, [value, form]);

  return (
    <>
      <DatePickerInput
        placeholder="Pick Start Date"
        type="range"
        value={value}
        key={form.key('date-range')}
        onChange={(value) => setValue(value)}
        withAsterisk
        classNames={{
          input: classes.dateInput,
        }}
      />
    </>
  )

}

export default DatePicker;