
import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface DropdownItem {
  key: string;
  label: string;
}

interface MultipleDropdownsProps {
  dropdownData: DropdownItem[][];
}

const MultipleDropdowns: React.FC<MultipleDropdownsProps> = ({ dropdownData }) => {
  return (
    <div>
      {dropdownData.map((menuItems, index) => (
        <Dropdown key={index} overlay={
          <Menu>
            {menuItems.map(item => (
              <Menu.Item key={item.key}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        }>
          <Button>
            Dropdown {index + 1} <DownOutlined />
          </Button>
        </Dropdown>
      ))}
    </div>
  );
};

export default MultipleDropdowns;