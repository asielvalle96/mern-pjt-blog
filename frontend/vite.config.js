// Defino la configuracion.
import { defineConfig } from 'vite'
// Importo el plugin que instale.
import react from '@vitejs/plugin-react'

// Exporto por defecto el defineConfig.
export default defineConfig({
  // Se usa unicamente el plugin de React, que es el que se ha importado.
  plugins: [react()]
})
