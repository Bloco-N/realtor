import { App } from "./app";

const app = new App()

app.server.listen(8080, () => {
  console.log('server runing in http://localhost:8080')
})