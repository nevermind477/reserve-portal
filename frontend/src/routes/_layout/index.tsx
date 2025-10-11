import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import useAuth from "@/hooks/useAuth"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()

  return (
    <Container maxW="full">
      <Box pt={12} m={4}>
        <Text fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} fontWeight="bold" lineHeight="1.2">
          Привет, {currentUser?.full_name || currentUser?.email} 👋🏼
        </Text>
        <Text fontSize={{ base: "lg", md: "xl", lg: "2xl" }} color="fg.muted" lineHeight="1.6">
          Добро пожаловать! Рады видеть вас снова в нашем корпоративном портале
        </Text>
      </Box>
    </Container>
  )
}

export default Dashboard