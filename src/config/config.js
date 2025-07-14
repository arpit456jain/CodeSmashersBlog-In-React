const config = {
    "appWriteUrl" : String(process.env.REACT_APP_APPWRITE_URL),
    "projectId" : String(process.env.REACT_APP_PROJECT_ID),
    "databaseId" : String(process.env.REACT_APP_DATABASE_ID),
    "collectionId" :String(process.env.REACT_APP_COLLECTION_ID),
    "bucketId" : String(process.env.REACT_APP_BUCKET_ID),
}

export default config;