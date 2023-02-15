import logoIcon from "images/logo.svg";
import { getElementById } from "lib/getElementById";
import { createRoot } from "react-dom/client";

createRoot(
  getElementById('root')!
).render(
  <>
    <img src={logoIcon} />
    <p>Site is comming soon...</p>
    <span><a href="https://github.com/rustudentdev">RuStudentDev</a> © 2023 <a title="My telegram" href="https://t.me/vic_dev">@vic_dev</a></span>
  </>
);