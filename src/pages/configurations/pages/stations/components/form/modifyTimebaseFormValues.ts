import { TimebasesType } from "@/types/timebases"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const modifyTimebaseFormValues = (values: any) => {

  const updateTimebase: Partial<TimebasesType>[] = []
  const objectKeys = Object.keys(values)

  for(let i = 0; i < objectKeys.length; i += 0) {

    const timebase = parseInt(objectKeys[i].split("_")[1]);
    const enable = values[`timebase_${timebase}`] ?? '';
    const timebaseObject: Partial<TimebasesType> = {
      timebase: timebase
    }
    let pushObject = false;
    if (enable !== '') {
      i++;
      timebaseObject.enable = enable;
      pushObject = true;
    }

    if(pushObject) {
      updateTimebase.push(timebaseObject)
    }
  }
  return updateTimebase;
}

export default modifyTimebaseFormValues;