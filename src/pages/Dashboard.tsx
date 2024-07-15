import { Col, Row, Statistic, Card } from 'antd';
import type { StatisticProps } from 'antd';

import PieChart from '@/pages/echarts/PieChart';
import MapChart from '@/pages/echarts/MapChart';
import BarChart from '@/pages/echarts/BarChart';
import RelationChart from '@/pages/echarts/RelationChart';

function Dashboard() {
  return (
    <div>
      <Row gutter={16} style={{marginBottom: '20px'}}>
        <Col className="gutter-row" span={8}>
          <div style={{marginBottom: '20px'}}>
            <Row gutter={16}>
              <Col span={8}>
                <Card bordered={false}>
                  <Statistic title="总销售额" value={1000} />
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false}>
                  <Statistic title="净利润" value={500} />
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false}>
                  <Statistic title="利润率" value={'50%'} />
                </Card>
              </Col>
            </Row>
          </div>

          <div>
            <PieChart></PieChart>
          </div>
        </Col>
        <Col className="gutter-row" span={16}>
          <MapChart></MapChart>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <BarChart></BarChart>
        </Col>
        <Col className="gutter-row" span={12}>
          <RelationChart></RelationChart>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard