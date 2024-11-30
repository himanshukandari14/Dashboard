import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { UsersView } from './components/UsersView';
import { RolesView } from './components/RolesView';
import { PermissionsView } from './components/PermissionsView';

function App() {
  const [currentView, setCurrentView] = useState('users');

  const renderView = () => {
    switch (currentView) {
      case 'users':
        return <UsersView />;
      case 'roles':
        return <RolesView />;
      case 'permissions':
        return <PermissionsView />;
      default:
        return <UsersView />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
}

export default App;