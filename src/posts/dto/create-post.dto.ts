// src/posts/create-post.dto.ts

export class CreatePostDto {
  readonly title: string;
  readonly content: string;
  readonly userId: number;
}
