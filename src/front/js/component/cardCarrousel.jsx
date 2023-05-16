import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
const CardCarousel = (props) => {
  const { store, actions } = useContext(Context)
  return (<>
    <div className="card" style={{ width: "18rem" }}>
      <img src={props.url} className="card-img" alt="..." style={{ objectFit: "cover", height: "650px", width: "100%" }} />
      {/* <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn-warning mx-2 p-2 border-0 rounded" onClick={() => {
                    }}>
                        <span className="p-2">X</span>
                    </button>
                </div>
            </div> */}
    </div>
  </>)
}

export default CardCarousel;