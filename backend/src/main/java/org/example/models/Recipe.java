package org.example.models;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Recipe name is required")
    private String name;

    @NotBlank(message = "Ingredients are required")
    @Column(columnDefinition = "TEXT")
    private String ingredients;

    @NotBlank(message = "Instructions are required")
    @Column(columnDefinition = "TEXT")
    private String instructions;

    @NotNull(message = "Cooking time is required")
    @Min(value = 1, message = "Cooking time must be at least 1 minute")
    private Integer cookingTime;

    @NotNull(message = "Visibility must be specified (true or false)")
    private Boolean isPublic;

    @NotNull
    private Long userId;


    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIngredients() { return ingredients; }
    public void setIngredients(String ingredients) { this.ingredients = ingredients; }

    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }

    public Integer getCookingTime() { return cookingTime; }
    public void setCookingTime(Integer cookingTime) { this.cookingTime = cookingTime; }

    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Long getUserId() {return userId;}
    public void setUserId(Long userId) { this.userId = userId;}
}