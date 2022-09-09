export const url = "http://localhost:5000/api";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
