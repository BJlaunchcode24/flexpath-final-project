import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const ViewMealPlanRecipes = () => {
  const [searchParams] = useSearchParams();
  const mealPlanId = searchParams.get("id");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`/mealplans/${mealPlanId}/recipes`);
        setRecipes(res.data);
      } catch (err) {
        setError("Failed to fetch recipes for this meal plan.");
      } finally {
        setLoading(false);
      }
    };

    if (mealPlanId) {
      fetchRecipes();
    } else {
      setError("No meal plan selected.");
      setLoading(false);
    }
  }, [mealPlanId]);

  if (loading) return <Spinner animation="border" className="m-5" />;

  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Recipes in Meal Plan</h2>
      <Row>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Col md={4} key={recipe.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Cooking Time: {recipe.cookingTime} mins
                  </Card.Subtitle>
                  <Card.Text><strong>Ingredients:</strong> {recipe.ingredients}</Card.Text>
                  <Card.Text><strong>Instructions:</strong> {recipe.instructions}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No recipes found for this meal plan.</p>
        )}
      </Row>
    </Container>
  );
};

export default ViewMealPlanRecipes;
