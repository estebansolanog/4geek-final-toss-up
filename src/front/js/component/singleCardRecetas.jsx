import React from "react";





import {
    Container,
    makeStyles,

} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        // padding: theme.spacing(2),
    }
}));

const SingleCardRecetas = ({ image, title, description, ingredients, instructions }) => {


    return (
        <>

            <div className="h-100 ">
                <img className="rounded-4 img-fluid d-xs-none d-sm-none d-md-none " src={image} alt={title} style={{ borderRadius: "5%" }} />

                <div className="contenido" style={{ display: 'flex', color: 'white', paddingTop: '40px', width: '100%', border: '1px solid-succes', paddingBottom: '15%' }}>
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
                        <div className="col align-items-end  d-none d-xs-block d-sm-block d-md-block ">
                            <img className="rounded-4 img-fluid" src={image} alt={title} style={{ borderRadius: "5%" }} />



                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

const Receta = () => {



    const recipe = {
        image: 'https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?s=612x612&w=0&k=20&c=St-gpRn58eIa8EDAHpn_yO4CZZAnGD6wKpln9l3Z3Ok=',
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





