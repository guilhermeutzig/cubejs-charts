import cubejs from "@cubejs-client/core";

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTQ2NjY4OTR9.0fdi5cuDZ2t3OSrPOMoc3B1_pwhnWj4ZmM3FHEX7Aus",
  {
    apiUrl:
      "https://awesome-ecom.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1",
  }
);

export default cubejsApi;
