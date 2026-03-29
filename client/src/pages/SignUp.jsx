import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import { apiData } from "../utils/apiData";

const SignUp = () => {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");


  // fetch API
  const handleSignUp = async()=>{
    try {
      const result = await axios.post(`${apiData}/api/auth/signup`,{
        fullName, email, password, mobile, role
      },{withCredentials: true});
      console.log(result.data);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-xl w-full max-w-md p-8  border-[1px]`}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          Vingo
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account to get started with delicious food deliveries.
        </p>

        {/* fullname */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter Your Full Name"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e)=> setFullName(e.target.value)} value={fullName}
          />
        </div>

        {/* email */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter Your Email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e)=> setEmail(e.target.value)} value={email}
          />
        </div>

        {/* mobile */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="mobile"
          >
            Mobile
          </label>
          <input
            type="number"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none"
            placeholder="Enter Your Mobile"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e)=> setMobile(e.target.value)} value={mobile}
          />
        </div>

        {/* password */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Enter Your Password"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e)=> setPassword(e.target.value)} value={password}
            />

            <button
              className="absolute right-3 top-[14px] text-gray-500 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? <FaRegEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Role */}

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="role"
            >
              Role
            </label>
            <div className="flex gap-2">
              {["user", "owner", "deliveryBoy"].map((r) => {
                return (
                  <>
                    <button
                      className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                      onClick={() => setRole(r)}
                      style={
                        role === r
                          ? { backgroundColor: primaryColor, color: "white" }
                          : {
                              border: `1px solid ${primaryColor}`,
                              color: "#333",
                            }
                      }
                    >
                      {r}
                    </button>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <button
          className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 cursor-pointer bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
        onClick={handleSignUp}>
          SignUp
        </button>

        <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 cursor-pointer hover:bg-gray-200">
          <FcGoogle size={20} />
          <span>Sign Up With Google</span>
        </button>
        <p
          className="text-center mt-6 cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account ?{" "}
          <Link>
            <span className="text-[#ff4d2d]">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
