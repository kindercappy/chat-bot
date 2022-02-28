namespace DialogFlowAPI.Files
{
    public class ApiConversationReponse
    {
        public string type { get; set; }
        public BotResponse botResponse { get; set; }
    }
    public class BotResponse
    {
        public string textResponse { get; set; }
        public BotResponseFileDownload fileDownloadResponse { get; set; }
    }
    public class BotResponseFileDownload
    {
        public string urlToDowloadFileFrom { get; set; }
    }
}
