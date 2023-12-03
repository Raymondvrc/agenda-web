import Express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const Port = 3000;
const app = Express();

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

app.use(Express.static(join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "..", "public", "index.html"));
});


app.listen(Port, () => {
  console.log(`Example app listening on port ${Port}`);
});
