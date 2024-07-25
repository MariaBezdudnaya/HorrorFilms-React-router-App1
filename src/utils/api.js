import { matchPath } from "react-router-dom";
import { filmsMocks } from "../mocks/filmsMocks";

const REQUEST_TIMEOUT = 3000;

const mockRequest = (data) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(data), REQUEST_TIMEOUT * Math.random())
  );
};

const mockData = [
  [
    "/films",
    ({ search }) =>
      search
        ? filmsMocks.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )
        : filmsMocks,
  ],
  ["/films/:id", ({ id }) => filmsMocks[id]],
];

export const mockFetch = async (requestUrl, options) => {
  console.log("Fetching", requestUrl, options);
  const [matchedUrl, getMocks] =
    mockData.find(([url]) => Boolean(matchPath(url, requestUrl))) || [];

  if (!getMocks) {
    return { error: { status: 404, message: "Requested data not found" } };
  }

  const { params } = matchPath(matchedUrl, requestUrl);

  const response = await mockRequest(getMocks({ ...params, ...options }));

  console.log("Response for:", requestUrl, options, response);

  return response;
};

window.mockFetch = mockFetch;
