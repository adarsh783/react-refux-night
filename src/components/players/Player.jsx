import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { Row, Col, Table, Typography } from "antd";

const { Title } = Typography;
export default function Teams() {
  const [tableData, setTableData] = useState([]);

  const { TeamDetails } = useSelector(state => ({
    TeamDetails: state.TeamDetails,
  }));

  useEffect(() => {
    if (isEmpty(TeamDetails)) setTableData([]);
    else {
      const allPlayerDetails = [];

      Object.entries(TeamDetails).map(details =>
        details[1].map(playerDetails => allPlayerDetails.push(playerDetails))
      );

      const nData = allPlayerDetails.map(details => ({
        team_name: details.team,
        player_name: details.player_name,
      }));
      setTableData(nData);
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

  return (
    <>
      <Row justify="space-between">
        <Col span={24}>
          <Title level={1} style={{ textAlign: "center" }}>
            Players
          </Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={Columns}
            dataSource={tableData}
            pagination={{
              showSizeChanger: false,
            }}
          />
        </Col>
      </Row>
    </>
  );
}
