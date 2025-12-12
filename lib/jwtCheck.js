import { cookies } from "next/headers";
import { User, connectDB } from "@/lib/connectDB";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function jwtCheck() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      console.log("Token not found");
      return false;
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (!payload || !payload.userId) {
      console.log("Token is invalid");
      return false;
    }

    await connectDB();
    const user = await User.findById(payload.userId);
    if (!user) {
      console.log("User not found");
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error during JWT check:", err);
    return false;
  }
}
