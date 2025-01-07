import { ArrowUpOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Spin } from 'antd';
import { useGetAllParameters } from '../../../Hooks/useFetchData';


const Statistics = () => {
  const parameters = useGetAllParameters()

  if(parameters.isLoading) {
    return (
      <div style={{margin:'auto'}}>
        <Spin size="large" />
      </div>
    )
  }

  if(parameters.isFetched) {

    const totalParameters = parameters.data.length
    const enabledParameters = (parameters.data.filter( item => item.enable == 1)).length

    const cardStyle = {
      textAlign:'center'
    }

    return (
      <Row gutter={16}>
  
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              style={cardStyle}
              title="Total Parameters"
              value={totalParameters}
              valueStyle={{
                color: '#4594a7',
              }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
  
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              style={cardStyle}
              title="Enabled Parameters"
              value={enabledParameters}
              valueStyle={{
                color: '#009933',
              }}
              prefix={<CheckOutlined />}
            />
          </Card>
        </Col>
  
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              style={cardStyle}
              title="Disabled Parameters"
              value={totalParameters - enabledParameters}
              valueStyle={{
                color: '#cf1322',
              }}
              prefix={<CloseOutlined />}
            />
          </Card>
        </Col>
  
      </Row>
    )
  }


};

export default Statistics;