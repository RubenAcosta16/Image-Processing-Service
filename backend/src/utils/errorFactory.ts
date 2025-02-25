const createErrorFactory = (name: string) => {
    return class BusinessError extends Error {
      constructor(message: string) {
        super(message);
        this.name = name;
      }
    };
  };
  
  export const ValidationError = createErrorFactory("ValidationError");
  export const UserError = createErrorFactory("UserError");
  export const NotFoundError = createErrorFactory("NotFoundError");
  export const ImageError = createErrorFactory("ImageError");
  export const AuthError = createErrorFactory("AuthError");
  