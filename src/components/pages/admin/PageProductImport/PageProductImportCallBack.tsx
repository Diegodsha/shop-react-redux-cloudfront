import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

const PageProductImportCallBack = () => {
  //   console.log(process.env.REACT_APP_COGNITO_URL);
  //   const {
  //     REACT_APP_COGNITO_URL,
  //     REACT_APP_COGNITO_CLIENT_ID,
  //     REACT_APP_COGNITO_CLIENT_SECRET,
  //     REACT_APP_COGNITO_REDIRECT_URI,
  //   } = process?.env;

  const [searchParams] = useSearchParams();
  const [credentials, setCredentials] = useState();

  useEffect(() => {
    (async () => {
      const auth = btoa(
        "4kvtlbej8otvdef34t2u3qdhl7:1hs4f32pbfnncvo5og01sprr80uu2tsii6g4k2d1hp6o1pojteq5"
      );
      //b8c575a1-e8ba-4174-887c-220705408162
      const { data: credentials } = await axios.post(
        `https://react-bike-shop.auth.us-east-1.amazoncognito.com/oauth2/token`,
        {
          grant_type: "authorization_code",
          client_id: "4kvtlbej8otvdef34t2u3qdhl7",
          code: "47e06209-6cc1-4555-9c27-8cc8f41433e0",
          redirect_uri: "http://localhost:3000/admin/products/callback",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${auth}`,
          },
        }
      );
      console.log("authorization_token", credentials);
      localStorage.setItem("authorization_token", JSON.stringify(credentials));
      setCredentials(credentials);
    })();
  }, [searchParams]);

  return credentials ? <Navigate to={"/admin/products"} /> : null;
};

export default PageProductImportCallBack;
