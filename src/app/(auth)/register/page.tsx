import Register from "@/components/auth/register";
import React from "react";

const SignIn = () => {
  return (
    <div className="w-full flex mt-20 justify-center">
      <section className="flex flex-col w-full">
        <Register />
      </section>
    </div>
  );
};

export default SignIn;

// import Login from "@/components/auth/login";
// import Register from "@/components/auth/register";
// import Footer from "@/components/Footer";
// import React from "react";

// const page = () => {
//   return (
//     <div className="container  bg-gradient-to-r from-indigo-50 from-10% via-sky-50 via-30% to-emerald-50 to-90%">
//       <Register />
//       <Footer />
//     </div>
//   );
// };

// export default page;
