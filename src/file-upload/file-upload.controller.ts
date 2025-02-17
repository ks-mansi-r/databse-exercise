import { Controller, Post,Get, Delete,UploadedFile, UseInterceptors, NotFoundException } from "@nestjs/common";
import { FileUploadService } from "./service/file-upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Param } from "@nestjs/common";
import { Pipe } from "stream";
@Controller('upload')

export class FileUploadController{

    constructor(private readonly fileUploadService : FileUploadService){}



    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadfile(@UploadedFile() file: Express.Multer.File ){
        return this.fileUploadService.uploadFile(file.originalname, file.buffer);
    }

    @Get('download/:fileName')
    async getFile(@Param('fileName') fileName: string) {
       
        try{
            return this.fileUploadService.getFile(fileName);
        }catch(error){

            throw new NotFoundException('file is not found');
        }
    }

    @Delete('delete/:fileName')
    async deleteFile(@Param('fileName') fileName: string) {
        
        return this.fileUploadService.deleteFile(fileName);
    }
}