import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiConversationReponse } from 'src/interface/api-conversation-reponse';
import { ChatBotService } from 'src/service/chat-bot.service';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'dialogflow-chat-bot',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  INDEX = 0;
  /**
   *
   */
  constructor(private _chatBotService: ChatBotService) {}
  ngOnInit(): void {
    this.EnableBotPopupClick();
  }
  title = 'Google-DialogFlow-ChatBot';
  Chat(msg:string) {
    if (msg.trim() == '') {
      return;
    }
    this.generate_message(msg, 'self');
    this._chatBotService.Converse(msg).subscribe((x: ApiConversationReponse) => {
      this.TypeOfMessage(x);
    });
  }
  TypeOfMessage(x: ApiConversationReponse) {
    switch (x.type) {
      case 'DownloadFiles':
        break;
      default:
        this.generate_message(x.botResponse.textResponse, 'user');
        break;
    }
  }
  EnableBotPopupClick() {
    $('#chat-circle').click(function () {
      $('#chat-circle').toggle('scale');
      $('.chat-box').toggle('scale');
    });

    $('.chat-box-toggle').click(function () {
      $('#chat-circle').toggle('scale');
      $('.chat-box').toggle('scale');
    });
  }
  generate_message(msg: any, type: any) {
    this.INDEX++;
    var str = '';
    str +=
      "<div id='cm-msg-" + this.INDEX + '\' class="chat-msg ' + type + '">';
    str += '          <span class="msg-avatar">';
    // str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
    str += '          </span>';
    str += '          <div class="cm-msg-text">';
    str += msg;
    str += '          </div>';
    str += '        </div>';
    $('.chat-logs').append(str);
    $('#cm-msg-' + this.INDEX)
      .hide()
      .fadeIn(300);
    if (type == 'self') {
      $('#chat-input').val('');
    }
    $('.chat-logs')
      .stop()
      .animate({ scrollTop: $('.chat-logs')[0].scrollHeight }, 1000);
  }
}
