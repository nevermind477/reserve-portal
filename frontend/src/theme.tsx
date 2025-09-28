import { createSystem, defaultConfig } from "@chakra-ui/react"
import { buttonRecipe } from "./theme/button.recipe"

export const system = createSystem(defaultConfig, {
  globalCss: {
    html: {
      fontSize: "16px",
    },
    body: {
      fontSize: "0.875rem",
      margin: 0,
      padding: 0,
    },
    ".main-link": {
      color: "ui.main",
      fontWeight: "bold",
    },
  },
  theme: {
    tokens: {
      colors: {
        ui: {
          main: { value: "#808080" }, // серый цвет
        },
      },
    },
    recipes: {
      button: buttonRecipe,
      switch: { base: { colorPalette: "gray" } },
      checkbox: { base: { colorPalette: "gray" } },
      radio: { base: { colorPalette: "gray" } },
      input: { base: { colorPalette: "gray" } },
      textarea: { base: { colorPalette: "gray" } },
      select: { base: { colorPalette: "gray" } },
      slider: { base: { colorPalette: "gray" } },
      tag: { base: { colorPalette: "gray" } },
      badge: { base: { colorPalette: "gray" } },
    },
  },
})
