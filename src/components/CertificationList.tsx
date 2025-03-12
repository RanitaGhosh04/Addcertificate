import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';

const CertificationList: React.FC = () => {
  const { certifications } = useSelector((state: RootState) => state.certification);

  const handleViewCertificate = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  if (certifications.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="mb-3">You haven't added any certifications yet.</p>
        <Link to="/" className="btn btn-primary">
          Add Your First Certification
        </Link>
      </div>
    );
  }

  return (
    <div className="certification-list">
      {certifications.map((cert, index) => (
        <div key={cert.id} className="certification-item bg-light rounded p-3 mb-3">
          <div className="d-flex align-items-center">
            <div className="cert-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '32px', height: '32px' }}>
              {index + 1}
            </div>
            <div className="d-flex flex-column">
              <span className="fw-bold">{cert.name}</span>
              <span className="text-muted">{cert.issuer}</span>
              <a 
                href="#" 
                className="view-link text-primary mt-1"
                onClick={(e) => {
                  e.preventDefault();
                  handleViewCertificate(cert.fileUrl);
                }}
              >
                View certification
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationList;