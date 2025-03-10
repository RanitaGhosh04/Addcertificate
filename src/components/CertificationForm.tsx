import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addCertification, hideSuccess } from '../store/certificationSlice';
import { Certification, ValidationErrors } from '../types';
import { RootState } from '../store';

function CertificationForm() {
  const dispatch = useDispatch();
  const { showSuccess, certifications } = useSelector((state: RootState) => state.certification);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<Omit<Certification, 'id' | 'fileUrl'>>({
    name: '',
    issuer: '',
    file: null
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [fileName, setFileName] = useState<string>('');

  // Check if max certifications limit reached
  const isMaxCertificationsReached = certifications.length >= 5;

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter certification name';
    }
    
    if (!formData.issuer.trim()) {
      newErrors.issuer = 'Please enter issuer name';
    }
    
    if (!formData.file) {
      newErrors.file = 'Please upload a certification file';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.type;
      
      // Check if file is PDF or JPG
      if (fileType === 'application/pdf' || fileType === 'image/jpeg') {
        setFormData({
          ...formData,
          file
        });
        setFileName(file.name);
        
        // Clear file error if exists
        if (errors.file) {
          setErrors({
            ...errors,
            file: undefined
          });
        }
      } else {
        alert('Only PDF and JPG files are allowed');
      }
    }
  };

  const handleUploadClick = () => {
    // Trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleLabelClick = () => {
    // Also trigger file input when label is clicked
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isMaxCertificationsReached) {
      alert('You can add up to 5 certifications only');
      return;
    }
    
    if (validateForm() && formData.file) {
      // Create a URL for the file
      const fileUrl = URL.createObjectURL(formData.file);
      
      dispatch(addCertification({
        id: uuidv4(),
        name: formData.name,
        issuer: formData.issuer,
        file: formData.file,
        fileUrl
      }));
      
      // Reset form
      setFormData({
        name: '',
        issuer: '',
        file: null
      });
      setFileName('');
      setErrors({});
    }
  };

  if (showSuccess) {
    return (
      <div className="alert alert-success mb-4" role="alert">
        <div className="d-flex justify-content-between align-items-center">
          <span>Certification saved.</span>
          <div>
            <a 
              href="#" 
              className="text-success me-3"
              onClick={(e) => {
                e.preventDefault();
                if (certifications.length > 0) {
                  const latestCert = certifications[certifications.length - 1];
                  window.open(latestCert.fileUrl, '_blank');
                }
              }}
            >
              View certification
            </a>
            <a 
              href="#" 
              className="text-success"
              onClick={(e) => {
                e.preventDefault();
                dispatch(hideSuccess());
              }}
            >
              Add new
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Disable form if max certifications reached
  if (isMaxCertificationsReached && !showSuccess) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4 text-center">
          <div className="alert alert-info mb-0">
            You have reached the maximum limit of 5 certifications.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h5 className="card-title mb-4">Add Certification</h5>
        
        <form onSubmit={handleSubmit}>
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="certName" className="form-label fw-bold">Certification name</label>
              <input
                type="text"
                className="form-control"
                id="certName"
                placeholder="Enter certification name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
            </div>
            
            <div className="col-md-6">
              <label htmlFor="issuerName" className="form-label fw-bold">Issuer</label>
              <input
                type="text"
                className="form-control"
                id="issuerName"
                placeholder="Enter issuer"
                name="issuer"
                value={formData.issuer}
                onChange={handleInputChange}
              />
              {errors.issuer && <div className="text-danger small mt-1">{errors.issuer}</div>}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-bold">Certification file</label>
            <div className="d-flex align-items-center">
              <div 
                className="upload-label w-100 py-2 px-3 rounded-3 bg-light text-center"
                onClick={handleLabelClick}
                style={{ cursor: 'pointer', border: '1px dashed #ced4da' }}
              >
                {fileName ? fileName : 'Upload a file showing your certification'}
              </div>
              <button 
                type="button" 
                className="btn btn-primary rounded-pill upload-btn ms-2"
                onClick={handleUploadClick}
              >
                UPLOAD <i className="bi bi-upload ms-1"></i>
              </button>
              <input 
                type="file" 
                className="d-none" 
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".pdf,.jpg,image/jpeg,application/pdf"
              />
            </div>
            {errors.file && <div className="text-danger small mt-1">{errors.file}</div>}
            <div className="text-muted small mt-2">
              <i className="bi bi-info-circle me-1"></i>
              File format should be only PDF or JPG
            </div>
          </div>
          
          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-primary px-4 py-2 rounded-1 text-uppercase fw-bold">
              SAVE CERTIFICATION
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CertificationForm;