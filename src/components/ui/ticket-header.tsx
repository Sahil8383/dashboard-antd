import React from 'react';
import { Filter, Plus } from 'lucide-react'; // Adjust these imports based on your icon library

interface TicketHeaderProps {
  onFilterClick?: () => void;
  onNewTicketClick?: () => void;
}

const TicketHeader: React.FC<TicketHeaderProps> = ({ onFilterClick, onNewTicketClick }) => {
  return (
    <div className="flex justify-between items-center mb-5">
      <h2 className="font-bold text-black text-[24px]">Tickets</h2>
      <div className="flex space-x-4">
        {/* Filter button */}
        <button
          className="flex items-center space-x-2 shadow-lg rounded-full border border-gray-300 px-4 py-2 text-gray-700"
          onClick={onFilterClick}
        >
          <Filter className="h-5 w-5 text-gray-500" />
          <span>Filters</span>
        </button>
        {/* New Ticket button */}
        <button
          className="flex items-center space-x-2 rounded-full bg-[#5332e6] px-6 py-2 text-white"
          onClick={onNewTicketClick}
        >
          <Plus className="h-5 w-5 text-white" />
          <span>New Ticket</span>
        </button>
      </div>
    </div>
  );
};

export default TicketHeader;
