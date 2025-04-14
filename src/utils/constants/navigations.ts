import { Calculator, Info } from 'lucide-react';
import React from 'react';
import { LucideProps } from 'lucide-react';
import { JSX } from 'react';

import ColumnsPage from '@pages/AboutPage/AboutPage';
import ComputationPage from '@pages/ComputationPage/ComputationPage';

export interface NavigationItem {
  path: string;
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  page: (() => JSX.Element) | null;
  children: NavigationItem[] | null;
}

export const navigations: NavigationItem[] = [
  {
    path: '/',
    name: 'Computation',
    icon: Calculator,
    page: ComputationPage,
    children: null,
  },
  {
    path: '/about',
    name: 'About',
    icon: Info,
    page: ColumnsPage,
    children: null,
  },
];
