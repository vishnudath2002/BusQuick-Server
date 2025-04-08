import { IBusRepository } from "../../interfaces/IBusRepository";
import cloudinary from "../../../api/infrastructure/config/cloudinary";

export class AddRc {
    constructor(private busRepository: IBusRepository) {}

    async execute(busId: string, fileBuffer: Buffer) {
        
        if (!fileBuffer) {
            return { success: false, message: "No file provided", data: null };
        }

        try {
            
            const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
                cloudinary.uploader.upload_stream({ folder: "rc_pictures" },
                    (error, result) => {
                        if (error || !result) {
                            reject({ success: false, message: "Cloudinary upload failed", data: null });
                        } else {
                            resolve(result);
                        }
                    }
                ).end(fileBuffer);
            });

       
            const updatedBus = await this.busRepository.updateBus(busId, { busDoc: result.secure_url });

            if (!updatedBus) {
                return { success: false, message: "Bus not found or update failed", data: null };
            }

            return { success: true, message: "Profile photo uploaded successfully", data: updatedBus };

        } catch (error) {
            console.log("error while add rc book", error)
            return { success: false, message: "An error occurred during upload", data: null };
        }
    }
}
