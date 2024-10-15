import React from 'react';
import { MessageSquare, BellRing } from 'lucide-react'
import { Avatar } from 'antd';

interface NotificationBarProps {
  avatarSrc: string;
}

const NotificationBar: React.FC<NotificationBarProps> = ({ avatarSrc }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-[#f5f7fb] rounded-full p-2">
        <MessageSquare className="text-gray-400" />
      </div>
      <div className="bg-[#f5f7fb] rounded-full p-2">
        <BellRing className="text-gray-400" />
      </div>
      <Avatar src={avatarSrc} />
    </div>
  );
};

export default NotificationBar;
