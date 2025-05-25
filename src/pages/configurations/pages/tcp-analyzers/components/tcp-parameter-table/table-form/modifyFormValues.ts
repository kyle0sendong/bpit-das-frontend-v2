import { ParameterType } from "@/types/parameters";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modifyFormValues = (values: any) => {
  const updateParameters: Partial<ParameterType>[] = []
  
  const handleRegisterCount = (format: string) => {
    if (!format) return 1; // Default fallback
    
    const bit = format?.split("-")[0];
    
    switch(bit) {
      case "16":
        return 1;
      case "32":
        return 2;
      case "64":
        return 4;
      default:
        return 1; // Default fallback
    }
  }

  // Extract unique IDs from the form values
  const ids = new Set<number>();
  Object.keys(values).forEach(key => {
    const match = key.match(/_(\d+)$/);
    if (match) {
      ids.add(parseInt(match[1]));
    }
  });

  // Process each unique ID
  ids.forEach(id => {
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
    
    updateParameters.push(parameterObject);
  });

  return updateParameters;
}

export default modifyFormValues;