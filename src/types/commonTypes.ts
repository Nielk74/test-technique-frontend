export interface Character {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    location: {
      name: string;
    }
    origin: {
      name: string;
    }
    image: string;
  }