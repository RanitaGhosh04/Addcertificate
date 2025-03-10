import React, { useRef, useState } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, error }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileType = file.type;
      
      // Check if file is PDF or JPG
      if (fileType === 'application/pdf' || fileType === 'image/jpeg') {
        setSelectedFile(file);
        onFileSelect(file);
      } else {
        setSelectedFile(null);
        onFileSelect(file); // This will trigger validation in parent component
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">File</label>
      <div className="d-flex flex-column">
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="btn btn-outline-primary me-2"
            onClick={handleClick}
          >
            Browse
          </button>
          <span className={`text-truncate ${selectedFile ? '' : 'text-muted'}`}>
            {selectedFile ? selectedFile.name : 'No file chosen'}
          </span>
          <input
            type="file"
            ref={fileInputRef}
            className="d-none"
            onChange={handleFileChange}
            accept=".pdf,.jpg,image/jpeg,application/pdf"
          />
        </div>
        {error && <div className="text-danger mt-1">{error}</div>}
        <small className="form-text text-muted mt-1">
          Supported file formats: PDF, JPG
        </small>
      </div>
    </div>
  );
};

export default FileUpload;