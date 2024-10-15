import React, { useCallback, useEffect, useState } from 'react';
import { Layout, Menu, Table, Avatar, Space, Tag, Input, ConfigProvider, TableProps } from 'antd';
import { UserOutlined, AppstoreOutlined, FormOutlined, SettingOutlined, FileTextOutlined } from '@ant-design/icons';
import { BellRing, Codepen, Codesandbox, Filter, MessageSquare, Plus, Search, Sliders } from 'lucide-react';
import { debounce } from '../utils/utils';
import { data } from '../data/data';
import './Dashboard.css'; // Custom CSS for styling
import { DataType, MenuItem } from '../types/types';
import { siderStyle } from '../styles/styles';

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
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`Selected Row Keys: ${selectedRowKeys}`, 'Selected Rows: ', selectedRows);
    },
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
      <div className='flex flex-row justify-center items-center gap-2 mt-4'>
        <div className="flex items-center">
          <Codesandbox className='w-[24px] text-[#3f6ad8]' />
          {collapsed ? '' : <span className="m-4 text-[24px] font-bold text-[#3f6ad8]">Simply Web</span>}
        </div>
      </div>
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
          <div className="flex flex-col">
            <p className="m-0 text-[24px] font-bold text-black">Welcome Back</p>
            <p className="m-0 text-[#888] leading-0 mt-[-30px]">Hello Mahfuzul, Good Morning!</p>
          </div>
          <div>
            {/* Search Input */}
            <div className="flex items-center bg-[#f5f7fb] rounded-full px-4 w-[300px] h-[40px] shadow-sm">
              <Search className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent focus:outline-none text-gray-500 w-full"
                value={searchTerm}
                onChange={onSearchChange}
              />
              <Sliders className="text-gray-400 ml-2" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#f5f7fb] rounded-full p-2">
              <MessageSquare className="text-gray-400" />
            </div>
            <div className="bg-[#f5f7fb] rounded-full p-2">
              <BellRing className="text-gray-400" />
            </div>
            <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
          </div>
        </Header>

        <Content className="p-[24px] bg-[#f9f9f9]">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-bold text-black text-[24px]">Tickets</h2>
            <div className="flex space-x-4">
              {/* Filter button */}
              <button className="flex items-center space-x-2 shadow-lg rounded-full border border-gray-300 px-4 py-2 text-gray-700">
                <Filter className="h-5 w-5 text-gray-500" />
                <span>Filters</span>
              </button>
              {/* New Ticket button */}
              <button className="flex items-center space-x-2 rounded-full bg-[#5332e6] px-6 py-2 text-white">
                <Plus className="h-5 w-5 text-white" />
                <span>New Ticket</span>
              </button>
            </div>
          </div>
          {/* Data Table */}
          <Table rowSelection={{ type: 'checkbox', ...rowSelection }} columns={columns} dataSource={filteredData} pagination={false} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
