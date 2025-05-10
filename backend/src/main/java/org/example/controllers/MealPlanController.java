package org.example.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.example.models.MealPlan;
import org.example.models.MealPlanRecipe;
import org.example.models.Recipe;
import org.example.repository.MealPlanRecipeRepository;
import org.example.repository.MealPlanRepository;
import org.example.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/mealplans")
public class MealPlanController {

    @Autowired
    private MealPlanRepository mealPlanRepository;

    @Autowired
    private MealPlanRecipeRepository mealPlanRecipeRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @PostMapping
    public ResponseEntity<MealPlan> createMealPlan(@RequestBody MealPlan mealPlan) {
        return ResponseEntity.ok(mealPlanRepository.save(mealPlan));
    }

    @GetMapping
    public ResponseEntity<List<MealPlan>> getAllMealPlans() {
        return ResponseEntity.ok(mealPlanRepository.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<MealPlan>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(mealPlanRepository.findByNameContainingIgnoreCase(keyword));
    }

    @GetMapping("/public")
    public ResponseEntity<List<MealPlan>> getPublicMealPlans() {
        return ResponseEntity.ok(mealPlanRepository.findByIsPublicTrue());
    }

    @PostMapping("/{mealPlanId}/recipes")
    public ResponseEntity<String> addRecipesToMealPlan(
            @PathVariable Long mealPlanId,
            @RequestBody List<Long> recipeIds
    ) {
        Optional<MealPlan> mealPlanOpt = mealPlanRepository.findById(mealPlanId);
        if (mealPlanOpt.isEmpty()) return ResponseEntity.notFound().build();

        MealPlan mealPlan = mealPlanOpt.get();

        for (Long recipeId : recipeIds) {
            Optional<Recipe> recipeOpt = recipeRepository.findById(recipeId);
            recipeOpt.ifPresent(recipe -> {
                MealPlanRecipe link = new MealPlanRecipe();
                link.setMealPlan(mealPlan);
                link.setRecipe(recipe);
                mealPlanRecipeRepository.save(link);
            });
        }

        return ResponseEntity.ok("Recipes added to meal plan.");
    }

    @GetMapping("/{mealPlanId}/recipes")
    public ResponseEntity<List<Recipe>> getRecipesInMealPlan(@PathVariable Long mealPlanId) {
        List<MealPlanRecipe> links = mealPlanRecipeRepository.findByMealPlanId(mealPlanId);
        List<Recipe> recipes = new ArrayList<>();
        for (MealPlanRecipe link : links) {
            recipes.add(link.getRecipe());
        }
        return ResponseEntity.ok(recipes);
    }

    @DeleteMapping("/{mealPlanId}/recipes/{recipeId}")
    public ResponseEntity<Void> removeRecipeFromMealPlan(
            @PathVariable Long mealPlanId,
            @PathVariable Long recipeId) {

        List<MealPlanRecipe> links = mealPlanRecipeRepository.findByMealPlanId(mealPlanId);
        for (MealPlanRecipe link : links) {
            if (link.getRecipe().getId().equals(recipeId)) {
                mealPlanRecipeRepository.delete(link);
                return ResponseEntity.noContent().build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMealPlan(@PathVariable Long id) {
        mealPlanRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}