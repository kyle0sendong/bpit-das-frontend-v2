import PropTypes from 'prop-types'

import { Form, Input, Button, Row, Checkbox, Spin, Flex, message} from "antd"
import { LoadingOutlined, CheckCircleTwoTone, ExclamationCircleTwoTone} from '@ant-design/icons'

import { CreateTimebaseCheckbox } from "./components/CreateTimebaseCheckbox";

import { useUpdateSite } from "./hooks/useSiteData";
import { useUpdateTimebase, useInsertTimebase, useDeleteTimebase } from "./hooks/useTimebaseData";
import { useQueryClient } from "@tanstack/react-query";
import { InsertTable, InsertParameterColumns } from './utils/useAlterTable';
import { isValidTimebase } from './utils/duplicateCheck';

const updateSite = (newData, oldData, mutate) => {

  Object.keys(oldData).forEach( (item) => {
    if(newData[item] != oldData[item] && item != 'id') {
      mutate(newData)
    }
  })
  return 'Updated nothing' 
}

// This uses counter to count changes in the timebase data
// this decides whether to update data or not
function isChangeTimebase(newData, oldData) {
  let counter = 0
  oldData.forEach( (i) => {
    if( i.enable == 1) {
      counter++
    }
    newData.forEach( (j) => {
      if(i.timebase == j && i.enable == 1) {
        counter--
      }

      if(i.timebase == j && i.enable == 0) {
        counter++
      }
    })
  })
  return counter > 0
}

const updateAllTimebase = (newData, oldData, mutate) => {

  // modify data to enable
  if(isChangeTimebase(newData, oldData)) {
    oldData.map( (item) => {
      item.enable = 0
      newData.forEach( (enabled) => {
        if(item.timebase == enabled) {
          item.enable = 1
        }
      })
    })
    let res = ''
    oldData.map( (item) => {
      res = mutate(item)
    })
    return res
  }
  return 'Updated Nothing'
}

export default function InputForm(props) {

  const [form] = Form.useForm();

  const queryClient = useQueryClient()
  const { data } = props

  const { 
    mutateAsync: mutateSite, 
    isPending: siteUpdatePending,
    isSuccess: siteUpdateSuccess,
    isError: siteUpdateError
  } = useUpdateSite(queryClient)
  
  const {
    mutateAsync: updateTimebase,
    isPending: timebaseUpdatePending,
    isSuccess: timebaseUpdateSuccess,
    isError: timebaseUpdateError
  } = useUpdateTimebase(queryClient)

  const {
    mutateAsync: insertTimebase,
    isPending: timebaseInsertPending,
    isSuccess: timebaseInsertSuccess,
    isError: timebaseInsertError
  } = useInsertTimebase(queryClient)

  const {
    mutateAsync: deleteTimebase
  } = useDeleteTimebase(queryClient)

  const save = async (values) => {

    const timebaseValues = [...values.timebase, ...values.customTimebase]
    updateAllTimebase(timebaseValues, data.timebase, updateTimebase)

    if(values.newTimebase) {
      if(isValidTimebase(data.timebase, values.newTimebase)) {
        insertTimebase({'enable': 0, 'timebase': values.newTimebase, 'custom': 1})
        InsertTable(values.newTimebase)
        InsertParameterColumns(data.parameterData, values.newTimebase)
        InsertParameterColumns(data.derivedParameterData, values.newTimebase)
        form.setFieldValue("newTimebase", '')
      } else {
        message.warning("Please enter a unique timebase.")
        form.setFieldValue("newTimebase", '')
      }
    }
    
    delete values.newTimebase
    delete values.timebase
    delete values.customTimebase
    
    values.id = data.site[0].id
    updateSite(values, data.site[0], mutateSite)

  }

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 15,
    },
  }

  const rowStyle = {width:"95%", marginInlineStart:"4%", minWidth:"200px"}
  return (
    <>
      <Form
        {...formItemLayout}
        name="test"
        form={form}
        onFinish={save}
        initialValues={{
          timebase: extractTimebase(data.timebase, 'timebase'),
          customTimebase: extractTimebase(data.timebase, 'timebase', 1),
          name: data.site[0].name,
          location: data.site[0].location
        }}
      >
        <Form.Item id="name" key="name" name="name" label="Name">
          <Input placeholder="" style={rowStyle}/>
        </Form.Item>
        <Form.Item id="location" key="location" name="location" label="Location">
          <Input placeholder="" style={rowStyle}/>
        </Form.Item>

        <Form.Item id="timebase" key="timebase" name="timebase" label="Timebase">
          <Checkbox.Group style={{width:"100%", minWidth:"200px", overflow:'hidden'}}>
            <Row>
              <CreateTimebaseCheckbox isCustom={false} timebaseData={data.timebase}/>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item id="customTimebase" key="customTimebase" name="customTimebase" label="Custom Timebase">
          <Checkbox.Group style={{width:"100%", minWidth:"200px", overflow:'hidden'}}>
            <Row>
              <CreateTimebaseCheckbox isCustom={true} timebaseData={data.timebase} mutateDelete={deleteTimebase}/>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item id="newTimebase" key="newTimebase" name="newTimebase" label="New Timebase">
          <Input placeholder="Input in Minutes" style={rowStyle}/>
        </Form.Item>

        <Flex style={{justifyContent:'flex-end', width:'75%', margin:'auto'}}>
          <span style={{marginInline:'1rem'}}>
            {
              (siteUpdatePending || timebaseUpdatePending || timebaseInsertPending) &&
                <Spin
                  indicator={
                    <LoadingOutlined
                      spin
                    />
                  }
                />
            }
            {
              (siteUpdateSuccess || timebaseUpdateSuccess || timebaseInsertSuccess) &&
                <span style={{margin:'auto'}}>
                  <CheckCircleTwoTone twoToneColor="#52c41a"/>
                </span>
            }
            {
              (siteUpdateError || timebaseUpdateError || timebaseInsertError) &&
                <span>
                  <ExclamationCircleTwoTone twoToneColor="#ffa500"/>
                </span>
            }
          </span>

          <span>
            <Button onClick={()=>form.submit()} disabled={(siteUpdatePending || timebaseUpdatePending || timebaseInsertPending)}>
              Save
            </Button>
          </span>
        </Flex>

      </Form>
    </>
  )
}

function extractTimebase(item, itemName, isCustom='0') {
  const itemArray = []
  item.map((item) => {
    if(item.enable == '1' && item.custom == isCustom) {
      itemArray.push(item[itemName].toString())
    }
  })
  return itemArray
}

InputForm.propTypes = {
  data: PropTypes.object,
  queryClient: PropTypes.object
}
