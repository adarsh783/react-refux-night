import React, { useState, useEffect } from "react";
import AddPlayer from "./AddPlayer";
import AddTeam from "./AddTeam";
import { isEmpty } from "lodash";
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Button, Row, Col, Popconfirm, Table, Typography, Space } from "antd";
import { Store } from "../../redux/store";

const { Text, Title } = Typography;
export default function TeamContainer() {
  const [tableData, setTableData] = useState([]);
  const [isAddPlayerModalVisible, setIsAddPlayerModalVisible] = useState(false);
  const [isAddTeamModalVisible, setIsAddTeamModalVisible] = useState(false);
  const [addPlayerTeam, setAddPlayerTeam] = useState("");

  const { TeamDetails } = useSelector(state => ({
    TeamDetails: state.TeamDetails,
  }));

  useEffect(() => {
    if (isEmpty(TeamDetails)) setTableData([]);
    else {
      const nData = Object.entries(TeamDetails).map(details => ({
        team_name: details[0],
        players: details[1],
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
      title: "Players",
      key: "players",
      width: 480,
      render: details => {
        const teamName = details.team_name;

        const playerDetails = details.players.map(playerDetail => ({
          player_name: playerDetail.player_name,
          player_id: playerDetail.player_id,
          teamName: teamName,
        }));

        return (
          <>
            <Text style={{ fontWeight: "bold" }}>{teamName} Player List</Text>
            {""}
            <Row style={{ marginTop: "10px" }}>
              <Table
                columns={PlayerColumns}
                dataSource={playerDetails}
                pagination={false}
                scroll={{ y: 240 }}
              />
            </Row>
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: details => {
        return (
          <>
            <Space>
              <Button
                type="primary"
                onClick={() => addPlayer(details.team_name)}
              >
                Add Player
              </Button>
              <Popconfirm
                title={
                  <Text>
                    Are you sure you want to delete{" "}
                    <Text type="danger">{details.team_name}</Text> ?
                  </Text>
                }
                placement="topRight"
                onConfirm={() => removeTeam(details)}
              >
                <Button type="danger">Delete Team</Button>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];

  const PlayerColumns = [
    {
      title: "Player Name",
      dataIndex: "player_name",
      key: "player_name",
    },
    {
      title: "Action",
      key: "action",
      render: details => {
        return (
          <Popconfirm
            title={
              <Text>
                Are you sure you want to delete{" "}
                <Text type="danger">{details.player_name}</Text> ?
              </Text>
            }
            placement="topRight"
            onConfirm={() => handleRemovePlayer(details)}
          >
            <Button type="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
        );
      },
    },
  ];

  const handleRemovePlayer = playerDetail => {
    Store.dispatch({
      type: "REMOVE_PLAYER",
      payload: playerDetail,
    });
  };

  const addPlayer = teamName => {
    setIsAddPlayerModalVisible(true);
    setAddPlayerTeam(teamName);
  };

  const removeTeam = teamDetail => {
    Store.dispatch({
      type: "REMOVE_TEAM",
      payload: teamDetail,
    });
  };

  const addTeam = () => {
    setIsAddTeamModalVisible(true);
  };

  return (
    <>
      <Row justify="start">
        <Col>
          <Title level={1} style={{ textAlign: "center" }}>
            Teams
          </Title>
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <Button type="primary" onClick={() => addTeam()}>
            Add Team
          </Button>
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
      <AddPlayer
        isAddPlayerModalVisible={isAddPlayerModalVisible}
        setIsAddPlayerModalVisible={setIsAddPlayerModalVisible}
        addPlayerTeam={addPlayerTeam}
      />
      <AddTeam
        isAddTeamModalVisible={isAddTeamModalVisible}
        setIsAddTeamModalVisible={setIsAddTeamModalVisible}
      />
    </>
  );
}
