import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Certification } from '../types';

interface CertificationState {
  certifications: Certification[];
  showSuccess: boolean;
}

const initialState: CertificationState = {
  certifications: [],
  showSuccess: false,
};

const MAX_CERTIFICATIONS = 5;

const certificationSlice = createSlice({
  name: 'certification',
  initialState,
  reducers: {
    addCertification: (state, action: PayloadAction<Certification>) => {
      // Only add certification if limit not reached
      if (state.certifications.length < MAX_CERTIFICATIONS) {
        state.certifications.push(action.payload);
        state.showSuccess = true;
      }
    },
    hideSuccess: (state) => {
      state.showSuccess = false;
    }
  },
});

export const { addCertification, hideSuccess } = certificationSlice.actions;
export default certificationSlice.reducer;