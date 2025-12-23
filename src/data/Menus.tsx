import { GridIcon, UserCircleIcon } from '@/assets/icons';
import { JSX } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdApproval } from 'react-icons/md';
import { PiLaptop, PiUsersThree } from 'react-icons/pi';

export type NavItem = {
  icon?: JSX.Element;
  name: string;
  path?: string;
  subItems?: {
    icon?: JSX.Element;
    name: string;
    path: string;
  }[];
};

export const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: 'Dashboard',
    path: '/',
  },
  {
    icon: <PiLaptop size={24} />,
    name: 'Assets',
    path: '/assets',
  },
  {
    icon: <BiCategoryAlt size={24} />,
    name: 'Categories',
    path: '/categories',
  },
  {
    icon: <MdApproval size={24} />,
    name: 'Approval',
    path: '/approval',
  },
  {
    icon: <PiUsersThree size={24} />,
    name: 'Users',
    path: '/users',
  },
];

export const othersItems: NavItem[] = [
  {
    icon: <UserCircleIcon />,
    name: 'User Profile',
    path: '/profile',
  },
  // {
  //   icon: <PieChartIcon />,
  //   name: 'Charts',
  //   subItems: [
  //     {
  //       icon: <GridIcon />,
  //       name: 'Line Chart',
  //       path: '/line-chart',
  //     },
  //     {
  //       name: 'Bar Chart',
  //       path: '/bar-chart',
  //     },
  //   ],
  // },
];
