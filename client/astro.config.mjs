import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    preact(),
    image({
      serviceEntryPoint: "my-image-service/astro.js",
    }),
  ],
});
