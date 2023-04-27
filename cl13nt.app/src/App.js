import { Routing } from "./Routes/Routes";
import SettingsProvider from "./contexts/SettingsProvider";

function App() {
  return (
    <SettingsProvider>
      <div>
        <Routing />
      </div>
    </SettingsProvider>
  );
}

export default App;
