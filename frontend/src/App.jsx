import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import MealPlans from './pages/MealPlans';
import CreateRecipe from './pages/CreateRecipe';
import CreateMealPlan from './pages/CreateMealPlan';
import AssignRecipes from './pages/AssignRecipes';
import ViewMealPlanRecipes from './pages/ViewMealPlanRecipes';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public pages without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Pages using shared layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="mealplans" element={<MealPlans />} />
          <Route path="mealplans/:mealPlanId/recipes" element={<ViewMealPlanRecipes />} />

          {/* 🔒 Protected Routes */}
          <Route path="create" element={
            <PrivateRoute><CreateRecipe /></PrivateRoute>
          } />
          <Route path="mealplans/create" element={
            <PrivateRoute><CreateMealPlan /></PrivateRoute>
          } />
          <Route path="assign" element={
            <PrivateRoute><AssignRecipes /></PrivateRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
