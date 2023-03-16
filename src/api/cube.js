import cubejs from "@cubejs-client/core";
import jwt from "jsonwebtoken";

const cubeToken = jwt.sign({}, process.env.NEXT_PUBLIC_CUBEJS_API_KEY, {
  expiresIn: "30d",
});

const cubejsApi = cubejs(cubeToken, {
  apiUrl: process.env.NEXT_PUBLIC_CUBEJS_API_URL,
});

export default cubejsApi;
