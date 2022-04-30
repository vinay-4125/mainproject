/* eslint-disable import/no-anonymous-default-export */
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.SECRET;

export default async function(req, res) {
  const { username, password } = req.body;
  console.log(username, password);
  if (username === "admin" && password === "admin") {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        username: username,
      },
      secret
    );

    const serialized = serialize("AdminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/admin",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({ message: "Successfull login" });
  } else {
    return res.json({ message: "Invalid credentials" });
  }
}
