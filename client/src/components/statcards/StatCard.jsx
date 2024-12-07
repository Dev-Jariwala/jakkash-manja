import React, { useEffect, useState } from "react";
import "./statcard.css";
import { Link, useNavigate } from "react-router-dom";

const StatCard = ({ icon, color, title, data, stat, link, onClick }) => {
  const increment = (data * 100) / stat;

  const whiteLineStyle = {
    width: `${increment}%`, // Set the width based on the increment percentage
  };

  return (
    <div>
      <Link to={`/${link}`} onClick={onClick}>
        <div className={`statcard ${color}`}>
          <div className="d-group">
            <div className="icon">{icon}</div>
            <div className="content">
              <div className="title ct">{title}</div>
              <div className="data ct">
                {data} / {stat}
              </div>
              <div className="progress ct">
                <div className="white-line" style={whiteLineStyle}></div>
              </div>
              <div className="inc ct">{increment.toFixed(2)}% Used</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StatCard;
