import { Box, Container, Heading, SimpleGrid, Stack, Text, Image, Badge } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/about")({
  component: About,
})

function About() {
  return (
    <Container maxW="full" px={{ base: 4, md: 8 }} py={{ base: 8, md: 12 }}>
      {/* Интро секция */}
      <Box bg="bg.muted" borderRadius="lg" py={{ base: 10, md: 14 }} px={{ base: 6, md: 10 }} mb={8}>
        <Heading size="2xl" textAlign="center">О сайте</Heading>
      </Box>

      {/* Описание портала */}
      <Stack gap={6} mb={8}>
        <Text fontSize={{ base: "lg", md: "xl" }} textAlign="center">
          Внутренний портал нашей компании — это единое пространство для сотрудников, где собрана вся важная
          информация и инструменты для удобной работы.
        </Text>
        <Box borderBottomWidth="1px" borderColor="gray.300" />
        <Text fontSize="md">
          Портал создан для того, чтобы объединить сотрудников, ускорить взаимодействие между отделами и сделать рабочие процессы прозрачнее и удобнее.
          <br />
          <br />
          Мы стремимся, чтобы каждый сотрудник чувствовал себя частью большой команды и всегда имел доступ к актуальной информации.
        </Text>
        <Box borderBottomWidth="1px" borderColor="gray.300" />
      </Stack>

      {/* Возможности */}
      <Stack gap={4} mb={6} align="start">
        <Badge variant="subtle">возможности</Badge>
        <Heading as="h2" size="lg">Здесь вы можете</Heading>
      </Stack>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
        <FeatureCard
          icon="https://cdn.prod.website-files.com/68b193dbeb2d870148772440/68b193dceb2d8701487724f1_Icon%201.svg"
          title="Новости"
          description="Получать последние новости компании и следить за новыми проектами"
        />
        <FeatureCard
          icon="https://cdn.prod.website-files.com/68b193dbeb2d870148772440/68b193dceb2d8701487724f3_Icon%201.svg"
          title="Коллеги"
          description="Находить данные о сотрудниках и подразделениях, их контакты, должности и зоны ответственности"
        />
        <FeatureCard
          icon="https://cdn.prod.website-files.com/68b193dbeb2d870148772440/68b193dceb2d8701487724ee_Icon%203.svg"
          title="Документы"
          description="Знакомиться с приказами, указами и внутренними документами"
        />
        <FeatureCard
          icon="https://cdn.prod.website-files.com/68b193dbeb2d870148772440/68b193dceb2d8701487724f1_Icon%201.svg"
          title="Праздники"
          description="Видеть ближайшие дни рождения коллег и поздравлять их"
        />
        <FeatureCard
          icon="https://cdn.prod.website-files.com/68b193dbeb2d870148772440/68b193dceb2d8701487724ee_Icon%203.svg"
          title="Заявки"
          description="Подавать заявки на услуги, материалы и поддержку"
        />
        <FeatureCard
          icon="https://cdn.prod.website-files.com/68b193dbeb2d870148772440/68b193dceb2d8701487724f2_Icon%202.svg"
          title="События"
          description="Отслеживать актуальные мероприятия компании"
        />
      </SimpleGrid>
    </Container>
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
      gap={3}
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg="bg.panel"
      _hover={{ bg: "gray.subtle" }}
    >
      <Image src={icon} alt="" boxSize="50px" />
      <Text fontWeight="semibold" fontSize="lg">{title}</Text>
      <Text color="fg.muted">{description}</Text>
    </Stack>
  )
}

export default About
