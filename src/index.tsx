import logoIcon from "images/logo.svg";
import { getElementById } from "lib/getElementById";
import { createRoot } from "react-dom/client";

createRoot(
  getElementById('root')!
).render(
  <>
    <img src={logoIcon} />
    <p>Site is comming soon...</p>
  </>
);