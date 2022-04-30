/* eslint-disable import/no-anonymous-default-export */
export default async function (req, res) {
  const { cookies } = req;

  const jwt = cookies.AdminToken;
  
  if (!jwt) {
    return res.json({ message: "Invalid token!" });
  }
  
  res.json({ message: "Successfull!" });
}
