import * as yup from "yup"

const formSchema = yup.object().shape({
    nameinput: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "name must be at least 2 characters")
})

export default formSchema