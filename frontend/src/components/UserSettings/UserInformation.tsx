import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"

import {
  type ApiError,
  type UserPublic,
  UsersService,
  type UserUpdateMe,
} from "@/client"
import useAuth from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import { emailPattern, handleError } from "@/utils"
import { Field } from "../ui/field"

const UserInformation = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const [editMode, setEditMode] = useState(false)
  const { user: currentUser } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<UserPublic>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      full_name: currentUser?.full_name,
      email: currentUser?.email,
      first_name: currentUser?.first_name,
      last_name: currentUser?.last_name,
      patronymic: currentUser?.patronymic,
      birthday: currentUser?.birthday,
      phone: currentUser?.phone,
      position: currentUser?.position,
      computer_number: currentUser?.computer_number,
      status: currentUser?.status,
      project: currentUser?.project,
      department: currentUser?.department,
      manager: currentUser?.manager,
      photo_path: currentUser?.photo_path,
    },
  })

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const mutation = useMutation({
    mutationFn: (data: UserUpdateMe) =>
      UsersService.updateUserMe({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast("User updated successfully.")
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries()
    },
  })

  const onSubmit: SubmitHandler<UserUpdateMe> = async (data) => {
    mutation.mutate(data)
  }

  const onCancel = () => {
    reset()
    toggleEditMode()
  }

  return (
    <Container maxW="full">
      <Heading size="sm" py={4}>
        User Information
      </Heading>
      <Box
        w={{ sm: "full", md: "sm" }}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field label="Full name">
          {editMode ? (
            <Input
              {...register("full_name", { maxLength: 30 })}
              type="text"
              size="md"
            />
          ) : (
            <Text
              fontSize="md"
              py={2}
              color={!currentUser?.full_name ? "gray" : "inherit"}
              truncate
              maxW="sm"
            >
              {currentUser?.full_name || "N/A"}
            </Text>
          )}
        </Field>
        <Field
          mt={4}
          label="Email"
          invalid={!!errors.email}
          errorText={errors.email?.message}
        >
          {editMode ? (
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: emailPattern,
              })}
              type="email"
              size="md"
            />
          ) : (
            <Text fontSize="md" py={2} truncate maxW="sm">
              {currentUser?.email}
            </Text>
          )}
        </Field>
        <Field label="First name">
          {editMode ? (
            <Input {...register("first_name")} type="text" size="md" />
          ) : (
            <Text fontSize="md" py={2} truncate maxW="sm">
              {currentUser?.first_name || "N/A"}
            </Text>
          )}
        </Field>
        <Field mt={4} label="Last name">
          {editMode ? (
            <Input {...register("last_name")} type="text" size="md" />
          ) : (
            <Text fontSize="md" py={2} truncate maxW="sm">
              {currentUser?.last_name || "N/A"}
            </Text>
          )}
        </Field>
        <Field mt={4} label="Patronymic">
          {editMode ? (
            <Input {...register("patronymic")} type="text" size="md" />
          ) : (
            <Text fontSize="md" py={2} truncate maxW="sm">
              {currentUser?.patronymic || "N/A"}
            </Text>
          )}
        </Field>
        <Field mt={4} label="Birthday">
          {editMode ? (
            <Input {...register("birthday")} type="text" size="md" placeholder="ДД-ММ" />
          ) : (
            <Text fontSize="md" py={2} truncate maxW="sm">
              {currentUser?.birthday || "N/A"}
            </Text>
          )}
        </Field>
        <Field mt={4} label="Phone">
          {editMode ? (
            <Input {...register("phone")} type="text" size="md" placeholder="+7XXXXXXXXXX" />
          ) : (
            <Text fontSize="md" py={2} truncate maxW="sm">
              {currentUser?.phone || "N/A"}
            </Text>
          )}
        </Field>
        <Field mt={4} label="Position">
          {editMode ? (
            <Input {...register("position")} type="text" size="md" />
          ) : (
            <Text fontSize="md" py={2} truncate maxW="sm">
              {currentUser?.position || "N/A"}
            </Text>
          )}
        </Field>
        <Field mt={4} label="Computer number">
          {editMode ? (
            <Input {...register("computer_number")} type="text" size="md" />
          ) : (
            <Text fontSize="md" py={2} truncate maxW="sm">
              {currentUser?.computer_number || "N/A"}
            </Text>
          )}
        </Field>
        <Field mt={4} label="Status">
          {editMode ? (
            <Input {...register("status")} type="text" size="md" />
          ) : (
            <Text fontSize="md" py={2} truncate maxW="sm">
              {currentUser?.status || "N/A"}
            </Text>
          )}
        </Field>
        <Field mt={4} label="Project">
          {editMode ? (
            <Input {...register("project")} type="text" size="md" />
          ) : (
            <Text fontSize="md" py={2} truncate maxW="sm">
              {currentUser?.project || "N/A"}
            </Text>
          )}
        </Field>
        <Field mt={4} label="Department">
          {editMode ? (
            <Input {...register("department")} type="text" size="md" />
          ) : (
            <Text fontSize="md" py={2} truncate maxW="sm">
              {currentUser?.department || "N/A"}
            </Text>
          )}
        </Field>
        <Field mt={4} label="Manager">
          {editMode ? (
            <Input {...register("manager")} type="text" size="md" />
          ) : (
            <Text fontSize="md" py={2} truncate maxW="sm">
              {currentUser?.manager || "N/A"}
            </Text>
          )}
        </Field>
        <Field mt={4} label="Photo path">
          {editMode ? (
            <Input {...register("photo_path")} type="text" size="md" />
          ) : (
            <Text fontSize="md" py={2} truncate maxW="sm">
              {currentUser?.photo_path || "N/A"}
            </Text>
          )}
        </Field>
        <Flex mt={4} gap={3}>
          <Button
            variant="solid"
            onClick={toggleEditMode}
            type={editMode ? "button" : "submit"}
            loading={editMode ? isSubmitting : false}
            disabled={editMode ? !isDirty || !getValues("email") : false}
          >
            {editMode ? "Save" : "Edit"}
          </Button>
          {editMode && (
            <Button
              variant="subtle"
              colorPalette="gray"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
        </Flex>
      </Box>
    </Container>
  )
}

export default UserInformation
