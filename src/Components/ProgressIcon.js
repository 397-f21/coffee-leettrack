import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../index.css";

export default function ProgressIcon() {
  return (
    <div>
      <div className="card" sx={{ width: 330 }}>
        <div className="cardDescription" variant="h6">
          Array
        </div>
        <div className="progressBarBack"></div>
        <div className="progressBarFront"></div>
      </div>
    </div>
  );
}
