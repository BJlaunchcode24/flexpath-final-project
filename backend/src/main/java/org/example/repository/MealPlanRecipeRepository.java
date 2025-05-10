package org.example.repository;

import java.util.List;

import org.example.models.MealPlanRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealPlanRecipeRepository extends JpaRepository<MealPlanRecipe, Long> {
    List<MealPlanRecipe> findByMealPlanId(Long mealPlanId);
}
