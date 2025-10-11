import { Box, Container, Heading, SimpleGrid, Stack, Text, Image, Badge, Flex } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/about")({
  component: About,
})

function About() {
  return (
    <Box bg="bg.muted" minH="100vh">
      {/* Hero секция */}
      <Box
        bg="bg.panel"
        pt={{ base: 16, md: 24 }}
        pb={{ base: 20, md: 32 }}
      >
        <Container maxW="container.xl">
          <Stack gap={6} align="center" textAlign="center">
            <Badge
              colorPalette="colorPalette"
              fontSize="sm"
              px={4}
              py={2}
              borderRadius="full"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Внутренний портал
            </Badge>
            <Heading
              size={{ base: "2xl", md: "3xl", lg: "4xl" }}
              maxW="900px"
              lineHeight="1.2"
            >
              Единое пространство для эффективной работы команды
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              maxW="800px"
              color="fg.muted"
              lineHeight="1.6"
            >
              Портал создан для того, чтобы объединить сотрудников, ускорить взаимодействие между отделами
              и сделать рабочие процессы прозрачнее и удобнее
            </Text>
          </Stack>
        </Container>
      </Box>

      {/* Основной контент */}
      <Container maxW="container.xl" py={{ base: 16, md: 24 }}>
        {/* Миссия */}
        <Box
          bg="bg.panel"
          borderRadius="2xl"
          p={{ base: 8, md: 12, lg: 16 }}
          mb={{ base: 16, md: 24 }}
          boxShadow="sm"
        >
          <Stack gap={8} align="center" textAlign="center">
            <Heading as="h2" size={{ base: "xl", md: "2xl" }}>
              Наша миссия
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              maxW="700px"
              lineHeight="1.8"
              color="fg.muted"
            >
              Мы стремимся, чтобы каждый сотрудник чувствовал себя частью большой команды
              и всегда имел доступ к актуальной информации. Портал — это не просто инструмент,
              это центр корпоративной культуры и командного духа.
            </Text>
          </Stack>
        </Box>

        {/* Возможности */}
        <Stack gap={8} mb={{ base: 12, md: 16 }}>
          <Flex justify="center" align="center" direction="column" gap={4}>
            <Badge
              variant="subtle"
              colorPalette="colorPalette"
              fontSize="sm"
              px={4}
              py={2}
              borderRadius="full"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Возможности портала
            </Badge>
            <Heading
              as="h2"
              size={{ base: "xl", md: "2xl" }}
              textAlign="center"
            >
              Всё необходимое в одном месте
            </Heading>
          </Flex>
        </Stack>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={{ base: 6, md: 8, lg: 10 }}
        >
          <FeatureCard
            icon="https://cdn.prod.website-files.com/68b193dbeb2d870148772440/68b193dceb2d8701487724f1_Icon%201.svg"
            title="Новости компании"
            description="Будьте в курсе последних событий, достижений и планов развития. Все важные новости собраны в одном месте."
          />
          <FeatureCard
            icon="https://cdn.prod.website-files.com/68b193dbeb2d870148772440/68b193dceb2d8701487724f3_Icon%201.svg"
            title="Справочник коллег"
            description="Быстрый поиск сотрудников по отделам, контактные данные, должности и области ответственности."
          />
          <FeatureCard
            icon="https://cdn.prod.website-files.com/68b193dbeb2d870148772440/68b193dceb2d8701487724ee_Icon%203.svg"
            title="База документов"
            description="Доступ к приказам, регламентам, политикам и другим важным внутренним документам компании."
          />
          <FeatureCard
            icon="https://cdn.prod.website-files.com/68b193dbeb2d870148772440/68b193dceb2d8701487724f1_Icon%201.svg"
            title="Корпоративный календарь"
            description="Отслеживайте дни рождения коллег, корпоративные праздники и важные даты компании."
          />
          <FeatureCard
            icon="https://cdn.prod.website-files.com/68b193dbeb2d870148772440/68b193dceb2d8701487724ee_Icon%203.svg"
            title="Система заявок"
            description="Подавайте заявки на IT-поддержку, канцелярию, бронирование переговорных и другие услуги."
          />
          <FeatureCard
            icon="https://cdn.prod.website-files.com/68b193dbeb2d870148772440/68b193dceb2d8701487724f2_Icon%202.svg"
            title="Корпоративные события"
            description="Информация о предстоящих мероприятиях, тренингах, тимбилдингах и других событиях."
          />
        </SimpleGrid>
      </Container>

      {/* Футер секция */}
      <Box bg="bg.panel" py={{ base: 12, md: 16 }} mt={{ base: 16, md: 24 }}>
        <Container maxW="container.xl">
          <Stack gap={6} align="center" textAlign="center">
            <Heading size={{ base: "lg", md: "xl" }}>
              Присоединяйтесь к нашему сообществу
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              maxW="600px"
              color="fg.muted"
              lineHeight="1.7"
            >
              Портал постоянно развивается благодаря вашим идеям и обратной связи.
              Вместе мы создаём лучшее рабочее пространство.
            </Text>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <Stack
      gap={5}
      p={{ base: 6, md: 8 }}
      borderWidth="1px"
      borderRadius="xl"
      bg="bg.panel"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "lg",
        borderColor: "colorPalette.300"
      }}
      h="full"
    >
      <Box
        p={4}
        bg="colorPalette.50"
        borderRadius="lg"
        w="fit-content"
      >
        <Image src={icon} alt="" boxSize="40px" />
      </Box>
      <Stack gap={3}>
        <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
          {title}
        </Text>
        <Text color="fg.muted" lineHeight="1.7" fontSize={{ base: "sm", md: "md" }}>
          {description}
        </Text>
      </Stack>
    </Stack>
  )
}

export default About