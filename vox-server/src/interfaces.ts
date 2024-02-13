export interface JWTUSer {
  id: string;
  email: string;
}

export interface GraphqlContext {
  user?: JWTUSer;
}
