import { Module } from "@nestjs/common";
import { FileUploadController } from "./file-upload.controller";
import { FileUploadService } from "./service/file-upload.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports:[ConfigModule],
    controllers:[FileUploadController],
    providers:[FileUploadService]
})

export class FileUploadModule{}