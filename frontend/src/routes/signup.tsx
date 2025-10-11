import { Container, Flex, Image, Input, Text } from "@chakra-ui/react"
import {
  createFileRoute,
  Link as RouterLink,
  redirect,
} from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FiLock, FiUser } from "react-icons/fi"
import { useTheme } from "next-themes"   // 👈 добавляем

import type { UserRegister } from "@/client"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { InputGroup } from "@/components/ui/input-group"
import { PasswordInput } from "@/components/ui/password-input"
import useAuth, { isLoggedIn } from "@/hooks/useAuth"
import { confirmPasswordRules, emailPattern, passwordRules } from "@/utils"

// 👇 импортируем два варианта логотипа
import LogoBlack from "/assets/images/navlogo-black.svg"
import LogoWhite from "/assets/images/navlogo-white.svg"

export const Route = createFileRoute("/signup")({
  component: SignUp,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

interface UserRegisterForm extends UserRegister {
  confirm_password: string
}

function SignUp() {
  const { signUpMutation } = useAuth()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
      patronymic: "",
      birthday: "",
      phone: "",
      position: "",
      computer_number: "",
      status: "",
      project: "",
      department: "",
      manager: "",
      photo_path: "",
    },
  })

  const { theme, resolvedTheme } = useTheme()
  const currentTheme = theme === "system" ? resolvedTheme : theme
  const logoSrc = currentTheme === "dark" ? LogoWhite : LogoBlack

  const onSubmit: SubmitHandler<UserRegisterForm> = (data) => {
    signUpMutation.mutate(data)
  }

  return (
    <Flex flexDir={{ base: "column", md: "row" }} justify="center" h="100vh">
      <Container
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        h="100vh"
        maxW="sm"
        alignItems="stretch"
        justifyContent="center"
        gap={4}
        centerContent
      >
        <Image
          src={logoSrc}   // 👈 логотип меняется в зависимости от темы
          alt="FastAPI logo"
          height="auto"
          maxW="xs"
          alignSelf="center"
          mb={4}
        />
        <Field
          invalid={!!errors.full_name}
          errorText={errors.full_name?.message}
        >
          <InputGroup w="100%" startElement={<FiUser />}>
            <Input
              minLength={3}
              {...register("full_name", {
                required: "Full Name is required",
              })}
              placeholder="Full Name"
              type="text"
            />
          </InputGroup>
        </Field>

        <Field invalid={!!errors.email} errorText={errors.email?.message}>
          <InputGroup w="100%" startElement={<FiUser />}>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: emailPattern,
              })}
              placeholder="Email"
              type="email"
            />
          </InputGroup>
        </Field>
        <PasswordInput
          type="password"
          startElement={<FiLock />}
          {...register("password", passwordRules())}
          placeholder="Password"
          errors={errors}
        />
        <PasswordInput
          type="confirm_password"
          startElement={<FiLock />}
          {...register("confirm_password", confirmPasswordRules(getValues))}
          placeholder="Confirm Password"
          errors={errors}
        />
        <Field label="First name">
          <Input {...register("first_name")} type="text" size="md" />
        </Field>
        <Field label="Last name">
          <Input {...register("last_name")} type="text" size="md" />
        </Field>
        <Field label="Patronymic">
          <Input {...register("patronymic")} type="text" size="md" />
        </Field>
        <Field label="Birthday">
          <Input {...register("birthday")} type="text" size="md" placeholder="ДД-ММ" />
        </Field>
        <Field label="Phone">
          <Input {...register("phone")} type="text" size="md" placeholder="+7XXXXXXXXXX" />
        </Field>
        <Field label="Position">
          <Input {...register("position")} type="text" size="md" />
        </Field>
        <Field label="Computer number">
          <Input {...register("computer_number")} type="text" size="md" />
        </Field>
        <Field label="Status">
          <Input {...register("status")} type="text" size="md" />
        </Field>
        <Field label="Project">
          <Input {...register("project")} type="text" size="md" />
        </Field>
        <Field label="Department">
          <Input {...register("department")} type="text" size="md" />
        </Field>
        <Field label="Manager">
          <Input {...register("manager")} type="text" size="md" />
        </Field>
        <Field label="Photo path">
          <Input {...register("photo_path")} type="text" size="md" />
        </Field>
        <Button variant="solid" type="submit" loading={isSubmitting}>
          Sign Up
        </Button>
        <Text>
          Already have an account?{" "}
          <RouterLink to="/login" className="main-link">
            Log In
          </RouterLink>
        </Text>
      </Container>
    </Flex>
  )
}

export default SignUp
