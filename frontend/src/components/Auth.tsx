import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

type AuthProps = {
    type: "signup" | "signin";
}

export const Auth = ({ type }: AuthProps) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState({
        name: "",
        email: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/api/v1/user/${type}`, postInputs);
            const { jwt } = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (error) {
            console.error("Error while signing up/in:", error);
            alert(`Error while ${type === "signup" ? "signing up" : "signing in"}`);
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPostInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            {type === "signin" ? "Sign In to your account" : "Create your account"}
                        </div>

                        <div className="text-slate-500">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {type === "signup" && <LabelledInput label="Name" placeholder="Name" name="name" onChange={handleInputChange} />}
                        <LabelledInput label="Email" placeholder="Email" name="email" onChange={handleInputChange} />
                        <LabelledInput label="Password" placeholder="Password" type="password" name="password" onChange={handleInputChange} />
                        <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            {type === "signup" ? "Sign up" : "Sign in"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

type LabelledInputProps = {
    label: string;
    placeholder: string;
    name: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
};

function LabelledInput({ label, placeholder, name, onChange, type }: LabelledInputProps) {
    return (
        <div>
            <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                id={name}
                name={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
