import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  uploading: false,
  uploadError: null,
  updateLoading: false,
  updateError: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
        state.loading = true;
        state.error = null;
    },
    signInSuccess: (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
    },
    signInFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    
    // Profile picture upload actions
    uploadStart: (state) => {
        state.uploading = true;
        state.uploadError = null;
    },
    uploadSuccess: (state, action) => {
        state.uploading = false;
        state.uploadError = null;
        // Update the current user's profile picture
        if (state.currentUser) {
            state.currentUser.profilePicture = action.payload.imageUrl;
        }
    },
    uploadFailure: (state, action) => {
        state.uploading = false;
        state.uploadError = action.payload;
    },
    
    // General user update actions
    updateUserStart: (state) => {
        state.updateLoading = true;
        state.updateError = null;
    },
    updateUserSuccess: (state, action) => {
        state.updateLoading = false;
        state.updateError = null;
        state.currentUser = { ...state.currentUser, ...action.payload };
    },
    updateUserFailure: (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
    },
    deleteUserStart: (state) => {
        state.updateLoading = true;
        state.updateError = null;
    },
    deleteUserSuccess: (state) => {
        state.updateLoading = false;
        state.updateError = null;
        state.currentUser = null;
    },
    deleteUserFailure: (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
    },
    // Sign out action
    signOut: (state) => {
        state.currentUser = null;
        state.error = null;
        state.loading = false;
        state.uploading = false;
        state.uploadError = null;
        state.updateLoading = false;
        state.updateError = null;
    },
    
    // Clear errors
    clearErrors: (state) => {
        state.error = null;
        state.uploadError = null;
        state.updateError = null;
    }
  },
})

export const { 
    signInStart, 
    signInSuccess, 
    signInFailure,
    uploadStart,
    uploadSuccess,
    uploadFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOut,
    clearErrors
} = userSlice.actions

export default userSlice.reducer