import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res.data.message);
          })
          .catch((error) => {
            setError(true); // in case of error, setting it to true
          });
      };
      // if everything's alright
      sendRequest();
    }
  }, [activation_token]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {
        // in case if the token has expried or is invalid
        error ? (
          <p>Your token has been expired</p>
        ) : (
          <p>Your account has been successfully created !</p>
        )
      }
    </div>
  );
};

export default ActivationPage;
