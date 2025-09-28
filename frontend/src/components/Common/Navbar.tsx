import { Flex, Image, useBreakpointValue, Box } from "@chakra-ui/react"
import { Link } from "@tanstack/react-router"
import { useTheme } from "next-themes"

import LogoBlack from "/assets/images/navlogo-black.svg"
import LogoWhite from "/assets/images/navlogo-white.svg"
import UserMenu from "./UserMenu"
import NavbarItems from "./NavbarItems"

function Navbar() {
  const display = useBreakpointValue({ base: "none", md: "flex" })
  const { theme, resolvedTheme } = useTheme()

  // resolvedTheme учитывает system-настройку
  const currentTheme = theme === "system" ? resolvedTheme : theme
  const logoSrc = currentTheme === "dark" ? LogoWhite : LogoBlack

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
        <Image src={logoSrc} alt="Logo" maxW="xs" p={2} />
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
