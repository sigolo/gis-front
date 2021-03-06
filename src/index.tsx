import ReactDOM from "react-dom";
import App from "./containers/App/App";
import { fetchConfig } from "./configuration";
import { Provider } from "react-redux";
import { mainStore as store } from "./state";
// import "./style.css";
// import "semantic-ui-css/semantic.min.css";
import "./style/style.scss";

fetchConfig().then((config) => {
  if (config) {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector("#root")
    );
  }
});

