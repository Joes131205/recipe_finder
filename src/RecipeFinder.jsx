import { useState } from "react";
import Recipe from "./Recipe.jsx";

const api_key = import.meta.env.VITE_REACT_APP_SPOONACULAR_API_KEY;

function RecipeFinder() {
    const [tags, setTags] = useState({
        vegan: false,
        vegetarian: false,
        gluten: false,
        dairy: false,
    });
    const [recipes, setRecipes] = useState({});

    async function generateRecipe(e) {
        console.log(tags);
        const keys = Object.keys(tags);
        const included = [];
        keys.forEach((key) => {
            if (tags[key] === true) {
                included.push(key);
            }
        });
        const url = `https://api.spoonacular.com/recipes/random?number=1${
            included.length === 0 ? "" : `&include-tags=${included.join(",")}`
        }&apiKey=${api_key}`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        if (data.recipes.length === 0) {
            alert("No such recipe");
            return;
        }
        const {
            // Dietary flags
            vegan,
            vegetarian,
            glutenFree,
            dairyFree,

            // Type of dish
            dishTypes,

            // Recipe details
            instructions,
            image,
            title,
            summary,
            extendedIngredients,

            // Time and cost
            readyInMinutes,
            pricePerServing,
        } = data.recipes[0];

        const recipeObject = {
            vegan,
            vegetarian,
            glutenFree,
            dairyFree,
            dishTypes,
            instructions,
            image,
            title,
            summary,
            extendedIngredients,
            readyInMinutes,
            pricePerServing,
        };
        setRecipes(recipeObject);
    }

    function handleChange(e) {
        console.log(e.target.checked);
        const { name, checked } = e.target;
        setTags((prev) => ({
            ...prev,
            [name]: checked,
        }));
        console.log(tags);
    }

    return (
        <div>
            <h1>Random Recipe Generator</h1>
            <div>
                <label htmlFor="vegan">
                    <input
                        type="checkbox"
                        id="vegan"
                        name="vegan"
                        checked={tags.vegan}
                        onChange={handleChange}
                    />
                    Vegan
                </label>
                <label htmlFor="vegetarian">
                    <input
                        type="checkbox"
                        id="vegetarian"
                        name="vegetarian"
                        checked={tags.vegetarian}
                        onChange={handleChange}
                    />
                    Vegetarian
                </label>
                <label htmlFor="gluten">
                    <input
                        type="checkbox"
                        id="gluten"
                        name="gluten"
                        checked={tags.gluten}
                        onChange={handleChange}
                    />
                    Gluten Free
                </label>

                <label htmlFor="dairy">
                    <input
                        type="checkbox"
                        id="dairy"
                        name="dairy"
                        checked={tags.dairy}
                        onChange={handleChange}
                    />
                    Dairy Free
                </label>
            </div>
            <button onClick={generateRecipe}>Generate!</button>
            {Object.keys(recipes).length > 0 ? <Recipe recipe={recipes} /> : ""}
            <p>Powered by Spoonacular API</p>
        </div>
    );
}

export default RecipeFinder;
