using System.Collections.Generic;

public class FileUploadSettings
{
    public string[] AllowedExtensions { get; set; }
    public long MaxFileSizeInBytes { get; set; }
    public string UploadPath { get; set; }
}