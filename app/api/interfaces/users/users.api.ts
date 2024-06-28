"use server";
import { sql } from "@vercel/postgres";
import { User, UserFormData } from "./types";
import bcrypt from "bcryptjs";
import { dataFormatter } from "../utils";

export async function getAllUsers() {
  try {
    const request = await sql<User>`SELECT * FROM users`;
    return request.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting users");
  }
}

export async function getAllUsersForDashboard() {
  try {
    const request = await sql<User>`SELECT id, name, email FROM users`;
    return request.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting users");
  }
}

export async function isExistUsers() {
  try {
    const users = await getAllUsers();
    return Boolean(users.length);
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong on getting users");
  }
}

export async function getUserOnAuth(email: string): Promise<any | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user.");
  }
}

async function isExist(email: string) {
  const user = await getUserOnAuth(email);
  try {
    if (!user) {
      return false;
    }
    return user !== undefined && user !== null;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to find is user exist.");
  }
}

export async function registerUser(formData: UserFormData) {
  const { name, email, password } = formData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const isExistUser = await isExist(email);
  if (isExistUser) {
    throw new Error("This email is already taken");
  }

  try {
    await sql`
              INSERT INTO users (name, email, password)
              VALUES(${name}, ${email}, ${hashedPassword})
             `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to registrate new user");
  }
}

export async function loginUser(credentials: Pick<User, "email" | "password">) {
  try {
    const { email, password } = credentials;
    const userReq = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    const user = userReq.rows[0];

    if (!user) {
      throw new Error("No user found");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      return user;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Cannot authorize this user");
  }
}

export async function updateUser(
  id: number,
  formData: Pick<User, "email" | "name">
) {
  try {
    const queryText = `
      UPDATE users
      SET
          name = COALESCE($1, name),
          email = COALESCE($2, email)
      WHERE id=$3;
      `;
    await sql.query(queryText, dataFormatter(formData, id));
  } catch (error) {
    console.error(error);
    throw new Error("Cannot update this user");
  }
}

export async function deleteUser(id: number) {
  try {
    await sql`
      DELETE FROM users
      WHERE id=${id};
      `;
  } catch (error) {
    console.error(error);
    throw new Error("Cannot delete this user");
  }
}
