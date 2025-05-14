package org.example.controllers;

import org.example.models.Recipe;
import org.example.repository.RecipeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RecipeControllerTest {

    private RecipeRepository recipeRepository;
    private RecipeController controller;

    @BeforeEach
    void setUp() {
        recipeRepository = mock(RecipeRepository.class);
        controller = new RecipeController(recipeRepository);
    }

    @Test
    void createRecipe_returnsSavedRecipe() {
        Recipe recipe = new Recipe();
        when(recipeRepository.save(recipe)).thenReturn(recipe);

        ResponseEntity<Recipe> response = controller.createRecipe(recipe);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(recipe, response.getBody());
    }

    @Test
    void getAllRecipes_returnsList() {
        List<Recipe> recipes = List.of(new Recipe(), new Recipe());
        when(recipeRepository.findAll()).thenReturn(recipes);

        ResponseEntity<List<Recipe>> response = controller.getAllRecipes();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(recipes, response.getBody());
    }

    @Test
    void getPublicRecipes_returnsPublicRecipes() {
        List<Recipe> recipes = List.of(new Recipe());
        when(recipeRepository.findByIsPublicTrue()).thenReturn(recipes);

        ResponseEntity<List<Recipe>> response = controller.getPublicRecipes();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(recipes, response.getBody());
    }

    @Test
    void getMyRecipes_returnsUserRecipes() {
        List<Recipe> recipes = List.of(new Recipe());
        when(recipeRepository.findByUserId(1L)).thenReturn(recipes);

        ResponseEntity<List<Recipe>> response = controller.getMyRecipes(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(recipes, response.getBody());
    }

    @Test
    void searchRecipes_returnsMatchingRecipes() {
        List<Recipe> recipes = List.of(new Recipe());
        when(recipeRepository.findByNameContainingIgnoreCase("pizza")).thenReturn(recipes);

        ResponseEntity<List<Recipe>> response = controller.searchRecipes("pizza");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(recipes, response.getBody());
    }

    @Test
    void deleteRecipe_deletesAndReturnsNoContent() {
        ResponseEntity<Void> response = controller.deleteRecipe(1L);

        assertEquals(204, response.getStatusCodeValue());
        verify(recipeRepository, times(1)).deleteById(1L);
    }
}