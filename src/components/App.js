import { useState } from "react";
import { Header } from "./Header";
import { Main } from "./Main";

export default function App() {
  const [appearance, setAppearance] = useState(true);

  return (
    <div className={`app ${appearance ? "" : "light"}`}>
      <Header
        appearance={appearance}
        onSetAppearance={() => setAppearance((appearance) => !appearance)}
      />
      <Main />
    </div>
  );
}
