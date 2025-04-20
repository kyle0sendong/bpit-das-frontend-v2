import { useState, useEffect } from "react";
import { DatePickerInput } from "@mantine/dates";
import { useSearchParams } from "react-router-dom";

import { getCurrentDate, getDateTomorrow, convertDateToStringMantineDates } from "@/utils/dates";

import classes from '../FilterMenu.module.css';

const DatePickerMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsFrom = searchParams.get("from") ?? getCurrentDate();
  const paramsTo = searchParams.get("to") ?? getDateTomorrow();

  const [value, setValue] = useState<[Date | null, Date | null]>([new Date(paramsFrom), new Date(paramsTo)]);

  // Update search params whenever `value` changes
  useEffect(() => {
    if (value[0] && value[1]) {
      setSearchParams({
        from: convertDateToStringMantineDates(value[0]),
        to: convertDateToStringMantineDates(value[1]),
      });
    }
  }, [value, setSearchParams]);

  return (
    <>
      <DatePickerInput
        type="range"
        value={value}
        onChange={setValue}
        classNames={{
          input: classes.dateInput,
        }}
      />
    </>

  )

}

export default DatePickerMenu;