import DOMPurify from "dompurify";

function Recipe(prop) {
    const recipe = prop.recipe;
    const sanitizedSummary = DOMPurify.sanitize(recipe.summary); // Sanitize content

    console.log(recipe.instructions.split("\n"));
    return (
        <div className="flex flex-col gap-8 items-center justify-center md:px-[10%] px-[15%] py-5 bg-celadon-800 rounded-xl text-sm md:text-xl">
            <h1 className="font-bold text-4xl text-center">{recipe.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: sanitizedSummary }}></p>
            <p>
                <b>
                    {recipe.length === 0
                        ? `Dish Type = ${recipe.dishTypes
                              .map(
                                  (item) =>
                                      item[0].toUpperCase() + item.slice(1)
                              )
                              .join(", ")}`
                        : ""}
                </b>
            </p>
            <img
                src={recipe.image}
                alt={recipe.title}
                className="w-[20rem] md:w-[40rem] rounded-3xl"
            />
            <div className="flex md:flex-row flex-col gap-5 md:gap-10 text-center">
                {recipe.vegan ? (
                    <p className="bg-green-900 px-2 py-2 rounded-xl font-bold text-sm md:text-xl">
                        ✅ Vegan ✅
                    </p>
                ) : (
                    <p className="bg-red-900 px-2 py-2 rounded-xl font-bold text-sm md:text-xl">
                        ❌ Vegan ❌
                    </p>
                )}
                {recipe.vegetarian ? (
                    <p className="bg-green-900 px-2 py-2 rounded-xl font-bold text-sm md:text-xl">
                        ✅ Vegetarian ✅
                    </p>
                ) : (
                    <p className="bg-red-900 px-2 py-2 rounded-xl font-bold text-sm md:text-xl">
                        ❌ Vegetarian ❌
                    </p>
                )}
                {recipe.gluten ? (
                    <p className="bg-green-900 px-2 py-2 rounded-xl font-bold text-sm md:text-xl">
                        ✅ Gluten Free ✅
                    </p>
                ) : (
                    <p className="bg-red-900 px-2 py-2 rounded-xl font-bold text-sm md:text-xl">
                        ❌ Gluten Free ❌
                    </p>
                )}
                {recipe.dairy ? (
                    <p className="bg-green-900 px-2 py-2 rounded-xl font-bold text-sm md:text-xl">
                        ✅ Dairy Free ✅
                    </p>
                ) : (
                    <p className="bg-red-900 px-2 py-2 rounded-xl font-bold text-sm md:text-xl">
                        ❌ Dairy Free ❌
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-5">
                <h2 className="font-bold text-2xl text-center">Ingredients:</h2>
                <ul className="list-outside list-disc flex flex-col gap-2">
                    {recipe.extendedIngredients.map((ingredient) => (
                        <li>{ingredient.original}</li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col gap-5 ">
                <h2 className="font-bold text-2xl text-center">
                    Instructions:
                </h2>
                <p
                    dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                ></p>
            </div>
        </div>
    );
}

export default Recipe;
