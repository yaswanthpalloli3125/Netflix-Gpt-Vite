import React, { useState, useRef } from "react";
import { validate } from "../src/utils";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../src/utils/firebase";

const SignPage = () => {
  const [isSignIn, setisSignIn] = useState(true);

  const [errorMessage, seterrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);

  const handleSign = () => {
    const message = validate(email.current.value, password.current.value);
    console.log(message);
    seterrorMessage(message);

    if (message !== null) return;

    //    sign-up & sign-in logic
    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const handleSignIn = () => {
    return setisSignIn(!isSignIn);
  };

  return (
    <div className="">
      <div className="sign-card p-5 mx-auto">
        <h2 className="text-center text-amber-100 text-3xl mb-3 sign-heading">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          {!isSignIn && <input type="text" placeholder="Enter Name"></input>}
          <input ref={email} type="email" placeholder="Enter Email"></input>
          {errorMessage === "Email is not Valid" && (
            <p className="err">{errorMessage}</p>
          )}
          <input
            ref={password}
            type="password"
            placeholder="Enter Password"
          ></input>
          {errorMessage === "Password is not Valid" && (
            <p className="err">{errorMessage}</p>
          )}
          <p className="err">{errorMessage}</p>
          <div className="text-center">
            <button onClick={handleSign} className="mb-2.5 sign-btn">
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
        <p className=" text-amber-100 new">
          {isSignIn ? "New to Netflix? " : "Already a User? "}
          <span className="click-here " onClick={handleSignIn}>
            {isSignIn ? "Sign Up now" : "Sign In now"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignPage;
