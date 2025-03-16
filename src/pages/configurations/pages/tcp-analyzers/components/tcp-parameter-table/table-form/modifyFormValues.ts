import { ParameterType } from "@/types/parameters";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modifyFormValues = (values: any) => {

  const updateParameters: Partial<ParameterType>[] = []
  const objectKeys = Object.keys(values)
  for(let i = 0; i < objectKeys.length; i += 0) {

    const id = parseInt(objectKeys[i].split("-")[0]);

    const enable = values[`${id}-enable`] ?? '';
    const name = values[`${id}-name`] ?? '';
    const unit = values[`${id}-unit`] ?? '';
    const request_interval = values[`${id}-request_interval`] ?? '';
    const format = values[`${id}-format`] ?? '';
    const function_code = values[`${id}-function_code`] ?? '';
    const start_register_address = values[`${id}-start_register_address`] ?? '';
    const register_count = values[`${id}-register_count`] ?? '';
    const formula = values[`${id}-formula`] ?? '';

    const parameterObject: Partial<ParameterType> = {
      id: id
    }

    let pushObject = false;
    if (enable !== '') {
      i++;
      parameterObject.enable = enable;
      pushObject = true;
    }
    if (name !== '') {
      i++;
      parameterObject.name = name;
      pushObject = true;
    }
    if (unit !== '') {
      i++;
      parameterObject.unit = unit;
      pushObject = true;
    }
    if (request_interval !== '') {
      i++;
      parameterObject.request_interval = request_interval;
      pushObject = true;
    }
    if (format !== '') {
      i++;
      parameterObject.format = format;
      pushObject = true;
    }
    if (function_code !== '') {
      i++;
      parameterObject.function_code = function_code;
      pushObject = true;
    }
    if (start_register_address !== '') {
      i++;
      parameterObject.start_register_address = start_register_address;
      pushObject = true;
    }
    if (register_count !== '') {
      i++;
      parameterObject.register_count = register_count;
      pushObject = true;
    }
    if (formula !== '') {
      i++;
      parameterObject.formula = formula;
      pushObject = true;
    }

    if(pushObject) {
      updateParameters.push(parameterObject)
    }
  }

  return updateParameters;
}

export default modifyFormValues;