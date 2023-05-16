import { Routing } from "./Routes/Routes";
import SettingsProvider from "./contexts/SettingsProvider";
import SnackbarProvider from "./contexts/SnackbarProvider";

function App() {
  return (
    <SettingsProvider>
      <SnackbarProvider>
        <div>
          <Routing />
        </div>
      </SnackbarProvider>
    </SettingsProvider>
  );
}

export default App;
