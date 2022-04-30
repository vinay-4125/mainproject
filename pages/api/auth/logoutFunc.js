/* eslint-disable import/no-anonymous-default-export */
import { serialize } from "cookie";

export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies;
  console.log(jwt)

  if (!jwt) {
    return res.json({ message: "Login" });
  } else {
    const serialized = serialize("AdminToken", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/admin",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({ message: "Successfuly logged out!" });
  }
}
