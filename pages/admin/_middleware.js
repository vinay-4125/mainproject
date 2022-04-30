import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const secret = process.env.SECRET;

export default function middleware(req) {
  const { cookies } = req;

  const jwt = cookies.AdminToken;
  // const url = req.url;

  const url = req.nextUrl.clone();

  // const url = "localhost:3000/admin";
  // console.log(url);

  if(url.pathname.includes('/admin')) {
    console.log("middleware");
    if (jwt) {
      try {
        verify(jwt, secret);
        return NextResponse.next();
      } catch (error) {
        return NextResponse.redirect("/admin/dashboard");
      }
    }
  }

  if (url.pathname.includes("/admin/dashboard")) {
    console.log("dashboard middleware")
      if (jwt === undefined) {
        return NextResponse.redirect("/admin");
      }
      try {
        const user = verify(jwt, secret);
        return NextResponse.next();
      } catch (error) {
        return NextResponse.redirect("/admin");
      }
    }
  
    if (url.pathname.includes("/admin/product")) {
    console.log("product middleware")

      if (jwt === undefined) {
        return NextResponse.redirect("/admin");
      }
      try {
        const user = verify(jwt, secret);
        return NextResponse.next();
      } catch (error) {
        return NextResponse.redirect("/admin");
      }
    }
  
    if (url.pathname.includes("/admin/user")) {
    console.log("user middleware")

      if (jwt === undefined) {
        return NextResponse.redirect("/admin");
      }
      try {
        const user = verify(jwt, secret);
        return NextResponse.next();
      } catch (error) {
        return NextResponse.redirect("/admin");
      }
    }
  
  return NextResponse.next();
}


// if(url.pathname.includes('/admin')) {
//   console.log("middleware");
//   if (jwt) {
//     try {
//       verify(jwt, secret);
//       return NextResponse.next();
//     } catch (error) {
//       return NextResponse.redirect("/admin/dashboard");
//     }
//   }
// }

// if (url.pathname.includes("/admin/dashboard")) {
//   console.log("dashboard middleware")
//     if (jwt === undefined) {
//       return NextResponse.redirect("/admin");
//     }
//     try {
//       const user = verify(jwt, secret);
//       return NextResponse.next();
//     } catch (error) {
//       return NextResponse.redirect("/admin");
//     }
//   }

//   if (url.pathname.includes("/admin/product")) {
//   console.log("product middleware")

//     if (jwt === undefined) {
//       return NextResponse.redirect("/admin");
//     }
//     try {
//       const user = verify(jwt, secret);
//       return NextResponse.next();
//     } catch (error) {
//       return NextResponse.redirect("/admin");
//     }
//   }

//   if (url.pathname.includes("/admin/user")) {
//   console.log("user middleware")

//     if (jwt === undefined) {
//       return NextResponse.redirect("/admin");
//     }
//     try {
//       const user = verify(jwt, secret);
//       return NextResponse.next();
//     } catch (error) {
//       return NextResponse.redirect("/admin");
//     }
//   }