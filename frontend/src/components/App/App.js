import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../../routes/Root";
import ErrorPage from "../../routes/ErrorPage";
import MyFiles from "../../routes/MyFiles";
import StatisticalAnalysis from "../../routes/StatisticalAnalysis";
import ScatterVisualization from "../../routes/Visualizations/ScatterVisualization";
import DataPreprocessing from "../../routes/DataPreprocessing";
import { QueryClient, QueryClientProvider } from "react-query";
import TermsAndConditions from "../../routes/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "../../routes/PrivacyPolicy/PrivacyPolicy";
import ContactUs from "../../routes/ContactUs";
import Home from "../../routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
        children: [
          {
            path: "scatter",
            element: <ScatterVisualization />,
          },
        ],
      },
      {
        path: "terms",
        element: <TermsAndConditions />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "contact",
        element: <ContactUs />,
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
