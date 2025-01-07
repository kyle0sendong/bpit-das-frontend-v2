import { Col, Checkbox, Button } from "antd"
import { DeleteTable } from "../utils/useAlterTable"

function getHoursAndMinutes(timeInMinutes) {
  const hours = Math.floor(timeInMinutes/60)
  const minutes = timeInMinutes % 60
  return `${hours}H ${minutes}min`

}

function getDayHoursMinutes(timeInMinutes) {
  const days = String(Math.floor(timeInMinutes/1440)) + "D "
  const hours = (timeInMinutes % 1440) > 60 ? String(Math.floor((timeInMinutes % 1440) / 60)) + "H " : ' '
  const minutes = (timeInMinutes % 1440) < 60 ? String(timeInMinutes % 1440) + "min": ''
  return `${days}${hours}${minutes}`
}

const createDeleteButton = (isCustom, timebase, mutate) => {
  if(isCustom) {
    return (
      <Button
        danger
        type="dashed"
        size="small"
        onClick={ ()=> {
            mutate({"timebase":timebase})
            DeleteTable(timebase)
          }
        }
      >
        X
      </Button>
    )
  }
}

const getColumn = (timebases, isCustom, mutateDelete) => {
  
  return timebases.filter(
    (item) => {
      if(item.custom == isCustom){
        return item
      }
    }
  ).map((value) => {
    const timebase = value.timebase
    if(timebase < 60) {
      return (
        <Col span={10} key={`${timebase}`} 
          style={{display:'flex', justifyContent:'space-between', paddingBlock:'0.2em', marginInline:'3%'}}
        >
          <Checkbox
            value={`${timebase}`}
            disabled={timebase == 1 ? true : false}
          >
            <div>
              {timebase} {timebase > 1 ? 'minutes' : 'minute'}
            </div>
          </Checkbox>
          <div>
            {createDeleteButton(isCustom, timebase, mutateDelete)}
          </div>
        </Col>
      )
    } else if(timebase < 1440 && timebase % 60 == 0) {
      return (
        <Col span={10} key={`${timebase}`} 
          style={{display:'flex', justifyContent:'space-between', paddingBlock:'0.2em', marginInline:'3%'}}
        >
          <Checkbox value={`${timebase}`}>
            <div>
              {Math.round(timebase/60*100)/100} {timebase > 60 ? 'hours' : 'hour'}
            </div>
          </Checkbox>
          <div>
            {createDeleteButton(isCustom, timebase, mutateDelete)}
          </div>
        </Col>
      )
    } else if(timebase < 1440 && timebase % 60 != 0) {
      return (
        <Col span={10} key={`${timebase}`}  
          style={{display:'flex', justifyContent:'space-between', paddingBlock:'0.2em', marginInline:'3%'}}
        >
          <Checkbox value={`${timebase}`}>
            <div>
              {getHoursAndMinutes(timebase)}
            </div>
          </Checkbox>
          <div>
            {createDeleteButton(isCustom, timebase, mutateDelete)}
          </div>
        </Col>
      )
    } else if (timebase >= 1440 && timebase % 1440 == 0) {
      return (
        <Col span={10} key={`${timebase}`} 
          style={{display:'flex', justifyContent:'space-between', paddingBlock:'0.2em', marginInline:'3%'}}
        >
          <Checkbox value={`${timebase}`}>
            <div>
              {timebase/1440} {timebase > 1440 ? 'days' : 'day'}
            </div>
          </Checkbox>
          <div>
            {createDeleteButton(isCustom, timebase, mutateDelete)}
          </div>
        </Col>
      )
    }     
    else if (timebase >= 1440 && timebase % 1440 != 0){
      return (
        <Col span={10} key={`${timebase}`} 
          style={{display:'flex', justifyContent:'space-between', paddingBlock:'0.2em', marginInline:'3%'}}
        >
          <Checkbox value={`${timebase}`}>
            <div>
              {getDayHoursMinutes(timebase)}
            </div>
          </Checkbox>
          <div>
            {createDeleteButton(isCustom, timebase, mutateDelete)}
          </div>
        </Col>
      )
    }
  })
}

export function CreateTimebaseCheckbox(props) {
  const {isCustom, timebaseData, mutateDelete} = props
  timebaseData.sort( (a,b,) => a.timebase - b.timebase)
  return getColumn(timebaseData, isCustom, mutateDelete)
}