import { Button, TextInput, Toast } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  uploadStart, 
  uploadSuccess, 
  uploadFailure, 
  updateUserStart,
  updateUserSuccess,
  updateUserFailure
} from "../redux/user/userSlice"; // Adjust import path
import { HiCheck, HiExclamation } from "react-icons/hi";

// Progress Ring Component
const ProgressRing = ({ progress, size = 128, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className="absolute inset-0 transform -rotate-90"
      width={size}
      height={size}
    >
      {/* Background circle */}
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      {/* Progress circle */}
      <circle
        stroke="#3b82f6"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        style={{ strokeDashoffset }}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        className="transition-all duration-300 ease-in-out"
      />
    </svg>
  );
};

export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser, uploading, uploadError } = useSelector((state) => state.user);
  const [ formData, setFormData ] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' or 'error'
  const filePickerRef = useRef(null);

  const handleImageChange = (e) => {

    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        showToastMessage('Only image files (JPEG, PNG, GIF, WebP) are allowed.', 'error');
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToastMessage('File size exceeds the limit of 5MB.', 'error');
        return;
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    
    // Auto hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  const uploadImage = async () => {
    try {
      if (!image) {
        throw new Error('Please select an image file first');
      }

      if (!currentUser || !currentUser._id) {
        throw new Error('User authentication required');
      }

      dispatch(uploadStart());
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('image', image);
      formData.append('userId', currentUser._id);

      // Create XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();

      // Set up progress tracking
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          setUploadProgress(Math.round(percentComplete));
        }
      });

      // Create a promise to handle the XMLHttpRequest
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const data = JSON.parse(xhr.responseText);
                resolve(data);
              } catch (parseError) {
                reject(new Error('Failed to parse server response'));
              }
            } else {
              try {
                const errorData = JSON.parse(xhr.responseText);
                reject(new Error(errorData.error || `Upload failed with status: ${xhr.status}`));
              } catch (parseError) {
                reject(new Error(`Upload failed with status: ${xhr.status}`));
              }
            }
          }
        };

        xhr.onerror = () => {
          reject(new Error('Network error occurred during upload'));
        };

        xhr.open('POST', '/api/user/upload');
        xhr.send(formData);
      });

      const data = await uploadPromise;

      // Handle successful upload
      console.log('Image uploaded successfully:', data);
      
      // Complete the progress
      setUploadProgress(100);
      
      // Update the user's profile picture URL in Redux store
      dispatch(uploadSuccess({
        imageUrl: data.imageUrl,
        user: data.user
      }));

      // Show success toast
      showToastMessage('Profile picture updated successfully!', 'success');
      
      // Clear the selected image and preview after a short delay
      setTimeout(() => {
        setImage(null);
        setImagePreview(null);
        setUploadProgress(0);
      }, 1000);
      
      return data;

    } catch (error) {
      console.error('Error uploading image:', error);
      
      // Update Redux with error
      dispatch(uploadFailure(error.message));
      
      // Show error toast
      showToastMessage(error.message, 'error');
      
      // Clear image selection on error
      setImage(null);
      setImagePreview(null);
      setUploadProgress(0);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData && Object.keys(formData).length > 0){
      try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}`
          },
          body: JSON.stringify(formData)
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to update profile');
        }

        const data = await res.json();
        dispatch(updateUserSuccess(data.currentUser));

        showToastMessage('Profile updated successfully!', 'success');
      
      
      } catch (error) {
        showToastMessage(error.message, 'error');
      }
    } else {
      showToastMessage('No changes to update.', 'error');
    }
  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center text-xl font-semibold">Profile</h1>
      <form action="" className="flex flex-col gap-4 p-4" onSubmit={handleSubmit} >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="profilePictureInput"
          onChange={handleImageChange}
          ref={filePickerRef}
        />
        
        {/* Profile Picture with Progress Ring */}
        <div className="relative w-32 h-32 self-center">
          {/* Progress Ring */}
          {uploading && (
            <ProgressRing progress={uploadProgress} size={128} strokeWidth={4} />
          )}
          
          {/* Profile Image */}
          <div
            className={`w-32 h-32 cursor-pointer shadow-md rounded-full overflow-hidden ${
              uploading ? 'opacity-90' : ''
            }`}
            onClick={() => !uploading && filePickerRef.current.click()}
          >
            <img
              src={imagePreview || currentUser?.profilePicture || '/default-avatar.png'}
              alt="user picture"
              className={`rounded-full w-full h-full object-cover border-4 transition-all duration-300 ${
                uploading 
                  ? 'border-blue-500' 
                  : uploadError 
                  ? 'border-red-500' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            
            {/* Upload overlay when uploading */}
            {uploading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 rounded-full">
                <div className="text-white text-xs font-medium mb-1">
                  {uploadProgress < 100 ? 'Uploading...' : 'Processing...'}
                </div>
                <div className="text-white text-xs">
                  {uploadProgress}%
                </div>
              </div>
            )}
          </div>
          
          {/* Hover effect when not uploading */}
          {!uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 rounded-full transition-all duration-300 pointer-events-none">
              <div className="text-white text-xs font-medium opacity-0 hover:opacity-100 transition-opacity duration-300">
                Click to change
              </div>
            </div>
          )}
        </div>

        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          onChange={handleInputChange}
          defaultValue={currentUser?.username}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="Email"
          onChange={handleInputChange}
          defaultValue={currentUser?.email}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="****"
          onChange={handleInputChange}
        />

        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      
      <div className="text-red-500 cursor-pointer flex justify-between mt-4">
        <span>Delete Account</span>
        <span>Sign Out</span>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast>
            <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
              toastType === 'success' 
                ? 'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200' 
                : 'bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200'
            }`}>
              {toastType === 'success' ? (
                <HiCheck className="h-5 w-5" />
              ) : (
                <HiExclamation className="h-5 w-5" />
              )}
            </div>
            <div className="ml-3 text-sm font-normal">
              {toastMessage}
            </div>
            <Toast.Toggle onDismiss={() => setShowToast(false)} />
          </Toast>
        </div>
      )}
    </div>
  );
}