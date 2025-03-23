import { ParameterType } from "@/types/parameters";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modifyFormValues = (values: any) => {

  const updateParameters: Partial<ParameterType>[] = []
  const objectKeys = Object.keys(values)

  const handleRegisterCount = (format: string) => {
    const bit = format.split(" ")[0];
    switch(bit) {
      case "16-bit":
        return 1;
      case "32-bit":
        return 2;
      case "64-bit":
        return 4;
    }
  }

  for(let i = 0; i < objectKeys.length-1; i = i+9) {

    const id = parseInt(objectKeys[i].split("_")[1]);

    const enable = values[`enable_${id}`];
    const name = values[`name_${id}`];
    const unit = values[`unit_${id}`];
    const request_interval = values[`request_interval_${id}`];
    const format = values[`format_${id}`];
    const function_code = values[`function_code_${id}`];
    const start_register_address = values[`start_register_address_${id}`];
    const register_count = handleRegisterCount(format);
    const formula = values[`formula_${id}`];

    const parameterObject: Partial<ParameterType> = {
      id,
      enable,
      name,
      unit,
      request_interval,
      format,
      function_code,
      start_register_address,
      register_count,
      formula
    }
    updateParameters.push(parameterObject)
  }

  return updateParameters;
}

export default modifyFormValues;