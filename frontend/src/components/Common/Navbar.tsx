import { Flex, Image, useBreakpointValue, Box } from "@chakra-ui/react"
import { Link } from "@tanstack/react-router"

import Logo from "/assets/images/fastapi-logo.svg"
import UserMenu from "./UserMenu"
import NavbarItems from "./NavbarItems" // импортируем список пунктов

function Navbar() {
  const display = useBreakpointValue({ base: "none", md: "flex" })

  return (
    <Flex
      display={display}
      justify="space-between"
      align="center"
      position="sticky"
      color="inherit"
      bg="bg.muted"
      w="100%"
      top={0}
      p={4}
    >
      {/* Логотип слева */}
      <Link to="/">
        <Image src={Logo} alt="Logo" maxW="3xs" p={2} />
      </Link>

      {/* Центр: пункты меню */}
      <Box flex="1" display="flex" justifyContent="center">
        <NavbarItems />
      </Box>

      {/* Справа: меню пользователя */}
      <Flex gap={2} alignItems="center">
        <UserMenu />
      </Flex>
    </Flex>
  )
}

export default Navbar
