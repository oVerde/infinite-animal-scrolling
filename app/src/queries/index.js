import { gql } from "urql";

export const countQuery = gql`
  query Aggregate($category: String = "cat") {
    gifs_aggregate(where: { category: { _eq: $category } }) {
      aggregate {
        count
      }
    }
  }
`;

export const categoriesCmp = gql`
  {
    gifs_aggregate(distinct_on: category) {
      nodes {
        category
      }
    }
  }
`;

export const gifRetrieve = gql`
  query Gifs($category: String!) {
    get_random_gifs(args: { category_input: $category }, limit: 15) {
      category
      id
      url
    }
  }
`;
