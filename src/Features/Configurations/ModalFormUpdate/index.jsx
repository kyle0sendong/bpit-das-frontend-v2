import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types'

import {Button, Modal, Form, Popconfirm} from 'antd';

import ModalFormUpdateInputs from './components/ModalFormUpdateInputs';
import { useUpdateTcp, useDeleteTcp } from './hooks/useTcpData';
import { useInsertUserLog, insertUserLog } from '../../../Hooks/useUserLogs';
import { getCurrentDate, getCurrentTime } from '../../../Utils/getCurrentDate';
import { DeleteColumnPerTimebase } from './hooks/useAlterTables';

const extractUpdatedItem = (oldData, newData) => {
  const item = []

  for(const key in oldData) {
    if(newData[key] != undefined && oldData[key] != newData[key]) {
      const log = `${key.replace("_", " ")} to ${newData[key]}`
      item.push(log)
    }
  }
  return item
}

const ModalFormUpdate = (props) => {

  const { data, buttonStyle, text, tcp_analyzer_id } = props

  // Form Instance so that clicking Ok on modal also submits the form data
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync: updateTcp } = useUpdateTcp(queryClient, tcp_analyzer_id)
  const { mutateAsync: deleteTcp } = useDeleteTcp(queryClient)
  const { mutateAsync: insertLog } = useInsertUserLog(queryClient, getCurrentDate())

  const update = (values) => {
    // Check first if something is changed
    if (Object.keys(values).length+1 >= 2) {
      values.id = data.analyzerData.id

      updateTcp(values)

      const logData = {
        "username": "na",
        "full_name": "na",
        "date": getCurrentDate(),
        "time": getCurrentTime(),
        "tags": "Analyzer, Update",
        "changes": `Analyzer '${data.analyzerData.name}'. Updated ${extractUpdatedItem(data.analyzerData, values).join(". ")}`
      }
      insertUserLog(logData)

      console.log('Success:', values);
    } else {
      console.log('Updated Nothing');
    }
  }



  const deleteItem = () => {

    function getParameterNames() {
      const parameterNames = []
      if(data.parameterData.length > 0) {
        data.parameterData.forEach( (item) => {
          parameterNames.push(item.name)
          parameterNames.push(`${item.name}_status`)
        })
      }
  
      if(data.derivedParameterData.length > 0) {
        data.derivedParameterData.forEach( (item) => {
          parameterNames.push(item.name)
          parameterNames.push(`${item.name}_status`)
        })
      }
      return parameterNames
    }

    const logData = {
      "username": "na",
      "full_name": "na",
      "date": getCurrentDate(),
      "time": getCurrentTime(),
      "tags": "Analyzer, Delete",
      "changes": `Deleted Analyzer '${data.analyzerData.name}'`
    }

    const parameterNames = getParameterNames()
    if(parameterNames.length > 0) {
      DeleteColumnPerTimebase(parameterNames, data.timebaseData)
    }
    insertLog(logData)
    deleteTcp(data.analyzerData)
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const formSave = (values) => {
    setIsModalOpen(false);
    update(values)
  };

  const confirmDelete = () => {
    deleteItem();
    setIsModalOpen(false);
    navigate('/configurations/home', {replace:true})
  }

  const modalSave = () => {
    form.submit()
  };        

  const modalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type='dashed'
        style={buttonStyle}
        onClick={showModal}
      >
        {text}
      </Button>

      <Form
        form={form}
        name={`${data.analyzerData.name}${text}Update`}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 12 }}
        style={{ maxWidth: 400 }}
        initialValues={{ inputNumber: 1 }}
        onFinish={formSave}
        autoComplete="off"
      >
        {/* Modal form with customized footer */}
        <Modal
          title={data.analyzerData.name} 
          open={isModalOpen} 
          onOk={modalSave}
          onCancel={(modalCancel)}      
          footer={
            [
              <Popconfirm
                title="Delete TCP/IP Analyzer"
                description="Confirm Deletion"
                onConfirm={confirmDelete}
                okText="Yes"
                cancelText="No"
                key='Delete'
              >
                <Button style={{marginInlineEnd:'50%'}} key="delete" danger>
                  Delete
                </Button>
              </Popconfirm>,
              <Button key="back" onClick={modalCancel}>
                Cancel
              </Button>,
              <Button key="basic" htmlType="submit" onClick={modalSave}>
                Save
              </Button>,
            ]
          }
        >
          <ModalFormUpdateInputs
            form={form}
            data={data.analyzerData}
            sampling={data.analyzerData.sampling}/>

        </Modal>
      </Form>
    </>
  );
};

ModalFormUpdate.propTypes = {
  data: PropTypes.object,
  buttonStyle: PropTypes.object,
  text: PropTypes.string,
  tcp_analyzer_id: PropTypes.string,
}

export default ModalFormUpdate;