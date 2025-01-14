import { VirtualChannelsType } from "@/types/virtualChannels";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modifyFormValues = (values: any) => {

  const updateParameters: Partial<VirtualChannelsType>[] = []
  const objectKeys = Object.keys(values)
  for(let i = 0; i < objectKeys.length; i += 0) {

    const id = parseInt(objectKeys[i].split("-")[0]);

    const enable = values[`${id}-enable`] ?? '';
    const name = values[`${id}-name`] ?? '';
    const unit = values[`${id}-unit`] ?? '';
    const formula = values[`${id}-formula`] ?? '';
    const x = values[`${id}-x`] ?? '';
    const y = values[`${id}-y`] ?? '';
    const z = values[`${id}-z`] ?? '';
    const a = values[`${id}-a`] ?? '';
    const b = values[`${id}-b`] ?? '';
    const c = values[`${id}-c`] ?? '';
  
    const parameterObject: Partial<VirtualChannelsType> = {
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
    if (formula !== '') {
      i++;
      parameterObject.formula = formula;
      pushObject = true;
    }
    if (x !== '') {
      i++;
      parameterObject.x = x;
      pushObject = true;
    }
    if (y !== '') {
      i++;
      parameterObject.y = y;
      pushObject = true;
    }
    if (z !== '') {
      i++;
      parameterObject.z = z;
      pushObject = true;
    }
    if (a !== '') {
      i++;
      parameterObject.a = a;
      pushObject = true;
    }
    if (b !== '') {
      i++;
      parameterObject.b = b;
      pushObject = true;
    }
    if (c !== '') {
      i++;
      parameterObject.c = c;
      pushObject = true;
    }

    if(pushObject) {
      updateParameters.push(parameterObject)
    }
  }
  console.log(updateParameters)
  return updateParameters;
}

export default modifyFormValues;