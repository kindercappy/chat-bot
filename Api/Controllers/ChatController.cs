using Microsoft.AspNetCore.Mvc;
using Google.Cloud.Dialogflow.V2;
using DialogFlowAPI.Files;

namespace DialogFlowAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : Controller
    {
        private string GOOGLE_APP_CRED_KEY_NAME = "GOOGLE_APPLICATION_CREDENTIALS";
        public string ProjectId = "dialogflow-340911";
        public SessionsClient SessionsClient { get; set; }
        public SessionName SessionName { get; set; }
        public string Guid { get; set; }
        public ChatController()
        {
        }

        private void CreateSession()
        {
            Guid = System.Guid.NewGuid().ToString();
            SessionsClient = SessionsClient.Create();
            SessionName = new SessionName(ProjectId, Guid);
        }

        [HttpGet]
        public IActionResult Get(string userSays)
        {
            var responseToSend = new ApiConversationReponse();
            var response = CheckIntent(userSays);
            switch (response.Intent.DisplayName)
            {
                case "DownloadFiles":
                    responseToSend.type = "downloadFile";
                    responseToSend.botResponse = new BotResponse();
                    //TODO: Send the url back to download file from.
                    break;
                default:
                    responseToSend.type = "text";
                    responseToSend.botResponse = new BotResponse();
                    responseToSend.botResponse.textResponse = response.FulfillmentText;
                    break;
            }
            return Ok(responseToSend);
        }
        private QueryResult CheckIntent(string userInput, string LnaguageCode = "en")
        {
            CreateSession();
            QueryInput queryInput = new QueryInput();
            var qText = new TextInput();
            qText.Text = userInput;
            qText.LanguageCode = LnaguageCode;
            queryInput.Text = qText;
            DetectIntentResponse detectIntentResponse = SessionsClient.DetectIntent(SessionName, queryInput);
            return detectIntentResponse.QueryResult;
        }
    }
}
