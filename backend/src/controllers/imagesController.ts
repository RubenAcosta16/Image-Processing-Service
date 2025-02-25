import { Request, Response, NextFunction } from "express";

import imageService from "../services/imageService";
import { ImageError, AuthError } from "../utils/errorFactory";
import { GetAllImagesController, TransformImageType } from "../types";

const upload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AuthError("Access denied: User not authenticated");
    }

    // lo saco del middleware
    const userId = req.user._id; // Obtener el userId del usuario autenticado

    const img = req.file;

    if (!img) {
      throw new ImageError("No file uploaded");
    }

    if (!userId) {
      throw new ImageError("No userId provided in request body");
    }

    const url = await imageService.imageUpload(img);

    if (!url) {
      throw new ImageError("Error uploading image to cloudinary");
    }

    const newImage = await imageService.imageCreateObject({
      url,
      userId,
    });

    res.status(200).json({
      message: "Image uploaded successfully",
      data: newImage,
    });
  } catch (error) {
    next(error);
  }
};

const transformImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AuthError("Access denied: User not authenticated");
    }

    const userId = req.user._id; // Obtener el userId del usuario autenticado

    const { id } = req.params;
    const transformations:TransformImageType = req.body.transformData;
    // console.log("trws"+transformations);

    const transformedImage = await imageService.transformImage(
      id,
      transformations,
      userId
    );

    res.status(200).json({
      message: "Image transformed successfully",
      data: transformedImage,
    });
  } catch (error) {
    next(error);
  }
};

const getOneImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new AuthError("Access denied: User not authenticated");
    }

    // const userId = req.query.userId as string;
    const userId = req.user._id; // Obtener el userId del usuario autenticado
    const { id } = req.params;

    const imageFound = await imageService.getOneImage(id, userId);

    res.status(200).json({
      message: "Image get successfully",
      data: imageFound,
    });
  } catch (error) {
    next(error);
  }
}; 

const getAllImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AuthError("Access denied: User not authenticated");
    }

    const userId = req.user._id; // Obtener el userId del usuario autenticado

    const { limit, page } = req.query as unknown as GetAllImagesController;

    const images = await imageService.getAllImages(
      userId,
      Number(page),
      Number(limit)
    );

    res.status(200).json({
      message: "Image get successfully",
      data: images,
    });
  } catch (error) {
    next(error);
  }
};

const imageController = {
  upload,
  transformImage,
  getOneImage,
  getAllImages,
};
export default imageController;
