export const dataPreprocessingOperations = {
  clean: {
    uid: "clean",
    title: "Clean Data",
    description: "Clean the data by removing missing values and outliers",
  },
  patch: {
    uid: "patch",
    title: "Patch Data",
    description: "Patch the data by replacing missing values",
  },
  scale: {
    uid: "scale",
    title: "Scale Data",
    description: "Scale the data to be between 0 and 1",
  },
  normalize: {
    uid: "normalize",
    title: "Normalize Data",
    description: "Normalize the data to be between -1 and 1",
  },
  standardize: {
    uid: "standardize",
    title: "Standardize Data",
    description:
      "Standardize the data to have a mean of 0 and standard deviation of 1",
  },
  oneHotEncode: {
    uid: "oneHotEncode",
    title: "One Hot Encode Data",
    description: "One hot encode categorical data",
  },
  bin: {
    uid: "bin",
    title: "Bin Data",
    description: "Bin data into equal sized bins",
  },
  discretize: {
    uid: "discretize",
    title: "Discretize Data",
    description: "Discretize data into equal frequency bins",
  },
  pca: {
    uid: "pca",
    title: "PCA",
    description: "Perform Principal Component Analysis",
  },
  tsne: {
    uid: "tsne",
    title: "t-SNE",
    description: "Perform t-distributed Stochastic Neighbor Embedding",
  },
  umap: {
    uid: "umap",
    title: "UMAP",
    description: "Perform Uniform Manifold Approximation and Projection",
  },
  kmeans: {
    uid: "kmeans",
    title: "K-Means",
    description: "Perform K-Means Clustering",
  },
  dbscan: {
    uid: "dbscan",
    title: "DBSCAN",
    description: "Perform DBSCAN Clustering",
  },
  hierarchical: {
    uid: "hierarchical",
    title: "Hierarchical",
    description: "Perform Hierarchical Clustering",
  },
};
