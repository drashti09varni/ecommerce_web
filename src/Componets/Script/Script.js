import React from "react";
import Script from "react-load-script";

class ScriptLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptsLoaded: false, // Initialize to false since scripts are not loaded initially
    };
  }

  handleScriptLoad = () => {
    this.setState({
      scriptsLoaded: true,
    });

    console.log("Scripts have been loaded!");
  };

  render() {
    return (
      <>
        <Script url="" async={false} />
        <Script url="/fruitables-1.0.0/js/main.js" async={false} />
        <Script url="/fruitables-1.0.0/lib/easing/easing.min.js" async={false} />
        <Script url="/fruitables-1.0.0/lib/waypoints/waypoints.min.js" async={false} />
        <Script url="/fruitables-1.0.0/lib/lightbox/js/lightbox.min.js" async={false} />
        {/* <Script url="/fruitables-1.0.0/owlcarousel/owl.carousel.min.js" async={false} /> */}
      </>
    );
  }
}

export default ScriptLoader;

// <!-- JavaScript Libraries -->
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
// <script src="lib/easing/easing.min.js"></script>
// <script src="lib/waypoints/waypoints.min.js"></script>
// <script src="lib/lightbox/js/lightbox.min.js"></script>
// <script src="lib/owlcarousel/owl.carousel.min.js"></script>

// <!-- Template Javascript -->
// <script src="js/main.js"></script>