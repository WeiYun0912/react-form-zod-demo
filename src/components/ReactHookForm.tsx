import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Form = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const ReactHookForm = () => {
  const validationSchema: ZodType<Form> = z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      confirmPassword: z.string(),
    })
    .refine((value) => value.password === value.confirmPassword, {
      message: "密碼不一致",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (values: Form) => {
    console.log("onSubmit : ", values);
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name : </label>
      <input type="text" {...register("name")} />
      <label>Email : </label>
      <input type="email" {...register("email")} />
      <label>Password : </label>
      <input type="password" {...register("password")} />
      <label>Confirm Password : </label>
      <input
        type="password"
        {...register("confirmPassword")}
        className={errors.confirmPassword ? "errorInput" : ""}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <input type="submit" value="Submit" />
    </form>
  );
};

export default ReactHookForm;
