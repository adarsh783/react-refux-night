import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { Button, Row, Col, Form, Input, Table, Typography, Space } from "antd";

const { Title } = Typography;
export default function Teams() {
  const [form] = Form.useForm();
  const [playerDetails, setPlayerDetails] = useState([]);
  const [tableData, setTableData] = useState([]);

  const { TeamDetails } = useSelector(state => ({
    TeamDetails: state.TeamDetails,
  }));

  useEffect(() => {
    if (isEmpty(TeamDetails)) setPlayerDetails([]);
    else {
      const allPlayerDetails = [];

      Object.entries(TeamDetails).map(details =>
        details[1].map(playerDetails => allPlayerDetails.push(playerDetails))
      );

      const nData = allPlayerDetails.map(details => ({
        team_name: details.team,
        player_name: details.player_name,
      }));
      setPlayerDetails(nData);
    }
  }, [TeamDetails]);

  const Columns = [
    {
      title: "Team Name",
      dataIndex: "team_name",
      key: "team_name",
    },
    {
      title: "Player Name",
      dataIndex: "player_name",
      key: "player_name",
    },
  ];

  const handleSubmit = playerName => {
    const searchPlayer = playerDetails.filter(
      details =>
        details.player_name.toUpperCase() ===
        playerName.player_name.toUpperCase()
    );

    if (!isEmpty(searchPlayer)) {
      const nData = searchPlayer.map(playerDetail => ({
        team_name: playerDetail.team_name,
        player_name: playerDetail.player_name,
      }));

      setTableData(nData);
    } else setTableData([]);
  };

  const handleClear = () => {
    setTableData([]);
    form.resetFields();
  };

  return (
    <>
      <Row justify="space-between">
        <Col span={24}>
          <Title level={1} style={{ textAlign: "center" }}>
            Search
          </Title>
        </Col>
      </Row>
      <Row>
        <Form
          name="basic information"
          layout="inline"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item name="player_name">
            <Input placeholder="Search by player name" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button htmlType="submit" type="primary">
                Search
              </Button>
              <Button type="primary" onClick={() => handleClear()}>
                Clear
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Row>
      <Row style={{ marginTop: "35px" }}>
        <Col span={24}>
          <Table columns={Columns} dataSource={tableData} pagination={false} />
        </Col>
      </Row>
    </>
  );
}
