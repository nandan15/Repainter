interface EmailForm {
    to: string;
    subject: string;
    attachment: File | null;
    attachmentContent: string | null; // Base64 encoded content
}