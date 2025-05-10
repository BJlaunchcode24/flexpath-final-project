package org.example.repository;

import java.util.List;

import org.example.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByIsPublicTrue();
    List<Recipe> findByUserId(Long userId);
    List<Recipe> findByNameContainingIgnoreCase(String name);
}
