import {HttpHeaders} from "@angular/common/http";

export abstract class HeadersHelper {
  abstract getDefaultHttpOptions(): HttpHeaders
}
