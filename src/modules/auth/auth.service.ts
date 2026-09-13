import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { ILoginUser, IUser } from "./auth.interfaces";
import { error } from "node:console";
import config from "../../config";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

const createUserIntoDB = async(payload: IUser) => {
   
   const { name, email, password } = payload;
   const role = payload.role ?? "contributor";
  

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(`
        INSERT INTO users(name, email, password, role) VALUES($1,$2,$3,$4)
        RETURNING *
        `,
        [name, email, hashPassword, role],
    );
    delete result.rows[0].password;
    return result;
};

const loginUserIntoDB = async(payload : ILoginUser) => {
    const {email, password} = payload;
    
    // check if the user exist or not
    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
    `,
    [email],
     );
    if(userData.rows.length === 0) {
        throw new Error("Invalid Credentials!");
    }

    // compare the password -> done
    const userInfo = userData.rows[0];
    const matchPassword = await bcrypt.compare(password, userInfo.password);

    if(!matchPassword) {
        throw new Error("Invalid Credentials!");
    }

    // Generate token
    const user = {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role,
        created_at: userInfo.created_at,
        updated_at: userInfo.updated_at,
    };

    // const reporter_id = user.id;

    const token = jwt.sign(
        {
        user, 
        id: user.id,
        email: user.email,
        role: user.role,
        },
        config.secret as string, {
        expiresIn: "7d",
    });
   
    return { token, user };
};

export const userService = {
    createUserIntoDB,
    loginUserIntoDB,
};