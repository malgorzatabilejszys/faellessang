export interface Song {
  id: string;
  number: number;
  title: string;
  lyrics: string;
  author?: string;  // Optional property (note the ?)
  composer?: string;  // Optional property
  year?: number;  // Optional property
  category?: string;  // Optional property
}
