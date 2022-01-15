export interface ILink {
  id: number;
  createdAt: string;
  description: string;
  url: string;
  postedById: number | null;
  postedBy: {
    name: string;
  } | null;
  voters: [
    {
      id: number;
    }
  ];
}
