import React from "react";
import "../../styles/SingleCardRecetas.css"

const SingleCardRecetas = ({ image, title, description, ingredients, instructions }) => {
    return (

        <div className="contenido" style={{ display: 'flex', color: 'white', padding: '80px' }}>
            <div className="row align-items-start">
                <div className="col">
                    <div style={{ flex: 1 }}>
                        <h2 style={{ color: "white" }}>{title}</h2>
                        <p style={{ color: "white" }}>{description}</p>
                        <h3 style={{ color: "white" }}>Ingredientes:</h3>
                        <ul>
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <h3 style={{ color: "white" }}>Instrucciones:</h3>
                        <ol>
                            {instructions.map((instruction, index) => (
                                <li key={index}>{instruction}</li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div className="col align-items-end d-xs-none">
                    <img className="rounded-4" src={image} alt={title} style={{ borderRadius: "5%" }} height={""} />


                </div>
            </div>
        </div>
    );
};

const Receta = () => {
    const recipe = {
        image: 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg',
        image2: 'https://static.vecteezy.com/system/resources/previews/001/906/862/large_2x/black-texture-background-free-photo.jpg',
        title: 'Pizza de pepperoni',
        description: 'Deliciosa pizza de pepperoni hecha en casa.',
        ingredients: [
            'Masa para pizza',
            'Salsa de tomate',
            'Queso mozzarella rallado',
            'Pepperoni',
            'Orégano',
        ],
        instructions: [
            'Precalentar el horno a 200°C.',
            'Extender la masa para pizza en una bandeja para hornear.',
            'Agregar la salsa de tomate y esparcir por toda la masa.',
            'Agregar el queso mozzarella y los pepperonis.',
            'Espolvorear orégano por encima.',
            'Hornear durante 15-20 minutos o hasta que la pizza esté dorada.',
        ],
    };

    return (
        <div style={{
            height: "90vh",
            display: "flex",

            justifyContent: "center",
            background: `url(${recipe.image2}) no-repeat center center fixed`,
            backgroundSize: "cover",

        }}>
            <SingleCardRecetas
                image={recipe.image}
                title={recipe.title}
                description={recipe.description}
                ingredients={recipe.ingredients}
                instructions={recipe.instructions}
            />
        </div>
    );
};

export default Receta;





