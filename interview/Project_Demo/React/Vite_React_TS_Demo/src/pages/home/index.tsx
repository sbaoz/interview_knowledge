/*
 * @Author: your name
 * @Date: 2021-11-22 15:12:25
 * @LastEditTime: 2021-11-23 15:52:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \interview_knowledge\interview\Project_Demo\React\Vite_React_TS_Demo\src\pages\home\index.tsx
 */
import React, { useState, useEffect } from "react";
import { Layout, Menu, Tooltip } from "antd";
import { Link, useLocation } from "react-router-dom";
import { DesktopOutlined, PieChartOutlined, FileOutlined } from "@ant-design/icons";
import { formatMessage } from "@/components/Locales";

const { Header, Content, Footer, Sider } = Layout;
const { Item } = Menu;
const HomePage: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  console.log(location);
  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(isOpen) => setCollapsed(isOpen)}>
        <Tooltip placement="right" title="systemName">
          <div>{formatMessage({ id: "systemName" })}</div>
        </Tooltip>
        <Menu theme="dark" defaultSelectedKeys={[`${location.pathname}`]} mode="inline">
          <Item key="/locale" icon={<FileOutlined />}>
            <Link to="/locale">国际化</Link>
          </Item>
          <Item key="/icon" icon={<PieChartOutlined />}>
            <Link to="/icon">图标</Link>
          </Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "16px 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>vite-react-template ©2021 Created by xiaojz</Footer>
      </Layout>
    </Layout>
  );
};

export default HomePage;
