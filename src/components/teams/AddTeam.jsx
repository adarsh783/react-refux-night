import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Button, Row, Col, Form, Input, Modal, message } from "antd";
import { useSelector } from "react-redux";
import { Store } from "../../redux/store";

export default function AddTeam({
  isAddTeamModalVisible,
  setIsAddTeamModalVisible,
}) {
  const [form] = Form.useForm();
  const [teamName, setTeamName] = useState([]);

  const { TeamDetails } = useSelector(state => ({
    TeamDetails: state.TeamDetails,
  }));

  useEffect(() => {
    if (isEmpty(TeamDetails)) setTeamName([]);
    else {
      const allTeamName = [];

      Object.entries(TeamDetails).map(details => allTeamName.push(details[0]));
      setTeamName(allTeamName);
    }
  }, [TeamDetails]);

  const handleCancel = () => {
    setIsAddTeamModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = teamDetails => {
    const isTeamAlreadyExist = teamName.find(
      name => name.toUpperCase() === teamDetails.team_name.toUpperCase()
    );
    if (!isEmpty(isTeamAlreadyExist))
      message.error(`Team ${isTeamAlreadyExist} already exists`);
    else {
      Store.dispatch({
        type: "ADD_TEAM",
        payload: teamDetails,
      });

      message.success(`${teamDetails.team_name} team added successfully`);
      handleCancel();
    }
  };

  return (
    <>
      <Modal
        title="Add Team"
        visible={isAddTeamModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form
          name="basic information"
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          <Row justify="center">
            <Col span={20}>
              <Form.Item
                name="team_name"
                label="Team Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
