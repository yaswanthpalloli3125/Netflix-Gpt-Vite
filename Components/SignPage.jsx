import React, { useState, useRef } from "react";
import { validate } from "../src/utils";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../src/utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from "../src/utils/userSlice";
import { useDispatch } from "react-redux";

const SignPage = () => {
  const [isSignIn, setisSignIn] = useState(true);

  const [errorMessage, seterrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayName = useRef(null);
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
          updateProfile(auth.currentUser, {
            displayName: displayName.current.value,
            photoURL:
              "https://occ-0-4085-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // ...
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
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
         
            navigate("/browse");
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
          {!isSignIn && (
            <input
             ref={displayName}
              type="text"
              placeholder="Enter Name"
            ></input>
          )}
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
