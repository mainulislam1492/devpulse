import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUser } from "./auth.interfaces";

const createUserIntoDB = async(payload: IUser) => {
    console.log("PAYLOAD:", JSON.stringify(payload, null, 2));

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

export const userService = {
    createUserIntoDB,
};