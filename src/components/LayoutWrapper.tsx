// src/components/LayoutWrapper.tsx
import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import AuthLayout from '../layout/AuthLayout';

interface LayoutWrapperProps {
  layout: 'default' | 'auth'; // Define the possible values for 'layout'
  children: React.ReactNode; // ReactNode is a type for anything that can be rendered (components, strings, etc.)
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ layout, children }) => {
  const Layout = layout === 'auth' ? AuthLayout : DefaultLayout;
  return <Layout>{children}</Layout>;
};

export default LayoutWrapper;
