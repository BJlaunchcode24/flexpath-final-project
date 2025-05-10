package org.example.repository;

import java.util.List;

import org.example.models.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {
    List<MealPlan> findByIsPublicTrue();
    List<MealPlan> findByNameContainingIgnoreCase(String keyword);
}