import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  // Otros campos que necesites...
}

export type SessionType = { user: null | { id: string; username: string } };

// export type UserType = {
//   id: string;
//   username: string;
//   password: string;
// };

// export type NewUserType = Omit<UserType, "id">;
export type NewUserType = {
  username: string;
  password: string;
};

export interface IUserWithoutPassword {
  _id: string; // o el tipo que estés usando
  username: string;
  // Otras propiedades que necesites, pero NO la contraseña
}

export interface IImage extends Document {
  _id: string;
  url: string;
  userId: string;
}

export type ImageType = {
  _id: string;
  userId: string;
  url: string;
};

export type ControllerImage = {
  imgC: Express.Multer.File;
};

// types/TransformImageType.ts
export interface TransformImageType {
  resize?: {
    width: number;
    height: number;
  };
  crop?: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
  rotate?: number;
  format?: string;
  filters?: {
    grayscale?: boolean;
    sepia?: boolean;
  };
}

export type TransformationType = {
  width?: number; // Ancho de la imagen después de la transformación
  height?: number; // Altura de la imagen después de la transformación
  crop?: string; // Tipo de recorte, puede ser "scale" o "crop"
  angle?: number; // Ángulo de rotación de la imagen
  effect?: string; // Efectos aplicados, como "grayscale" o "sepia"
  fetch_format?: string; // Formato de la imagen, como "jpg", "png", etc.
  x?: number; // Coordenada X para el recorte
  y?: number; // Coordenada Y para el recorte
};

export type GetAllImagesController = {
  page: string;
  limit: string;
};
