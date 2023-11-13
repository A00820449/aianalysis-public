import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../../routes/Root";
import ErrorPage from "../../routes/ErrorPage";
import MyFiles from "../../routes/MyFiles";
import StatisticalAnalysis from "../../routes/StatisticalAnalysis";
import Visualizations from "../../routes/Visualizations";
import DataPreprocessing from "../../routes/DataPreprocessing";
import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "my-files",
        element: <MyFiles />,
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
