import React from "react";
import Player from "./Player";
import Search from "./Search";
import { Tabs } from "antd";

const { TabPane } = Tabs;
export default function PlayerContainer() {
  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Players" key="1">
          <Player />
        </TabPane>
        <TabPane tab="Search" key="2">
          <Search />
        </TabPane>
      </Tabs>
    </>
  );
}
