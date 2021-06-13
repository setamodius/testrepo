import Vue from "vue";
import { Auth0Plugin } from "src/auth";
import { domain, clientId, audience } from "../../auth_config.json";

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});
