import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { store } from './store';
import CertificationForm from './components/CertificationForm';
import CertificationList from './components/CertificationList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <h2 className="text-center mb-1">Skills-Based Certifications</h2>
              <p className="text-center text-muted mb-4">(You can add upto 5 certifications)</p>
              
              <nav className="d-flex justify-content-center mb-4">
                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Add Certification</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/list" className="nav-link">View Certifications</Link>
                  </li>
                </ul>
              </nav>
              
              <Routes>
                <Route path="/" element={<CertificationForm />} />
                <Route path="/list" element={
                  <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">
                      <h5 className="card-title mb-4">Your Certifications</h5>
                      <CertificationList />
                    </div>
                  </div>
                } />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;