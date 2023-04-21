import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginSignUpPage() {
  const navigate = useNavigate();
  const [isLogInPage, setIsLogInPage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSignUpText = (val) => {
    if (val) return "Login";
    return "Signup";
  };

  const clickHandler = async () => {
    if (isLogInPage) {
      let data = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("userData", JSON.stringify(data.data));
    } else {
      let data = await axios.post("http://localhost:5000/signup", {
        name: name,
        email: email,
        password: password,
      });
      localStorage.setItem("userData", JSON.stringify(data.data));
    }
    navigate("/dashboard");
  };

  useEffect(() => {
    let userData = localStorage.getItem("userData");
    if (userData) navigate("/dashboard");
    else setIsLogInPage(true);
  }, []);
  return (
    <>
      <div className="loginSignupWrapper">
        <div>{loginSignUpText(isLogInPage)} Page</div>
        <div>
          {!isLogInPage && (
            <input
              type="name"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={() => clickHandler()}>
          {loginSignUpText(isLogInPage)}
        </button>
        <div>
          <a href="#" onClick={() => setIsLogInPage(!isLogInPage)}>
            {loginSignUpText(!isLogInPage)}
          </a>
        </div>
      </div>
      <div className="description">
        <div style={{ borderBottom: "1px solid" }}>Description</div>
        <div>1. This is video sharing platform.</div>
        <div>2. Here you can upload video, like & comment on video</div>
        <div>3. If you are new then singup or use this credential to explore platform. <span style={{ fontWeight: "700" }}>(arsalan@gmail.com, 123456789)</span></div>
      </div>
    </>
  );
}
