import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import firebaseConfig from "../../config";

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);

      setCurrentUser(true);
    } catch (err) {
      alert(err);
    }
    console.log(currentUser);
    if (currentUser) {
      return <Navigate to="/dashboard" />;
    }
  };
  return (
    <>
      <section className="section container">
        <h1>Sign Up</h1>
        <div className="columns is-centered">
          <div className="column is-half">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input" type="email" name="email" />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className="input" type="password" name="password" />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button
                    type="submit"
                    value="Submit"
                    className="button is-link"
                  >
                    Submit
                  </button>
                </div>
                <div className="control">
                  <button className="button is-text">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
