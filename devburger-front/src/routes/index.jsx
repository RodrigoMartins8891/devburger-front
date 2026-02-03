
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home/home";
import Menu from "../pages/Menu/menu";
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
import { AdminEditarProduto } from '../pages/Admin/AdminEditarProduto';

export function AppRoutes() { // Use default se for o único export do arquivo
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 CLIENTE */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        <Route
          path="/carrinho"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/meus-pedidos"
          element={
            <PrivateRoute>
              <MeusPedidos />
            </PrivateRoute>
          }
        />

        {/* 🔐 PAINEL ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminPedidos />} />
          <Route path="pedidos" element={<AdminPedidos />} />
          <Route path="produtos" element={<AdminProdutos />} />
          <Route path="produtos/editar/:id" element={<AdminEditarProduto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}