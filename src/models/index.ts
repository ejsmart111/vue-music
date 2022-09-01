export interface ArtistModel {
   id: string;
   image: string;
   joindate: string;
   name: string;
   shareurl: string;
   shorturl: string;
   website: string;
}

export interface ResponseModel {
   headers: HeadersModel;
   results: ArtistModel[]
}

export interface HeadersModel {
   code: number;
   error_message: string;
   next: string;
   results_count: number;
   status: string;
   warnings: string;
}

export interface AlbumModel {
   artist_id: string;
   artist_name: string;
   id: string;
   image: string;
   name: string;
   releasedate: string;
   shareurl: string;
   shorturl: string;
   zip: string;
   zip_allowed: boolean;
}

export interface PlaylistModel {
   creationdate: string;
   id: string;
   name: string;
   shareurl: string;
   shorturl: string;
   user_id: string;
   user_name: string;
   zip: string;
}

export interface TrackModel {
   id: string;
   image: string;
   joindate: string;
   name: string;
   tracks: ArtistTrackModel[];
   website: string;
}

export interface ArtistTrackModel extends TrackModel {
   album_id: string;
   album_image: string;
   album_name: string;
   artist_name: string;
   audio: string;
   audiodownload: string;
   audiodownload_allowed: boolean;
   duration: string;
   id: string;
   image: string;
   license_ccurl: string;
   name: string;
   releasedate: string;
}

export interface GenreModel {
   genre: string;
   offset: number;
}

export interface SearchedMusicModel {
   album_id: string;
   album_image: string;
   album_name: string;
   artist_id: string;
   artist_idstr: string;
   artist_name: string;
   audio: string;
   audiodownload: string;
   audiodownload_allowed: boolean;
   duration: number;
   id: string;
   image: string;
   license_ccurl: string;
   name: string;
   position: number;
   prourl: string;
   releasedate: string;
   shareurl: string;
   shorturl: string;
}


