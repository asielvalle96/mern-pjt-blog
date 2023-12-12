// Importar createRoot from react-dom
import { createRoot } from 'react-dom/client'
import { App } from './src/App.jsx'

// Con createRoot obtengo donde quiero renderizar mi app.
const root = createRoot(document.getElementById('app'))

// Primer componente de React que voy a renderizar.
root.render(<App />)
