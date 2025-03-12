# Installation Instructions for Skills-Based Certifications (Vite)

Follow these step-by-step instructions to set up and run the Skills-Based Certifications application built with Vite on your local machine.

## Prerequisites

Before installing, make sure you have the following installed on your system:

- Node.js (version 14.0.0 or higher)
- npm (version 6.0.0 or higher)

You can check your current versions by running:
```bash
node -v
npm -v
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/RanitaGhosh04/Addcertificate.git
cd certifications-app
```

### 2. Install Dependencies

Install all required dependencies with:

```bash
npm install
```

This will install all dependencies listed in the package.json file, including React, Redux, React Router, Bootstrap, and other libraries needed for the project.

### 3. Install Additional Required Packages (if needed)

If any packages are missing, you can install them manually:

```bash
npm install react-redux @reduxjs/toolkit react-router-dom bootstrap uuid
```

### 4. Start the Development Server

Vite provides a fast development server. Start it with:

```bash
npm run dev
```

This will launch the application in development mode. Vite will display the local URL (typically http://localhost:5173) in the terminal. Open this URL in your browser to view the application.


## Next Steps After Installation

Once the application is running successfully:

1. Add a new certification
2. Try uploading a sample PDF or JPG file to test the functionality
