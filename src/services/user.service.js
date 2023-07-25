import { UserModel } from "../DAO/models/users.model.js";
class userService {

    async getAll() {
        const users = await UserModel.find(
            {},
            {
                _id: true,
                email: true,
            },);
        return users;
    }

async findOne(id) {
try{
        const findOne = await UserModel.findOne({ _id: id });
        if (!findOne) {
            throw new Error("User not found.");
        }
        return product;
    } catch (err) {
        throw new Error("Cannnot search user");
    }
}
async findEmail(em) {
    try{
            const findOne = await UserModel.findOne({email:em});
            // if (!findOne) {
            //     throw new Error("User not found.");
            // }
            return findOne;
        } catch (err) {
            throw new Error("Cannnot search user",console.error(err));
            
        }
    }
    async ckeckPass(pass) {
        try {
            const find = await UserModel.findOne({password:pass})
            return find

        } catch(err){

        }

    }

    async createUser({email,password}) {
        const userCreated = await UserModel.create({
            email,
            password,
        });
        return userCreated;
    }

    async update() {
        const userUptaded = await UserModel.updateOne(
            { _id: _id },
            { email, }
        );
        return userUptaded;
    }

    async deleteOne(_id) {
        const result = await UserModel.deleteOne(_id);
        return result;
    }

}

export const UserService = new userService();