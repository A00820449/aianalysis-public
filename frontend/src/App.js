import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "antd/dist/reset.css";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import FileUpload from "./routes/files";
import StatisticalAnalysis from "./routes/statistical-analysis";
import Visualizations from "./routes/visualizations";
import DataPreprocessing from "./routes/data-preprocessing";
import { QueryClient, QueryClientProvider } from "react-query"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "files",
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
    ],
  },
]);

const queryClient = new QueryClient()

function App() {
  return (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
  )
}

export default App;
