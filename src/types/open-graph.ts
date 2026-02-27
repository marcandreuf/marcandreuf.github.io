export interface TemplateProps {
  title: string;
  heroImageUrl: string;
  avatarImageUrl: string;
  siteUrl: string;
}

export interface FrontmatterHeroImage {
  src?: string;
  fsPath?: string;
}

export interface FrontmatterProps {
  title: string;
  heroImage?: FrontmatterHeroImage;
  pageId?: string;
}
