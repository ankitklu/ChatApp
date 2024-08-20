import React from "react";

function Newbox() {
  const conteudoStyle = {
    background: 'linear-gradient(to right, #f0f0f0, #ffffff)', // Interior background
    width: '250px',
    height: '90px',
    borderRadius: '10px',
    position: 'relative',
    zIndex: 999,
    border: '10px solid transparent', // Border thickness
    borderImage: 'linear-gradient(to right, red, yellow, green, cyan, blue, magenta) 1', // Initial gradient border
    animation: 'borderAnimation 5s linear infinite', // Animation
  };

  const keyframesStyle = `
    @keyframes borderAnimation {
      0% {
        border-image-source: linear-gradient(to right, red, yellow, green, cyan, blue, magenta);
      }
      100% {
        border-image-source: linear-gradient(to right, magenta, blue, cyan, green, yellow, red);
      }
    }
  `;

  return (
    <>
      <style>
        {keyframesStyle}
      </style>
      <div style={conteudoStyle}>
        <span>HTML, CSS & JS.</span>
        <span></span>
        <span></span>
      </div>
    </>
  );
}

export default Newbox;
