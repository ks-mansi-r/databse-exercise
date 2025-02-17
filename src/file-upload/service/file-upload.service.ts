import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand , GetObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class FileUploadService {
    private s3Client: S3Client;

    constructor(private readonly configService: ConfigService) {

        this.s3Client = new S3Client({
            region: 'us-east-1',
            endpoint: 'http://localhost:9001',
            credentials: {
                accessKeyId: 'minioadmin',
                secretAccessKey:'minioadmin123',
            },
            forcePathStyle: true, // Required for MinIO
        });

    }

    //upload file method
    async uploadFile(fileName: string, file: Buffer) {
       
            await this.s3Client.send(
                new PutObjectCommand({
                    Bucket:'exercise-nestjs',
                    Key: fileName,
                    Body: file,
                    
                }),
            );
           
    }
    // Get file method
    async getFile(fileName: string) {
        try {
            const command = new GetObjectCommand({
                Bucket: 'exercise-nestjs',
                Key: fileName,
            });

            const data = await this.s3Client.send(command);

            if (!data.Body) {
                throw new InternalServerErrorException('File is not found');
            }

            return data.Body;
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve file');
        }
    }

    //Delete a file

    async deleteFile(fileName: string) {
        try {
            const command = new DeleteObjectCommand({
                Bucket: 'exercise-nestjs',
                Key: fileName,
            });

            await this.s3Client.send(command);
            
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete file');
        }
    }
}
      

