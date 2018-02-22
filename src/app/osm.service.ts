import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OsmService {
  constructor(private http: HttpClient) {}
}
