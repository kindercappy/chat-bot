import { BotResponseFileDownload } from "./botResponseFileDownload";

export interface BotResponse {
  textResponse:string;
  fileDownloadResponse:BotResponseFileDownload;
}
