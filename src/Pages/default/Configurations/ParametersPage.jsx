import { useParams } from 'react-router-dom'
import { Flex, Empty, Spin, Divider, Row, Col } from 'antd'

import EditableTableParameter from '../../../Features/Configurations/EditableTable/Parameter'
import EditableTableDerivedParameter from '../../../Features/Configurations/EditableTable/DerivedParameter'
import ModalFormInsert from '../../../Features/Configurations/ModalFormInsert'
import ModalFormUpdate from '../../../Features/Configurations/ModalFormUpdate'

import { useGetAllParameters, useGetParameters, useGetDerivedParameters, useGetAnalyzers, useGetAllTimebase } from '../../../Hooks/useFetchData'
import { PARAMETER_INSERT, DERIVED_PARAMETER_INSERT } from './constants/parametersPageConstants'

export default function ParametersPage() {
  const {tcp_analyzer_id} = useParams()
  const parameters = useGetParameters(tcp_analyzer_id)
  const allParameters = useGetAllParameters()
  const derivedParameters = useGetDerivedParameters(tcp_analyzer_id)
  const analyzers = useGetAnalyzers(tcp_analyzer_id)
  const timebases = useGetAllTimebase()

  if(parameters.isLoading) {
    return (
      <div style={{margin:'auto'}}>
        <Spin size="large" />
      </div>
    )
  }

  const getParameterDropdownData = (parameters) => {
    return parameters.map( (parameter) => {
      return {
        'key':parameter.id, 
        'label':parameter.name
      }
    })
  }

  if(parameters.isFetched && analyzers.isFetched && derivedParameters.isFetched && timebases.isFetched && allParameters.isFetched) {

    const parameterData = parameters.data
    const dropdownParameterData = getParameterDropdownData(allParameters.data)
    const derivedParameterData = derivedParameters.data
    const analyzerData = analyzers.data

    // Add key for each parameterData to be usable in the table cells
    parameterData.map((data) => {
      data.key = data.id
    })
    derivedParameterData.map((data) => {
      data.key = data.id
    })

    return(
      <div style={{margin:'12px'}}>
        <div>
          <Flex justify='flex-start'>
            <div>
              <ModalFormUpdate
                text={`${analyzerData[0].name}`}
                buttonStyle={{fontSize:'1.5rem', fontWeight:'700', marginInline:'0.5em', height:"100%"}}
                data={{
                  'analyzerData':analyzerData[0],
                  'parameterData':parameterData,
                  'derivedParameterData': derivedParameterData,
                  'timebaseData': timebases.data
                }}
              />
            </div>
            <div style={{width:'35%', marginBlock:'auto'}}>
              <Row>
                <Col span="12"><p><b>IP Address:</b> {analyzerData[0].host_address}</p></Col>
                <Col span="12"><p><b>Device Address:</b> {analyzerData[0].device_address}</p></Col>
              </Row>
              <Row>
                <Col span="12"><p><b>Port:</b> {analyzerData[0].port}</p></Col>
                <Col span="12"><p><b>Data Threshold:</b> {analyzerData[0].sampling}%</p></Col>
              </Row>
            </div>
          </Flex>
        </div>

        <div>
          <Divider style={{marginBlock:'0'}}>Parameters</Divider>
          <Flex justify="flex-end">
            <div style={{textAlign:'center'}}>
              <ModalFormInsert
                text={`Add Parameter`}
                buttonStyle={{fontSize:'1rem', fontWeight:'700', height:"auto"}}
                tableName={analyzerData[0].name}
                tcp_analyzer_id={tcp_analyzer_id}
                inputs={PARAMETER_INSERT}
                inputType='inputNumber'
                timebaseData={timebases.data}
              />
            </div>
          </Flex>
          <div>
            { parameterData.length <= 0 &&
              <Empty
                description="No Parameter Data"
              />
            }
            { parameterData.length > 0 &&
              <EditableTableParameter
                tableName={`${analyzerData[0].name.replaceAll(" ", "_")}`}
                data={{
                  'parameter':parameterData
                }}
              />
            }
          </div>
        </div>

        <div>
          <Divider style={{marginBlock:'0'}}>Virtual Channels</Divider>

          <div>
            <Flex justify='flex-end'>
              <div style={{textAlign:'center'}}>
                <ModalFormInsert
                  text={`Add Virtual Channel`}
                  buttonStyle={{fontSize:'1rem', fontWeight:'700',  height:"auto"}}
                  tableName={analyzerData[0].name}
                  tcp_analyzer_id={tcp_analyzer_id}
                  inputs={DERIVED_PARAMETER_INSERT}
                  inputType='inputNumber'
                  timebaseData={timebases.data}
                />
              </div>
            </Flex>

            <div>
              { derivedParameterData.length <= 0 &&
                <Empty
                  description="No Virtual Channels Inserted"
                />
              }
              { derivedParameterData.length > 0 &&
                <EditableTableDerivedParameter
                  tableName={`${analyzerData[0].name.replaceAll(" ", "_")}`}
                  data={{
                    'derivedParameter': derivedParameterData,
                    'dropdownParameterData': dropdownParameterData
                  }}
                />
              }
            </div>

          </div>

        </div>

      </div>
    )
  }

}