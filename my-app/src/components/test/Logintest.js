import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import firebaseConfig from "../../config";
import { AuthContext } from "../Auth";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    try {
      firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <section className="section container">
        <h1>Login Up</h1>
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
                  <button type="submit" value="submit" className="button is-link">Submit</button>
                </div>
                <div className="control">
                  <button type="submit" className="button is-text">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
