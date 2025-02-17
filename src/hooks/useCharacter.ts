import { gql, useQuery } from "@apollo/client";
import { Character } from "../types/commonTypes";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
      }
    }
  }
`;

interface FilterCharacter {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}

interface PageInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

interface CharacterResponse {
  info: PageInfo;
  results: Character[];
}

export const useCharacters = (page: number = 1, filter: FilterCharacter = {}) => {
  const { data, loading, error } = useQuery<{ characters: CharacterResponse }>(
    GET_CHARACTERS,
    {
      variables: { page, filter },
      fetchPolicy: "cache-first",
    }
  );

  return {
    info: data?.characters.info,
    characters: data?.characters.results || [],
    loading,
    error,
  };
};

export const useCharacterDetails = (id: number) => {
  const { data, loading, error } = useQuery<{ character: Character }>(
    gql`
      query GetCharacter($id: ID!) {
        character(id: $id) {
          image
          name
          status
          species
          type
          episode {
            id
          }
          origin {
            name
          }
          location {
            name
          }
        }
      }
    `,
    {
      variables: { id },
      fetchPolicy: "cache-first",
    }
  );

  return {
    character: data?.character,
    loading,
    error,
  };
};
