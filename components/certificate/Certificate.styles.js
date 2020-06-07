const styleSheet = (primary = "#24C4D4", secondary = "gold") => {
  return {
    'certificate-container': {
      '@media(max-width:768px)': {
        marginTop: '65px',
        padding: '30px 0px 30px'
      },
      border: `10px solid ${primary}`,
      maxWidth: '950px',
      width: '95vw',
      minWidth: '300px',
      padding: '40px 40px 30px',
      position: 'relative',
      margin: 'auto',
      marginTop: '20px'
    },
    'styled-div': {
      '@media(max-width:768px)': {
        width: '30px',
        height: '56.25px',
        left: '11.25px',
      },
      '& > img': {
        width: "74%",
        marginTop: "4px"
      },
      backgroundColor: primary,
      width: '80px',
      height: '150px',
      position: 'absolute',
      top: '0',
      left: '30px',
      clipPath: 'polygon(100% 0, 100% 100%, 50% 75%, 0 100%, 0 0)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    'main-content': {
      '@media(max-width:768px)': {
        width: "90%",
      },
      textAlign: "center",
      width: "80%",
      margin: "auto"
    },
    "main-heading": {
      '@media(max-width:768px)': {
        fontSize: "18px",
        marginBottom: "30px"
      },
      "& > span": {
        '@media(max-width:768px)': {
          fontSize: "36px",
        },
        display: "block",
        fontSize: "48px",
        fontWeight: "500"
      },
      color: primary,
      fontSize: "24px",
      marginBottom: "40px"
    },
    'certificate-text': {
      '@media(max-width:768px)': {
        fontSize: "18px"
      },
      '& .name': {
        '@media(max-width:768px)': {
          fontSize: "48px"
        },
        color: primary,
        display: "block",
        fontSize: "64px",
        width: "fit-content",
        borderBottom: `1px solid ${secondary}`,
        margin: "0 auto 10px",
        padding: "0 20px"
      },
      '& > span': {
        "fontWeight": "500"
      },
      color: secondary,
      fontSize: "24px"
    },
    'certificate-footer': {
      '@media(max-width:768px)': {
        fontSize: "15px",
        marginTop: "30px"
      },
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#4e4e4e",
      fontSize: "20px",
      width: "90%",
      margin: "50px auto 0"
    },
    'issuer': {
      margin: "0",
      fontWeight: "500"
    },
    'issuer-designation': {
      margin: "0"
    },
    'certificate-uuid': {
      '@media(max-width:768px)': {
        fontSize: "10.5px",
      },
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "300",
      marginBottom: "-20px"
    }
  }
};

export default styleSheet;
