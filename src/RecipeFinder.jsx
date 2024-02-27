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
        <div className="flex flex-col gap-5 items-center justify-center">
            <h1 className="font-bold text-2xl md:text-4xl text-center">
                Random Recipe Generator
            </h1>
            <ul className="flex flex-col gap-5 items-center justify-center list-none md:text-xl">
                <li>
                    <input
                        type="checkbox"
                        id="vegan"
                        name="vegan"
                        checked={tags.vegan}
                        onChange={handleChange}
                        className="mx-10 hidden peer"
                    />
                    <label
                        htmlFor="vegan"
                        className="peer-checked:bg-dark_green-300 peer-checked:transition transition px-5 py-1 cursor-pointer rounded-xl hover:bg-celadon-800 border-4 border-dark_green-300"
                    >
                        Vegan
                    </label>
                </li>

                <li>
                    <input
                        type="checkbox"
                        id="vegetarian"
                        name="vegetarian"
                        checked={tags.vegetarian}
                        onChange={handleChange}
                        className="mx-10 hidden peer"
                    />
                    <label
                        htmlFor="vegetarian"
                        className="peer-checked:bg-dark_green-300 peer-checked:transition transition px-5 py-1 cursor-pointer rounded-xl hover:bg-celadon-800 border-4 border-dark_green-300"
                    >
                        Vegetarian
                    </label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        id="gluten"
                        name="gluten"
                        checked={tags.gluten}
                        onChange={handleChange}
                        className="mx-10 hidden peer"
                    />
                    <label
                        htmlFor="gluten"
                        className="peer-checked:bg-dark_green-300 peer-checked:transition transition px-5 py-1 cursor-pointer rounded-xl hover:bg-celadon-800 border-4 border-dark_green-300"
                    >
                        Gluten Free
                    </label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        id="dairy"
                        name="dairy"
                        checked={tags.dairy}
                        onChange={handleChange}
                        className="mx-10 hidden peer"
                    />
                    <label
                        htmlFor="dairy"
                        className="peer-checked:bg-dark_green-300 peer-checked:transition transition px-5 py-1 cursor-pointer rounded-xl hover:bg-celadon-800 border-4 border-dark_green-300"
                    >
                        Dairy Free
                    </label>
                </li>
            </ul>
            <button
                onClick={generateRecipe}
                className="bg-celadon-800 px-10 py-2 rounded-xl hover:bg-celadon-700 transition"
            >
                Generate!
            </button>
            {Object.keys(recipes).length > 0 ? <Recipe recipe={recipes} /> : ""}
            <p>
                Powered by{" "}
                <a href="https://spoonacular.com/food-api" target="_blank">
                    Spoonacular API
                </a>
            </p>
        </div>
    );
}

export default RecipeFinder;
