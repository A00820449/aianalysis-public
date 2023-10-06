import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'antd/dist/reset.css';
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import FileUpload from "./routes/file-upload";
import StatisticalAnalysis from "./routes/statistical-analysis";
import Visualizations from "./routes/visualizations";
import DataPreprocessing from "./routes/data-preprocessing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "upload",
        element: <FileUpload />,
      },
      {
        path: "data-preprocessing",
        element: <DataPreprocessing />,
      },
      {
        path: "statistical-analysis",
        element: <StatisticalAnalysis />,
      },
      {
        path: "visualizations",
        element: <Visualizations />,
      },
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
