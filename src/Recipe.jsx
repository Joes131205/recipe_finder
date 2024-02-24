function Recipe(prop) {
    const recipe = prop.recipe;
    return (
        <div>
            <h1>{recipe.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
            <img src={recipe.image} alt={recipe.title} />
            <div>
                <p>Vegan: {recipe.vegan ? "yes" : "no"}</p>
                <p>Gluten Free: {recipe.gluten ? "yes" : "no"}</p>
                <p>Dairy Free: {recipe.dairy ? "yes" : "no"}</p>
                <p>Vegetarian: {recipe.vegetarian ? "yes" : "no"}</p>
            </div>
            <h2>Ingredients:</h2>
            <ul>
                {recipe.extendedIngredients.map((ingredient) => (
                    <li>{ingredient.original}</li>
                ))}
            </ul>
            <h2>Instructions:</h2>
            <ol>{recipe.instructions}</ol>
        </div>
    );
}

export default Recipe;
