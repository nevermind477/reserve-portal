/*  */
import { Flex, Icon, Text } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { Link as RouterLink } from "@tanstack/react-router"
import { FiBriefcase, FiHome, FiSettings, FiUsers } from "react-icons/fi"
import type { IconType } from "react-icons/lib"

import type { UserPublic } from "@/client"

const items = [
  { icon: FiHome, title: "Главная", path: "/" },
  { icon: FiBriefcase, title: "Объекты", path: "/items" },
  { icon: FiSettings, title: "Команда", path: "/" },
  { icon: FiSettings, title: "Документация", path: "/" },
  { icon: FiSettings, title: "Новости", path: "/" },
  { icon: FiSettings, title: "О сайте", path: "/" },
]

interface NavbarItemsProps {
  onClose?: () => void
}

interface Item {
  icon: IconType
  title: string
  path: string
}

const NavbarItems = ({ onClose }: NavbarItemsProps) => {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  const finalItems: Item[] = currentUser?.is_superuser
    ? [...items, { icon: FiUsers, title: "Admin", path: "/admin" }]
    : items

  const listItems = finalItems.map(({ icon, title, path }) => (
    <RouterLink key={title} to={path} onClick={onClose}>
      <Flex
        gap={2}
        px={3}
        py={1}
        _hover={{
          background: "gray.subtle",
        }}
        alignItems="center"
        fontSize="sm"
        borderRadius="md"
      >
        <Icon as={icon} />
        <Text>{title}</Text>
      </Flex>
    </RouterLink>
  ))

  return (
    <Flex as="nav" direction="row" gap={4} align="center">
      {listItems}
    </Flex>
  )
}

export default NavbarItems
