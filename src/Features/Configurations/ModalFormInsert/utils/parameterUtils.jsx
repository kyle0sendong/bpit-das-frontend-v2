
import { InsertColumnPerTimebase } from "../hooks/useAlterTable";
import { PARAMETER_DEFAULT } from '../constants/parameterDefaults';
import { DERIVED_PARAMETER_DEFAULT } from "../constants/derivedParameterDefaults";
import { createRandomNumber } from './rng'


export const insertParameterPerTimebase = (values, tcp_id, mutate, timebases, insertType) => {

  const DEFAULT = insertType == 'parameter' ? PARAMETER_DEFAULT : DERIVED_PARAMETER_DEFAULT

  for(let i=0; i < values.inputNumber; i++) {
    const currentValues = {tcp_analyzer_id: tcp_id}

    DEFAULT.map((item) => {
      const randomNumber = createRandomNumber()
      if(item.index == 'name') {
        currentValues.name = `${item.value}${randomNumber}`
      } else {
        currentValues[item.index] = item.value
      }
    })
    mutate(currentValues)

    InsertColumnPerTimebase(currentValues.name, timebases)
  }
}

export const insertParameterCurrentValuesPerTimebase = (values, tcp_id, mutate, timebases, insertType) => {

  const DEFAULT = insertType == 'parameter' ? PARAMETER_DEFAULT : DERIVED_PARAMETER_DEFAULT

  for(let i=0; i < values.inputNumber; i++) {
    const currentValues = {tcp_analyzer_id: tcp_id}

    DEFAULT.map((item) => {
      const randomNumber = createRandomNumber()
      if(item.index == 'name') {
        currentValues.name = `${item.value}${randomNumber}`
      } else {
        currentValues[item.index] = item.value
      }
    })
    mutate(currentValues)

    InsertColumnPerTimebase(currentValues.name, timebases)
  }
}
