import { VirtualChannelsType } from "@/types/virtualChannels";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modifyFormValues = (values: any) => {

  const updateParameters: Partial<VirtualChannelsType>[] = []
  const objectKeys = Object.keys(values)

  for(let i = 0; i < objectKeys.length-1; i = i+10) {

    const id = parseInt(objectKeys[i].split("_")[1]);

    const enable = values[`enable_${id}`];
    const name = values[`name_${id}`];
    const unit = values[`unit_${id}`];
    const formula = values[`formula_${id}`];
    const x = values[`x_${id}`];
    const y = values[`y_${id}`];
    const z = values[`z_${id}`];
    const a = values[`a_${id}`];
    const b = values[`b_${id}`];
    const c = values[`c_${id}`];

  
    const parameterObject: Partial<VirtualChannelsType> = {
      id,
      enable,
      name,
      unit,
      formula,
      x,
      y,
      z,
      a,
      b,
      c
    }
    updateParameters.push(parameterObject)
  }

  return updateParameters;
}

export default modifyFormValues;