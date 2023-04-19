import { z, ZodType } from "zod";
import {
  Formik,
  Form,
  useField,
  ErrorMessage,
  Field,
  FieldHookConfig,
} from "Formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

type Form = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const FormikForm = () => {
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

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={toFormikValidationSchema(validationSchema)}
      onSubmit={(values: Form) => {
        console.log(values);
      }}
    >
      <Form>
        <InputField name="name" type="text" placeholder="Name..." />

        <InputField name="email" type="email" placeholder="Email..." />

        <InputField name="password" type="password" placeholder="Password..." />
        <InputField
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password..."
        />
        <input type="submit" value="Submit" />
      </Form>
    </Formik>
  );
};

const InputField = ({ ...props }: FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  console.log(meta);
  return (
    <>
      <Field {...props} {...field} />
      <ErrorMessage component="p" name={field.name} />
    </>
  );
};

export default FormikForm;
