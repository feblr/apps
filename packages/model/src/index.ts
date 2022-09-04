export interface IFeed {
  id: string;
  publisher: {
    publicKey: string
  };
  title: string;
  description: string;
  favicon: string;
  updatedAt: Date;
  items: IFeedItem[];
  signature: {
    algorithm: 'sha256',
    value: string;
  }
}

export type IFeedItemContent = string | string[];

export interface IFeedItem {
  id: string;
  publisher: {
    publicKey: string
  };
  title: string;
  description: string;
  content: IFeedItemContent;
  signature: {
    algorithm: 'sha256',
    value: string;
  }
}
