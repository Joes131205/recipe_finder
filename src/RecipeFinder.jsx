import { useState } from "react";
import Recipe from "./Recipe.jsx";

const api_key = import.meta.env.VITE_REACT_APP_SPOONACULAR_API_KEY;

function RecipeFinder() {
    const [input, setInput] = useState("");
    const [tags, setTags] = useState({
        vegan: false,
        vegetarian: false,
        gluten: false,
        dairy: false,
    });
    const [recipes, setRecipes] = useState({});

    async function generateRecipe(e) {
        const keys = Object.keys(tags);
        const included = [];
        keys.forEach((key) => {
            if (tags[key] === true) {
                included.push(key);
            }
        });
        const url = `https://api.spoonacular.com/recipes/random?number=1${
            included.length === 0 ? "" : `&included=`
        }${included.join(",")}&apiKey=${api_key}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
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

            <p>Powered by Spoonacular API</p>
        </div>
    );
}

export default RecipeFinder;
