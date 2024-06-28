import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { BACKEND_URL } from "../config";
import { zodSignUp } from "@prayagtushar/mediumclone";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<zodSignUp>({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const { jwt } = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            alert("Error while signing up")
            // alert the user here that the request failed
        }
    }
    
    return (
        <div className="h-screen flex justify-center items-center bg-white text-black">
            <div className="w-full max-w-screen-sm p-8 bg-gray-100 rounded-lg shadow-lg">
                <div className="text-3xl font-extrabold mb-4 text-center">
                    {type === "signin" ? "Sign In to Your Account" : "Create Your Account"}
                </div>
                <div className="text-sm text-center mb-4">
                    {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                    <Link className="pl-1 underline" to={type === "signin" ? "/signup" : "/signin"}>
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </Link>
                </div>
                {type === "signup" &&
                    <LabelledInput label="Name" placeholder="Name" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} />
                }
                <LabelledInput label="Email" placeholder="Email" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                }} />
                <LabelledInput label="Password" type="password" placeholder="Password" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }} />
                <button onClick={sendRequest} type="button" className="mt-6 w-full bg-black text-white rounded-lg py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:bg-gray-900 transition-colors duration-300">
                    {type === "signup" ? "Sign Up" : "Sign In"}
                </button>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="w-full p-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
