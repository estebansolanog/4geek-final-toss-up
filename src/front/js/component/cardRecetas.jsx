import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
const CardRecetas = (props) => {
    const { store, actions } = useContext(Context)
    return (<>
        <div className="card" style={{ width: "18rem" }}>
            <img src={"https://media.istockphoto.com/id/931643150/vector/picture-icon.jpg?s=612x612&w=0&k=20&c=St-gpRn58eIa8EDAHpn_yO4CZZAnGD6wKpln9l3Z3Ok="} className="card-img" alt="..." />
            <div className="card-body">
                <h5 className="card-title">Test</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn-warning mx-2 p-2 border-0 rounded" onClick={() => {
                    }}>
                        <span className="p-2">X</span>
                    </button>
                </div>
            </div>
        </div>
    </>)
}


export default CardRecetas;
