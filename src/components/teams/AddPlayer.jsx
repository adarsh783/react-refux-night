import React, { useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Form,
  Input,
  Modal,
  message,
  Typography,
} from "antd";
import { Store } from "../../redux/store";

const { Text } = Typography;

export default function AddPlayer({
  isAddPlayerModalVisible,
  setIsAddPlayerModalVisible,
  addPlayerTeam,
}) {
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsAddPlayerModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({
      team: addPlayerTeam,
    });
  });

  const handleSubmit = playerDetails => {
    const details = {
      player_id: Math.random(),
      player_name: playerDetails.player_name,
      team: addPlayerTeam,
    };

    Store.dispatch({
      type: "ADD_PLAYER",
      payload: details,
    });

    message.success("Player added successfully");
    handleCancel();
  };

  return (
    <>
      <Modal
        title={
          <Text>
            Add Player to <Text type="success">{addPlayerTeam}</Text> team
          </Text>
        }
        visible={isAddPlayerModalVisible}
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
                name="player_name"
                label="Player Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="team" label="Team">
                <Input disabled />
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
