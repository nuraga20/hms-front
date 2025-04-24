import React, { ReactNode } from 'react';

const AuthLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Main Content Start ===== --> */}
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          {children}
        </div>
      </main>
      {/* <!-- ===== Main Content End ===== --> */}
    </div>
  );
};

export default AuthLayout;
