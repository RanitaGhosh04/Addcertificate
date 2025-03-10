import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const CertificationList: React.FC = () => {
  const { certifications, showSuccess } = useSelector((state: RootState) => state.certification);

  const handleViewCertificate = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  if (certifications.length === 0) {
    return null;
  }

  return (
    <div className="certification-list mb-4">
      {certifications.map((cert, index) => (
        <div key={cert.id} className="certification-item bg-light rounded p-3 mb-3">
          <div className="d-flex align-items-center">
            <div className="cert-number bg-primary text-white rounded-circle me-3">
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