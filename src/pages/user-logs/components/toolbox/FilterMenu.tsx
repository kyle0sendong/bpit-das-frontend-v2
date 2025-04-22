import DatePickerMenu from "./components/DatePickerMenu";
import classes from './FilterMenu.module.css';
export type FormSubmitType = {
  from: string,
  to: string
}

const ToolboxMenu = () => {

  return (
    <div className={classes.input_container}>
      <p>Date</p>
      <DatePickerMenu/>
    </div>
  )
}

export default ToolboxMenu