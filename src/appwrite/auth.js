import config from "../config/config"
import { Client, Account , ID} from 'appwrite';

export class AuthService{
    
    client = new Client();
    account;
    constructor(){
        this.client.setEndpoint(config.appWriteUrl)
        this.client.setProject(config.projectId); // Replace with your project ID

        this.account = new Account(this.client)
        console.log(config)
    }
    
    async createAccount({email,password,name})
    {
        console.log("in auth.js",email,name,password)
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            console.log(userAccount)
            if(userAccount)
            {
                return  this.login({email,password})
            }
            else
            {
                return userAccount;
            }
        }
        catch(error)
        {
            throw error;
        }
    }

    async login({email,password})
    {
        try
        {
            return await this.account.createEmailPasswordSession(email, password);
            
        }
        catch(error)
        {
            throw error;
        }
    }

    async getCurrentUser() {
        try{
                return await this.account.get();
        }
        catch(error)
        {
            throw error;
        }
        
    }
    async logOut() {
        try{
                return await this.account.deleteSessions();
        }
        catch(error)
        {
            throw error;
        }
    }

}

const authService = new AuthService();
export default authService;