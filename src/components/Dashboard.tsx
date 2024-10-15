import React, { useCallback, useEffect, useState } from 'react';
import { Layout, Menu, Table, Avatar, Space, Tag, ConfigProvider, TableProps } from 'antd';
import { UserOutlined, AppstoreOutlined, FormOutlined, SettingOutlined, FileTextOutlined } from '@ant-design/icons';
import { debounce } from '../utils/utils';
import { data } from '../data/data';
import './Dashboard.css'; 
import { DataType, MenuItem } from '../types/types';
import { siderStyle } from '../styles/styles';
import SearchInput from './ui/search-input';
import NotificationBar from './ui/header-right';
import TicketHeader from './ui/ticket-header';
import WelcomeMessage from './ui/header-left';
import Logo from './ui/nav-logo';

const { Header, Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term state
  const [filteredData, setFilteredData] = useState<DataType[]>(data); // Filtered data state
  const [collapsed, setCollapsed] = useState<boolean>(window.innerWidth < 1024); // Collapse sidebar initially based on screen width

  // Debounced search function using custom debounce
  const handleSearch = useCallback(
    debounce((value: string) => {
      const filtered = data.filter((item) =>
        item.creator.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }, 300), // 300ms delay
    []
  );

  // Update search term and trigger debounce search
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  // Cleanup the debounce function on component unmount
  useEffect(() => {
    return () => {
      handleSearch.clear(); // Cleanup debounce on unmount
    };
  }, [handleSearch]);

  // Sidebar menu items
  const menuItems: MenuItem[] = [
    { key: '1', icon: <AppstoreOutlined />, label: 'Dashboard' },
    { key: '2', icon: <FormOutlined />, label: 'Tickets' },
    { key: '3', icon: <UserOutlined />, label: 'Customers' },
    { key: '4', icon: <SettingOutlined />, label: 'Categories' },
    { key: '5', icon: <SettingOutlined />, label: 'Admin' },
    { key: '6', icon: <FileTextOutlined />, label: 'Article', badge: 6 },
  ];

  // Table columns configuration
  const columns = [
    {
      title: 'Created By',
      dataIndex: 'creator',
      key: 'creator',
      render: (text: string, record: DataType) => (
        <Space>
          <Avatar src={record.avatar} />
          <div>
            <div>{record.creator}</div>
            <small>{record.role}</small>
          </div>
        </Space>
      ),
    },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Assigned', dataIndex: 'assigned', key: 'assigned' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'Open' ? 'green' : status === 'Pending' ? 'orange' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Privacy',
      dataIndex: 'privacy',
      key: 'privacy',
      render: (privacy: string) => (
        <span style={{ color: privacy === 'Private' ? 'red' : 'green' }}>
          {privacy === 'Private' ? '🔒 Private' : '🟢 Public'}
        </span>
      ),
    },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
  ];

  // Row selection for the table
  const rowSelection: TableProps<DataType>['rowSelection'] = {
    type: 'checkbox',
  };

  const handleResize = () => {
    setCollapsed(window.innerWidth < 1024);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      handleSearch.clear(); // Cleanup debounce on unmount
    };
  }, [handleSearch]);

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value)=> setCollapsed(value)} style={siderStyle} theme="light" width={250} className="bg-[#fff] border-r-[f0f0f0]">
        <Logo collapsed={collapsed} />
        <ConfigProvider theme={{ components: { Menu: { itemSelectedColor: "#5332e6" } } }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['2']}
            items={menuItems.map((item) => ({
              key: item.key,
              icon: item.icon,
              label: item.label,
              badge: item.badge && <span className="badge">{item.badge}</span>,
            }))}
          />
        </ConfigProvider>
      </Sider>

      {/* Main content */}
      <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: 'margin-left 0.2s ease-in-out' }}>
        <Header className="bg-[#fff] w-full min-h-[100px] px-6 flex justify-between items-center border border-[#f0f0f0]">
          <WelcomeMessage userName={'Sahil'} />
            <SearchInput
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
            />
          <NotificationBar avatarSrc='https://randomuser.me/api/portraits/men/1.jpg' />
        </Header>

        <Content className="p-[24px] bg-[#f9f9f9]">
          <TicketHeader/>
          {/* Data Table */}
          <Table rowSelection={{ type: 'checkbox', ...rowSelection }} columns={columns} dataSource={filteredData} pagination={false} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
