import config from "../config/config"
import { Client, Account , Databases,ID,Storage,Query  } from 'appwrite';

export class PostService{
    client = new Client();
    account;
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(config.appWriteUrl)
        this.client.setProject(config.projectId); // Replace with your project ID
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        console.log("in create post",title,slug,content,featuredImage,status,userId)
        try
        {
            return await this.databases.createDocument(
                        config.databaseId,
                        config.collectionId,
                        slug,
                        { title,content,featuredImage,status,userId}
                    );
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async updatePost(slug,{title,content,featuredImg,status}){
        try
        {
            return await this.databases.updateDocument(
                        config.databaseId,
                        config.collectionId,
                        slug,
                        { title,content,featuredImg,status}
                    );
        }
        catch(error)
        {
            console.log("error");
        }
    }

    async deletePost(slug){
        try
        {
            await this.databases.deleteDocument(
                        config.databaseId,
                        config.collectionId,
                        slug,
                    );

            return true;
        }
        catch(error)
        {
            console.log("error");
            return true;
        }
    }

    async getSinglePost(slug){
        try
        {
            return await this.databases.getDocument(
                        config.databaseId,
                        config.collectionId,
                        slug,
                    );

             
        }
        catch(error)
        {
            console.log("error");
        }
    }


    async getAllPost(){
        try
        {
            return await this.databases.listDocuments(
                        config.databaseId,
                        config.collectionId,
                        [
                            Query.equal('status', 'active')
                        ]
                    );

             
        }
        catch(error)
        {
            console.log("error");
        }

    }

    async fileUpload(file){
        try
        {
            return await this.bucket.createFile(
                       config.bucketId,
                       ID.unique(),
                       file
                    );

             
        }
        catch(error)
        {
            console.log("error");
        }

    }

     async deleteFile(fileId){
        try
        {
            await this.bucket.deleteFile(
                       config.bucketId,
                      fileId
                    );

                    return true
             
        }
        catch(error)
        {
            console.log("error");
            return false;
        }

    }

    getFilePreview(fileId)
    {
        
        const url = this.bucket.getFileView (config.bucketId,fileId)
        console.log("file is ",fileId,url)
        return url;
    }

}

const postServiceObj = new PostService();
export default postServiceObj;