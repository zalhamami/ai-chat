export default interface MediumStory {
    id?: string;
    authorId?: string;
    title: string;
    contentFormat?: 'html' | 'markdown';
    content?: string;
    url?: string;
    canonicalUrl?: string;
    tags?: any;
    publishStatus?: 'public' | 'draft' | 'unlisted';
    publishedAt?: string;
    license?: string;
    licenseUrl?: string;
    notifyFollowers?: boolean;
}
