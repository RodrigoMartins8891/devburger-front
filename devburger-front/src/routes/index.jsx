import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home/home";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import { MeusPedidos } from "../pages/pedidos/MeusPedidos";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";

// Admin Imports
import { AdminRoute } from "./AdminRoute";
import { PrivateRoute } from "./PrivateRoute";
import { AdminLayout } from "../pages/Admin/AdminLayout";
import { AdminPedidos } from "../pages/Admin/AdminPedidos";
import { AdminProdutos } from "../pages/Admin/AdminProdutos";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 CLIENTE */}
        <Route path="/home" element={<PrivateRoute><App /></PrivateRoute>} />
        <Route path="/carrinho" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/meus-pedidos" element={<PrivateRoute><MeusPedidos /></PrivateRoute>} />

        {/* 🔐 PAINEL ADMIN - Versão Corrigida */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* Use 'index' como atributo, não como tag */}
          <Route index element={<AdminPedidos />} /> 
          <Route path="pedidos" element={<AdminPedidos />} />
          <Route path="produtos" element={<AdminProdutos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}