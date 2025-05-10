package org.example.controllers;

import java.util.List;

import org.example.models.Recipe;
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

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@Valid @RequestBody Recipe recipe) {
        return ResponseEntity.ok(recipeRepository.save(recipe));
    }

    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        return ResponseEntity.ok(recipeRepository.findAll());
    }

    @GetMapping("/public")
    public ResponseEntity<List<Recipe>> getPublicRecipes() {
        return ResponseEntity.ok(recipeRepository.findByIsPublicTrue());
    }

    @GetMapping("/my")
    public ResponseEntity<List<Recipe>> getMyRecipes(@RequestParam Long userId) {
        return ResponseEntity.ok(recipeRepository.findByUserId(userId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Recipe>> searchRecipes(@RequestParam String q) {
        return ResponseEntity.ok(recipeRepository.findByNameContainingIgnoreCase(q));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        recipeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}