import express from "express";
import { z } from "zod";

const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa de 3 caracateres" })
    .transform((name) => name.toLocaleUpperCase()),
  age: z.number(),
  document: z.string(),
});

type User = z.infer<typeof userSchema>;

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor iniciado");

  function saveUserToDatabase(user: User) {
    const { name, age } = userSchema.parse(user);

    return { name, age };
  }

  saveUserToDatabase({ name: "John Doe", age: 30, document: "12345" });
});
