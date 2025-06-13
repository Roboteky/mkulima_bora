// src/components/Sidebar/SidebarItem.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

const SidebarItem = ({ icon, label, active, onClick, children, collapsed }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <li>
      <button
        onClick={children ? () => setOpen(!open) : onClick}
        className={`w-full flex items-center justify-between rounded-lg p-3 ${active ? 'bg-green-100 text-green-700 dark:bg-gray-700 dark:text-green-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
      >
        <div className="flex items-center">
          <span className={`${active ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
            {icon}
          </span>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-3"
            >
              {label}
            </motion.span>
          )}
        </div>
        {children && !collapsed && (
          <span className="text-gray-400">
            {open ? <FiChevronDown /> : <FiChevronRight />}
          </span>
        )}
      </button>

      {children && open && !collapsed && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="pl-8 mt-1 space-y-1"
        >
          {children}
        </motion.ul>
      )}
    </li>
  );
};

export default SidebarItem;