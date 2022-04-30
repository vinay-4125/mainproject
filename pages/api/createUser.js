// import connectDB from "../../src/middleware/mongodb";
// import User from "../../src/models/userSchema";
// import { useUserAuth } from "../../src/context/UserAuthContext";

// const Handler = async (req, res) => {
//   const { user } = useUserAuth();
//   if (req.method === "POST") {
//     const { email, password } = req.body;
//     if (email && password) {
//       try {
//         const users = new User({ email: user.email, password: user.password });
//         const userCreated = await users.save();
//         return res.status(200).send(userCreated);
//       } catch (err) {
//         return res.status(400).send(err.message);
//       }
//     } else {
//       res.status(422).send("data_incomplete");
//     }
//   } else {
//     res.status(422).send("req_method_not_supported");
//   }
// };

// export default connectDB(Handler);
