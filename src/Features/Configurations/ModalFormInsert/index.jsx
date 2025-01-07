import { useState } from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, Form } from 'antd';
import { useQueryClient } from '@tanstack/react-query';

import ModalFormInsertInputs from './components/ModalFormInsertInputs';

import { useInsertTcp } from './hooks/useTcpData';
// import { InsertTablesPerTimebase } from './hooks/useAlterTable';
import { useInsertParameter } from './hooks/useParameterData'
import { useInsertUserLog } from "../../../Hooks/useUserLogs";
import { insertParameterPerTimebase } from './utils/parameterUtils'
import { useInsertDerivedParameter } from './hooks/useDerivedParameterData'; 
import { getCurrentDate, getCurrentTime } from '../../../Utils/getCurrentDate';

const ModalFormInsert = (props) => {

  const { buttonStyle, inputs, tableName, text, tcp_analyzer_id, inputType, timebaseData } = props
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient()
  const {mutateAsync: insertParameter} = useInsertParameter(queryClient, tcp_analyzer_id)
  const {mutateAsync: insertDerivedParameter} = useInsertDerivedParameter(queryClient, tcp_analyzer_id)
  const {mutateAsync: insertTcp} = useInsertTcp(queryClient)
  const {mutateAsync: insertLog} = useInsertUserLog(queryClient, getCurrentDate())

  const formSave = (values) => {
    const logData = {
      "username": "na",
      "full_name": "na",
      "date": getCurrentDate(),
      "time": getCurrentTime(),
      "tags": '',
      "changes": ''
    }

    if(tcp_analyzer_id) {
      if (inputs[0].label == "Parameter Amount") {
        logData.changes = `Analyzer: ${tableName.replace('_', ' ')}. Inserted ${values.inputNumber} Parameters`
        logData.tags = "Parameter, Insert"
        insertLog(logData)
        insertParameterPerTimebase(values, tcp_analyzer_id, insertParameter, timebaseData, 'parameter')
      }
      
      if (inputs[0].label == "Virtual Channel Amount") {
        logData.changes = `Analyzer: ${tableName.replace('_', ' ')}. Inserted ${values.inputNumber} Virtual Channels`
        logData.tags = "Virtual Channel, Insert"
        insertLog(logData)
        insertParameterPerTimebase(values, tcp_analyzer_id, insertDerivedParameter, timebaseData, 'derived_parameter')
      }
      
      // insert 
    } 
    
    else if(!tcp_analyzer_id) {
      const tags = "Analyzer, Insert"
      const changes = `Inserted ${values.name} TCP/IP Analyzer`
      logData.changes = changes
      logData.tags = tags
      insertLog(logData)
      insertTcp(values)
    }
    
    setIsModalOpen(false);
  };

  const saveFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const modalSave = () => {
    form.submit() // Submit form data
  };               
  const showModal = () => {
    setIsModalOpen(true);
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
        name={`${text}Insert`}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 12 }}
        style={{ maxWidth: 400 }}
        initialValues={{ inputNumber: 1 }}
        onFinish={formSave}
        onFinishFailed={saveFailed}
        autoComplete="off"
      >
        {/* Modal form with customized footer */}
        <Modal
          title={text} 
          open={isModalOpen} 
          onOk={modalSave}
          onCancel={(modalCancel)}    
          footer={
            [
              <Button key="back" onClick={modalCancel}>
                Cancel
              </Button>,
              <Button key="basic" htmlType="submit" onClick={modalSave}>
                Save
              </Button>
            ]
          }
        >
          <ModalFormInsertInputs inputs={inputs} form={form} inputType={inputType} />
        </Modal>
      </Form>
    </>
  );
};

ModalFormInsert.propTypes = {
  buttonStyle: PropTypes.object,
  timebaseData: PropTypes.array,
  inputs: PropTypes.array,
  tableName: PropTypes.string,
  text: PropTypes.string,
  tcp_analyzer_id: PropTypes.string,
  inputType: PropTypes.string
}

export default ModalFormInsert;