function Recipe(prop) {
    const recipe = prop.recipe;
    console.log(recipe.instructions.split("\n"));
    return (
        <div className="flex flex-col gap-5 items-center justify-center text-center px-[20%] ">
            <h1 className="font-bold text-4xl">{recipe.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
            <img src={recipe.image} alt={recipe.title} className="w-[40rem]" />
            <div className="flex gap-10">
                {recipe.vegan ? <p>Vegan</p> : ""}
                {recipe.vegetarian ? <p>Vegetarian</p> : ""}
                {recipe.gluten ? <p>Gluten Free</p> : ""}
                {recipe.dairy ? <p>Dairy Free</p> : ""}
            </div>
            <div className="flex flex-col gap-5">
                <h2 className="font-bold text-2xl">Ingredients:</h2>
                <ul className="list-outside list-disc flex flex-col gap-2">
                    {recipe.extendedIngredients.map((ingredient) => (
                        <li>{ingredient.original}</li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col gap-5">
                <h2 className="font-bold text-2xl">Instructions:</h2>
                <p
                    dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                ></p>
            </div>
        </div>
    );
}

export default Recipe;
