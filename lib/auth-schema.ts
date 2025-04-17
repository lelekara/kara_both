import {z} from "zod";

export const formSchema = z.object({
    name : z
        .string()
        .min(2, {message: 'Name must be at least 2 characters'})
        .max(50, {message: 'Name must be at most 50 characters'}),
    email : z
        .string()
        .email({message: 'Invalid email address'}),
    password : z
        .string()
        .min(8, {message: 'Password must be at least 8 characters'})
        .max(50, {message: 'Password must be at most 50 characters'}),
});

export const signInFormSchema = formSchema.pick({
    email : true,
    password : true,
});
        