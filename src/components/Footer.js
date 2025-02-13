import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {new Date().getFullYear()} Tous droits réservés.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#00AEEF", // Cyan
    color: "white",
    textAlign: "center",
    padding: "5px 0",
    fontSize: "12px",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "30px",
  },
  text: {
    margin: 0,
    lineHeight: "30px",
  },
};

export default Footer;
