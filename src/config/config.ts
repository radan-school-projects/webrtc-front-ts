const config = {
  port: process.env.PORT || 3000,
  /*
    TODO: i don't know why dotenv and even setting up env variables
    TODO: in the scripts doesn't work with create-react-app generated apps
  */
  apiUrl: "https://mern-mono-ts.herokuapp.com/api" || "http://localhost:9999/api",
};

export default config;
