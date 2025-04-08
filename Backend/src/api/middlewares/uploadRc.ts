import multer from "multer";

const storage = multer.memoryStorage();
const uploadRc = multer({ storage });

export default uploadRc;
