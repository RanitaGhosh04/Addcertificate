import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import CertificationForm from './components/CertificationForm';
import CertificationList from './components/CertificationList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <h2 className="text-center mb-1">Skills-Based Certifications</h2>
            <p className="text-center text-muted mb-4">(You can add upto 5 certifications)</p>
            
            <CertificationList />
            <CertificationForm />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;