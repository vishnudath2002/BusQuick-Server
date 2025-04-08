import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../api/infrastructure/config/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'profile_pictures',
      format: 'jpg', 
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const upload = multer({ storage: storage });

export default upload;
