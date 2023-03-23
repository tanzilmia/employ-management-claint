import { RouterProvider } from "react-router-dom";
import router from './routing/router';
function App() {
  return (
    <div className="bg-gray-300 h-screen">
     <RouterProvider router={router}> </RouterProvider>
     
    </div>
  );
}

export default App;
