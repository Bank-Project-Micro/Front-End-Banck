import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Dashboard } from "./pages/Dashboard"
import { Customers } from "./pages/Customers"
import { NewCustomer } from "./pages/NewCustomer"
import { Accounts } from "./pages/Accounts"
import { NewAccount } from "./pages/NewAccount"
import "./App.css"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/new" element={<NewCustomer />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/accounts/new" element={<NewAccount />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

