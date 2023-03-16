import cubejs from "@cubejs-client/core";

const cubejsApi = cubejs(process.env.NEXT_PUBLIC_CUBEJS_API_KEY, {
  apiUrl: process.env.NEXT_PUBLIC_CUBEJS_API_URL,
});

export default cubejsApi;
